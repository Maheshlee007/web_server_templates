import { getDB, getDbType } from '../db/index.js';
import type { UserPublic, PaginatedResponse } from '../types/index.js';

/**
 * Admin Repository — Optimized queries for admin operations
 * Supports both MSSQL and PostgreSQL
 */

const sql = {
  mssql: {
    countUsers: (whereClause: string) =>
      `SELECT COUNT(*) AS total FROM QC_Users u ${whereClause}`,
    listUsers: (whereClause: string) =>
      `SELECT u.Id, u.Email, u.FirstName, u.LastName, u.IsActive, u.CreatedAt, u.UpdatedAt
       FROM QC_Users u ${whereClause}
       ORDER BY u.CreatedAt DESC
       OFFSET $1 ROWS FETCH NEXT $2 ROWS ONLY`,
    getUserRoles: `SELECT r.Name FROM QC_Roles r
                   INNER JOIN QC_UserRoles ur ON r.Id = ur.RoleId
                   WHERE ur.UserId = $1`,
    getUserPermissions: `SELECT DISTINCT p.Name FROM QC_Permissions p
                         INNER JOIN QC_RolePermissions rp ON p.Id = rp.PermissionId
                         INNER JOIN QC_UserRoles ur ON rp.RoleId = ur.RoleId
                         WHERE ur.UserId = $1`,
    deleteUserRoles: 'DELETE FROM QC_UserRoles WHERE UserId = $1',
    assignRole: `INSERT INTO QC_UserRoles (UserId, RoleId)
                 SELECT $1, Id FROM QC_Roles WHERE Name = $2`,
    setUserStatus: `UPDATE QC_Users SET IsActive = $2, UpdatedAt = GETUTCDATE() WHERE Id = $1`,
    listRoles: 'SELECT Id, Name, Description FROM QC_Roles ORDER BY Id',
    getRolePermissions: `SELECT p.Name FROM QC_Permissions p
                         INNER JOIN QC_RolePermissions rp ON p.Id = rp.PermissionId
                         WHERE rp.RoleId = $1`,
    countRoleUsers: 'SELECT COUNT(*) AS count FROM QC_UserRoles WHERE RoleId = $1',
    listAllPermissions: `SELECT Id, Name, Description, Resource, Action
                         FROM QC_Permissions ORDER BY Resource, Action`,
    userStats: `SELECT
                  COUNT(*) AS totalUsers,
                  SUM(CASE WHEN IsActive = 1 THEN 1 ELSE 0 END) AS activeUsers,
                  SUM(CASE WHEN IsActive = 0 THEN 1 ELSE 0 END) AS inactiveUsers
                FROM QC_Users`,
    roleDistribution: `SELECT r.Name AS roleName, COUNT(ur.UserId) AS userCount
                       FROM QC_Roles r
                       LEFT JOIN QC_UserRoles ur ON r.Id = ur.RoleId
                       GROUP BY r.Name
                       ORDER BY userCount DESC`,
    recentSignups: `SELECT TOP 10 Id, Email, FirstName, LastName, CreatedAt
                    FROM QC_Users ORDER BY CreatedAt DESC`,
  },
  postgres: {
    countUsers: (whereClause: string) =>
      `SELECT COUNT(*) AS total FROM qc_users u ${whereClause}`,
    listUsers: (whereClause: string) =>
      `SELECT u.id, u.email, u.first_name, u.last_name, u.is_active, u.created_at, u.updated_at
       FROM qc_users u ${whereClause}
       ORDER BY u.created_at DESC
       LIMIT $2 OFFSET $1`,
    getUserRoles: `SELECT r.name FROM qc_roles r
                   INNER JOIN qc_user_roles ur ON r.id = ur.role_id
                   WHERE ur.user_id = $1`,
    getUserPermissions: `SELECT DISTINCT p.name FROM qc_permissions p
                         INNER JOIN qc_role_permissions rp ON p.id = rp.permission_id
                         INNER JOIN qc_user_roles ur ON rp.role_id = ur.role_id
                         WHERE ur.user_id = $1`,
    deleteUserRoles: 'DELETE FROM qc_user_roles WHERE user_id = $1',
    assignRole: `INSERT INTO qc_user_roles (user_id, role_id)
                 SELECT $1, id FROM qc_roles WHERE name = $2`,
    setUserStatus: `UPDATE qc_users SET is_active = $2, updated_at = NOW() WHERE id = $1`,
    listRoles: 'SELECT id, name, description FROM qc_roles ORDER BY id',
    getRolePermissions: `SELECT p.name FROM qc_permissions p
                         INNER JOIN qc_role_permissions rp ON p.id = rp.permission_id
                         WHERE rp.role_id = $1`,
    countRoleUsers: 'SELECT COUNT(*) AS count FROM qc_user_roles WHERE role_id = $1',
    listAllPermissions: `SELECT id, name, description, resource, action
                         FROM qc_permissions ORDER BY resource, action`,
    userStats: `SELECT
                  COUNT(*) AS "totalUsers",
                  SUM(CASE WHEN is_active THEN 1 ELSE 0 END) AS "activeUsers",
                  SUM(CASE WHEN NOT is_active THEN 1 ELSE 0 END) AS "inactiveUsers"
                FROM qc_users`,
    roleDistribution: `SELECT r.name AS "roleName", COUNT(ur.user_id) AS "userCount"
                       FROM qc_roles r
                       LEFT JOIN qc_user_roles ur ON r.id = ur.role_id
                       GROUP BY r.name
                       ORDER BY "userCount" DESC`,
    recentSignups: `SELECT id, email, first_name, last_name, created_at
                    FROM qc_users ORDER BY created_at DESC LIMIT 10`,
  },
};

function buildWhereClause(
  dbType: 'mssql' | 'postgres',
  search?: string,
  role?: string,
  isActive?: boolean
): { clause: string; params: unknown[]; nextParamIndex: number } {
  const conditions: string[] = [];
  const params: unknown[] = [];
  let paramIndex = 1;

  if (search) {
    const col = dbType === 'postgres' ? ['first_name', 'last_name', 'email'] : ['FirstName', 'LastName', 'Email'];
    conditions.push(`(u.${col[0]} ILIKE $${paramIndex} OR u.${col[1]} ILIKE $${paramIndex} OR u.${col[2]} ILIKE $${paramIndex})`);
    params.push(`%${search}%`);
    paramIndex++;
  }

  if (role) {
    const subquery = dbType === 'postgres'
      ? `EXISTS (SELECT 1 FROM qc_user_roles ur2 INNER JOIN qc_roles r2 ON ur2.role_id = r2.id WHERE ur2.user_id = u.id AND r2.name = $${paramIndex})`
      : `EXISTS (SELECT 1 FROM QC_UserRoles ur2 INNER JOIN QC_Roles r2 ON ur2.RoleId = r2.Id WHERE ur2.UserId = u.Id AND r2.Name = $${paramIndex})`;
    conditions.push(subquery);
    params.push(role);
    paramIndex++;
  }

  if (isActive !== undefined) {
    const col = dbType === 'postgres' ? 'is_active' : 'IsActive';
    conditions.push(`u.${col} = $${paramIndex}`);
    params.push(isActive);
    paramIndex++;
  }

  return {
    clause: conditions.length > 0 ? `WHERE ${conditions.join(' AND ')}` : '',
    params,
    nextParamIndex: paramIndex,
  };
}

export const adminRepository = {
  /**
   * List users with full details (roles, permissions) + search/filter + pagination
   */
  async listUsersWithDetails(
    page: number,
    limit: number,
    search?: string,
    role?: string,
    isActive?: boolean
  ): Promise<PaginatedResponse<UserPublic & { updatedAt: Date }>> {
    const db = await getDB();
    const dbType = getDbType();
    const offset = (page - 1) * limit;

    const { clause, params, nextParamIndex } = buildWhereClause(dbType, search, role, isActive);

    // Count query
    const countQuery = sql[dbType].countUsers(clause);
    const countResult = await db.queryOne<{ total: number }>(countQuery, params);
    const total = countResult?.total ?? 0;

    // Main query params: [...whereParams, offset, limit]
    const listQuery = sql[dbType].listUsers(clause);
    const listParams = [...params, offset, limit];
    const result = await db.query<Record<string, unknown>>(listQuery, listParams);

    // Get roles and permissions for each user
    const items = await Promise.all(
      result.rows.map(async (row) => {
        const userId = (row.Id ?? row.id) as string;

        const rolesResult = await db.query<{ Name?: string; name?: string }>(
          sql[dbType].getUserRoles,
          [userId]
        );
        const roles = rolesResult.rows.map((r) => (r.Name ?? r.name) as string);

        const permsResult = await db.query<{ Name?: string; name?: string }>(
          sql[dbType].getUserPermissions,
          [userId]
        );
        const permissions = permsResult.rows.map((p) => (p.Name ?? p.name) as string);

        return {
          id: userId,
          email: (row.Email ?? row.email) as string,
          firstName: (row.FirstName ?? row.first_name) as string,
          lastName: (row.LastName ?? row.last_name) as string,
          isActive: (row.IsActive ?? row.is_active) as boolean,
          roles,
          permissions,
          createdAt: (row.CreatedAt ?? row.created_at) as Date,
          updatedAt: (row.UpdatedAt ?? row.updated_at) as Date,
        };
      })
    );

    return {
      items,
      total,
      page,
      limit,
      totalPages: Math.ceil(total / limit),
    };
  },

  /**
   * Replace all roles for a user (atomic: remove all then assign new)
   */
  async replaceUserRoles(userId: string, roleNames: string[]): Promise<void> {
    const db = await getDB();
    const dbType = getDbType();

    // Delete existing roles
    await db.execute(sql[dbType].deleteUserRoles, [userId]);

    // Assign new roles
    for (const roleName of roleNames) {
      await db.execute(sql[dbType].assignRole, [userId, roleName]);
    }
  },

  /**
   * Set user active/inactive status
   */
  async setUserStatus(userId: string, isActive: boolean): Promise<boolean> {
    const db = await getDB();
    const dbType = getDbType();
    const affected = await db.execute(sql[dbType].setUserStatus, [userId, isActive]);
    return affected > 0;
  },

  /**
   * List all roles with their permissions and user count
   */
  async listRolesWithDetails(): Promise<
    Array<{
      id: number;
      name: string;
      description: string | null;
      permissions: string[];
      userCount: number;
    }>
  > {
    const db = await getDB();
    const dbType = getDbType();

    const rolesResult = await db.query<Record<string, unknown>>(sql[dbType].listRoles, []);

    return Promise.all(
      rolesResult.rows.map(async (role) => {
        const roleId = (role.Id ?? role.id) as number;

        const permsResult = await db.query<{ Name?: string; name?: string }>(
          sql[dbType].getRolePermissions,
          [roleId]
        );

        const countResult = await db.queryOne<{ count: number }>(
          sql[dbType].countRoleUsers,
          [roleId]
        );

        return {
          id: roleId,
          name: (role.Name ?? role.name) as string,
          description: (role.Description ?? role.description) as string | null,
          permissions: permsResult.rows.map((p) => (p.Name ?? p.name) as string),
          userCount: countResult?.count ?? 0,
        };
      })
    );
  },

  /**
   * List all permissions
   */
  async listAllPermissions(): Promise<
    Array<{
      id: number;
      name: string;
      description: string | null;
      resource: string;
      action: string;
    }>
  > {
    const db = await getDB();
    const dbType = getDbType();
    const result = await db.query<Record<string, unknown>>(sql[dbType].listAllPermissions, []);

    return result.rows.map((p) => ({
      id: (p.Id ?? p.id) as number,
      name: (p.Name ?? p.name) as string,
      description: (p.Description ?? p.description) as string | null,
      resource: (p.Resource ?? p.resource) as string,
      action: (p.Action ?? p.action) as string,
    }));
  },

  /**
   * Get system statistics for admin dashboard
   */
  async getSystemStats() {
    const db = await getDB();
    const dbType = getDbType();

    const userStats = await db.queryOne<Record<string, number>>(sql[dbType].userStats, []);
    const roleDistribution = await db.query<Record<string, unknown>>(sql[dbType].roleDistribution, []);
    const recentSignups = await db.query<Record<string, unknown>>(sql[dbType].recentSignups, []);

    return {
      users: {
        totalUsers: userStats?.totalUsers ?? 0,
        activeUsers: userStats?.activeUsers ?? 0,
        inactiveUsers: userStats?.inactiveUsers ?? 0,
      },
      roleDistribution: roleDistribution.rows.map((r) => ({
        role: (r.roleName ?? r.name) as string,
        count: (r.userCount ?? r.count) as number,
      })),
      recentSignups: recentSignups.rows.map((u) => ({
        id: (u.Id ?? u.id) as string,
        email: (u.Email ?? u.email) as string,
        name: `${(u.FirstName ?? u.first_name)} ${(u.LastName ?? u.last_name)}`,
        createdAt: (u.CreatedAt ?? u.created_at) as Date,
      })),
    };
  },

  // Screen access methods are complex and MSSQL-specific
  // For PostgreSQL, we'd need to create similar tables with snake_case
  // For now, keeping them MSSQL-only (will be implemented if needed)
  async ensureScreenAccessTable(): Promise<void> {
    // TODO: Implement for PostgreSQL if needed
    console.log('Screen access tables not yet implemented for PostgreSQL');
  },

  async getScreenAccessMappings(): Promise<unknown[]> {
    return [];
  },

  async upsertScreenAccess(_entry: Record<string, unknown>): Promise<void> {
    // TODO: Implement screen access for PostgreSQL
  },

  async deleteScreenAccess(_screenId: string): Promise<boolean> {
    // TODO: Implement screen access for PostgreSQL
    return false;
  },

  async seedScreenAccess(_entries: Array<Record<string, unknown>>): Promise<number> {
    // TODO: Implement screen access for PostgreSQL
    return 0;
  },
};
