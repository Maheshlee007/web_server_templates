import { getPool, sql } from '../config/database.js';
import type { UserPublic, PaginatedResponse } from '../types/index.js';

/**
 * Admin Repository — Optimized queries for admin operations
 */
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
    const pool = await getPool();
    const offset = (page - 1) * limit;

    // Build WHERE clauses dynamically
    const conditions: string[] = [];

    if (search) {
      conditions.push(
        `(u.FirstName LIKE @search OR u.LastName LIKE @search OR u.Email LIKE @search)`
      );
    }

    if (role) {
      conditions.push(
        `EXISTS (SELECT 1 FROM QC_UserRoles ur2 INNER JOIN QC_Roles r2 ON ur2.RoleId = r2.Id WHERE ur2.UserId = u.Id AND r2.Name = @role)`
      );
    }

    if (isActive !== undefined) {
      conditions.push(`u.IsActive = @isActive`);
    }

    const whereClause = conditions.length > 0 ? `WHERE ${conditions.join(' AND ')}` : '';

    // Count query — separate request object
    const countRequest = pool.request();
    if (search) countRequest.input('search', sql.NVarChar, `%${search}%`);
    if (role) countRequest.input('role', sql.NVarChar(50), role);
    if (isActive !== undefined) countRequest.input('isActive', sql.Bit, isActive ? 1 : 0);

    const countResult = await countRequest
      .query<{ total: number }>(`SELECT COUNT(*) AS total FROM QC_Users u ${whereClause}`);
    const total = countResult.recordset[0].total;

    // Main query with roles aggregated — separate request object
    const mainRequest = pool.request();
    if (search) mainRequest.input('search', sql.NVarChar, `%${search}%`);
    if (role) mainRequest.input('role', sql.NVarChar(50), role);
    if (isActive !== undefined) mainRequest.input('isActive', sql.Bit, isActive ? 1 : 0);

    const result = await mainRequest
      .input('offset', sql.Int, offset)
      .input('limit', sql.Int, limit)
      .query<{
        Id: string;
        Email: string;
        FirstName: string;
        LastName: string;
        IsActive: boolean;
        CreatedAt: Date;
        UpdatedAt: Date;
        RoleNames: string | null;
      }>(
        `SELECT u.Id, u.Email, u.FirstName, u.LastName, u.IsActive, u.CreatedAt, u.UpdatedAt,
                STUFF((
                    SELECT ',' + r.Name
                    FROM QC_UserRoles ur
                    INNER JOIN QC_Roles r ON ur.RoleId = r.Id
                    WHERE ur.UserId = u.Id
                    FOR XML PATH(''), TYPE
                ).value('.', 'NVARCHAR(MAX)'), 1, 1, '') AS RoleNames
         FROM QC_Users u
         ${whereClause}
         ORDER BY u.CreatedAt DESC
         OFFSET @offset ROWS FETCH NEXT @limit ROWS ONLY`
      );

    // For each user, also get permissions
    const items = await Promise.all(
      result.recordset.map(async (row) => {
        const roles = row.RoleNames ? row.RoleNames.split(',') : [];

        // Get permissions via role-permission mapping
        const permResult = await pool
          .request()
          .input('userId', sql.UniqueIdentifier, row.Id)
          .query<{ Name: string }>(
            `SELECT DISTINCT p.Name FROM QC_Permissions p
             INNER JOIN QC_RolePermissions rp ON p.Id = rp.PermissionId
             INNER JOIN QC_UserRoles ur ON rp.RoleId = ur.RoleId
             WHERE ur.UserId = @userId`
          );

        return {
          id: row.Id,
          email: row.Email,
          firstName: row.FirstName,
          lastName: row.LastName,
          isActive: row.IsActive,
          roles,
          permissions: permResult.recordset.map((p) => p.Name),
          createdAt: row.CreatedAt,
          updatedAt: row.UpdatedAt,
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
    const pool = await getPool();
    const transaction = pool.transaction();
    await transaction.begin();

    try {
      // Remove all existing roles
      await transaction
        .request()
        .input('userId', sql.UniqueIdentifier, userId)
        .query('DELETE FROM QC_UserRoles WHERE UserId = @userId');

      // Assign new roles
      for (const roleName of roleNames) {
        await transaction
          .request()
          .input('userId', sql.UniqueIdentifier, userId)
          .input('roleName', sql.NVarChar(50), roleName)
          .query(
            `INSERT INTO QC_UserRoles (UserId, RoleId)
             SELECT @userId, Id FROM QC_Roles WHERE Name = @roleName`
          );
      }

      await transaction.commit();
    } catch (error) {
      await transaction.rollback();
      throw error;
    }
  },

  /**
   * Set user active/inactive status
   */
  async setUserStatus(userId: string, isActive: boolean): Promise<boolean> {
    const pool = await getPool();
    const result = await pool
      .request()
      .input('id', sql.UniqueIdentifier, userId)
      .input('isActive', sql.Bit, isActive ? 1 : 0)
      .query(
        `UPDATE QC_Users SET IsActive = @isActive, UpdatedAt = GETUTCDATE() WHERE Id = @id`
      );
    return (result.rowsAffected[0] ?? 0) > 0;
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
    const pool = await getPool();

    const rolesResult = await pool
      .request()
      .query<{ Id: number; Name: string; Description: string | null }>(
        `SELECT Id, Name, Description FROM QC_Roles ORDER BY Id`
      );

    return Promise.all(
      rolesResult.recordset.map(async (role) => {
        // Get permissions for this role
        const permResult = await pool
          .request()
          .input('roleId', sql.Int, role.Id)
          .query<{ Name: string }>(
            `SELECT p.Name FROM QC_Permissions p
             INNER JOIN QC_RolePermissions rp ON p.Id = rp.PermissionId
             WHERE rp.RoleId = @roleId`
          );

        // Count users with this role
        const countResult = await pool
          .request()
          .input('roleId', sql.Int, role.Id)
          .query<{ count: number }>(
            `SELECT COUNT(*) AS count FROM QC_UserRoles WHERE RoleId = @roleId`
          );

        return {
          id: role.Id,
          name: role.Name,
          description: role.Description,
          permissions: permResult.recordset.map((p) => p.Name),
          userCount: countResult.recordset[0].count,
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
    const pool = await getPool();
    const result = await pool.request().query<{
      Id: number;
      Name: string;
      Description: string | null;
      Resource: string;
      Action: string;
    }>(`SELECT Id, Name, Description, Resource, Action FROM QC_Permissions ORDER BY Resource, Action`);

    return result.recordset.map((p) => ({
      id: p.Id,
      name: p.Name,
      description: p.Description,
      resource: p.Resource,
      action: p.Action,
    }));
  },

  /**
   * Get system statistics for admin dashboard
   */
  async getSystemStats() {
    const pool = await getPool();

    // Total users, active users
    const userStats = await pool.request().query<{
      totalUsers: number;
      activeUsers: number;
      inactiveUsers: number;
    }>(
      `SELECT 
         COUNT(*) AS totalUsers,
         SUM(CASE WHEN IsActive = 1 THEN 1 ELSE 0 END) AS activeUsers,
         SUM(CASE WHEN IsActive = 0 THEN 1 ELSE 0 END) AS inactiveUsers
       FROM QC_Users`
    );

    // Role distribution
    const roleDistribution = await pool.request().query<{
      roleName: string;
      userCount: number;
    }>(
      `SELECT r.Name AS roleName, COUNT(ur.UserId) AS userCount
       FROM QC_Roles r
       LEFT JOIN QC_UserRoles ur ON r.Id = ur.RoleId
       GROUP BY r.Name
       ORDER BY userCount DESC`
    );

    // Recent signups (last 7 days)
    const recentSignups = await pool.request().query<{
      Id: string;
      Email: string;
      FirstName: string;
      LastName: string;
      CreatedAt: Date;
    }>(
      `SELECT TOP 10 Id, Email, FirstName, LastName, CreatedAt
       FROM QC_Users
       ORDER BY CreatedAt DESC`
    );

    return {
      users: userStats.recordset[0],
      roleDistribution: roleDistribution.recordset.map((r) => ({
        role: r.roleName,
        count: r.userCount,
      })),
      recentSignups: recentSignups.recordset.map((u) => ({
        id: u.Id,
        email: u.Email,
        name: `${u.FirstName} ${u.LastName}`,
        createdAt: u.CreatedAt,
      })),
    };
  },

  // ═══════════════════════════════════════════
  //  SCREEN-ROLE ACCESS — Dynamic screen-role mapping
  // ═══════════════════════════════════════════

  /**
   * Ensure the QC_ScreenAccess table exists (auto-create on first use)
   */
  async ensureScreenAccessTable(): Promise<void> {
    const pool = await getPool();
    await pool.request().query(`
      IF NOT EXISTS (SELECT * FROM sys.tables WHERE name = 'QC_ScreenAccess')
      BEGIN
        CREATE TABLE QC_ScreenAccess (
          Id         INT IDENTITY(1,1) PRIMARY KEY,
          ScreenId   NVARCHAR(100)  NOT NULL,
          ScreenName NVARCHAR(200)  NOT NULL,
          Path       NVARCHAR(500)  NOT NULL,
          Category   NVARCHAR(50)   NOT NULL DEFAULT 'core',
          Description NVARCHAR(500) NULL,
          RequiresAuth BIT           NOT NULL DEFAULT 1,
          IsHidden   BIT            NOT NULL DEFAULT 0,
          CreatedAt  DATETIME2      NOT NULL DEFAULT GETUTCDATE(),
          UpdatedAt  DATETIME2      NOT NULL DEFAULT GETUTCDATE(),
          CONSTRAINT UQ_ScreenAccess_ScreenId UNIQUE (ScreenId)
        );

        CREATE TABLE QC_ScreenRoles (
          Id       INT IDENTITY(1,1) PRIMARY KEY,
          ScreenId NVARCHAR(100) NOT NULL,
          RoleName NVARCHAR(50)  NOT NULL,
          CONSTRAINT FK_ScreenRoles_Screen FOREIGN KEY (ScreenId)
            REFERENCES QC_ScreenAccess(ScreenId) ON DELETE CASCADE,
          CONSTRAINT UQ_ScreenRoles UNIQUE (ScreenId, RoleName)
        );

        CREATE TABLE QC_ScreenPermissions (
          Id           INT IDENTITY(1,1) PRIMARY KEY,
          ScreenId     NVARCHAR(100) NOT NULL,
          PermissionName NVARCHAR(100) NOT NULL,
          CONSTRAINT FK_ScreenPerms_Screen FOREIGN KEY (ScreenId)
            REFERENCES QC_ScreenAccess(ScreenId) ON DELETE CASCADE,
          CONSTRAINT UQ_ScreenPerms UNIQUE (ScreenId, PermissionName)
        );
      END
    `);
  },

  /**
   * Get all screen-role access mappings
   */
  async getScreenAccessMappings(): Promise<
    Array<{
      screenId: string;
      screenName: string;
      path: string;
      category: string;
      description: string;
      requiresAuth: boolean;
      isHidden: boolean;
      roles: string[];
      permissions: string[];
    }>
  > {
    const pool = await getPool();
    await this.ensureScreenAccessTable();

    const screens = await pool.request().query<{
      ScreenId: string;
      ScreenName: string;
      Path: string;
      Category: string;
      Description: string | null;
      RequiresAuth: boolean;
      IsHidden: boolean;
    }>(`SELECT ScreenId, ScreenName, Path, Category, Description, RequiresAuth, IsHidden
        FROM QC_ScreenAccess ORDER BY Category, ScreenName`);

    return Promise.all(
      screens.recordset.map(async (screen) => {
        const rolesResult = await pool
          .request()
          .input('screenId', sql.NVarChar(100), screen.ScreenId)
          .query<{ RoleName: string }>(
            `SELECT RoleName FROM QC_ScreenRoles WHERE ScreenId = @screenId`
          );

        const permsResult = await pool
          .request()
          .input('screenId', sql.NVarChar(100), screen.ScreenId)
          .query<{ PermissionName: string }>(
            `SELECT PermissionName FROM QC_ScreenPermissions WHERE ScreenId = @screenId`
          );

        return {
          screenId: screen.ScreenId,
          screenName: screen.ScreenName,
          path: screen.Path,
          category: screen.Category,
          description: screen.Description ?? '',
          requiresAuth: screen.RequiresAuth,
          isHidden: screen.IsHidden,
          roles: rolesResult.recordset.map((r) => r.RoleName),
          permissions: permsResult.recordset.map((p) => p.PermissionName),
        };
      })
    );
  },

  /**
   * Upsert a screen-access entry with its roles
   */
  async upsertScreenAccess(entry: {
    screenId: string;
    screenName: string;
    path: string;
    category: string;
    description?: string;
    requiresAuth?: boolean;
    isHidden?: boolean;
    roles: string[];
    permissions: string[];
  }): Promise<void> {
    const pool = await getPool();
    await this.ensureScreenAccessTable();

    const transaction = pool.transaction();
    await transaction.begin();
    try {
      // Upsert the screen record
      await transaction
        .request()
        .input('screenId', sql.NVarChar(100), entry.screenId)
        .input('screenName', sql.NVarChar(200), entry.screenName)
        .input('path', sql.NVarChar(500), entry.path)
        .input('category', sql.NVarChar(50), entry.category)
        .input('description', sql.NVarChar(500), entry.description ?? '')
        .input('requiresAuth', sql.Bit, entry.requiresAuth !== false ? 1 : 0)
        .input('isHidden', sql.Bit, entry.isHidden ? 1 : 0)
        .query(`
          MERGE QC_ScreenAccess AS target
          USING (SELECT @screenId AS ScreenId) AS source
          ON target.ScreenId = source.ScreenId
          WHEN MATCHED THEN
            UPDATE SET ScreenName = @screenName, Path = @path, Category = @category,
                       Description = @description, RequiresAuth = @requiresAuth,
                       IsHidden = @isHidden, UpdatedAt = GETUTCDATE()
          WHEN NOT MATCHED THEN
            INSERT (ScreenId, ScreenName, Path, Category, Description, RequiresAuth, IsHidden)
            VALUES (@screenId, @screenName, @path, @category, @description, @requiresAuth, @isHidden);
        `);

      // Replace roles
      await transaction
        .request()
        .input('screenId', sql.NVarChar(100), entry.screenId)
        .query(`DELETE FROM QC_ScreenRoles WHERE ScreenId = @screenId`);

      for (const role of entry.roles) {
        await transaction
          .request()
          .input('screenId', sql.NVarChar(100), entry.screenId)
          .input('roleName', sql.NVarChar(50), role)
          .query(`INSERT INTO QC_ScreenRoles (ScreenId, RoleName) VALUES (@screenId, @roleName)`);
      }

      // Replace permissions
      await transaction
        .request()
        .input('screenId', sql.NVarChar(100), entry.screenId)
        .query(`DELETE FROM QC_ScreenPermissions WHERE ScreenId = @screenId`);

      for (const perm of entry.permissions) {
        await transaction
          .request()
          .input('screenId', sql.NVarChar(100), entry.screenId)
          .input('permName', sql.NVarChar(100), perm)
          .query(
            `INSERT INTO QC_ScreenPermissions (ScreenId, PermissionName) VALUES (@screenId, @permName)`
          );
      }

      await transaction.commit();
    } catch (error) {
      await transaction.rollback();
      throw error;
    }
  },

  /**
   * Delete a screen-access entry
   */
  async deleteScreenAccess(screenId: string): Promise<boolean> {
    const pool = await getPool();
    await this.ensureScreenAccessTable();
    const result = await pool
      .request()
      .input('screenId', sql.NVarChar(100), screenId)
      .query(`DELETE FROM QC_ScreenAccess WHERE ScreenId = @screenId`);
    return (result.rowsAffected[0] ?? 0) > 0;
  },

  /**
   * Seed screen access table from a list of entries (used for initial sync from routeRegistry)
   */
  async seedScreenAccess(entries: Array<{
    screenId: string;
    screenName: string;
    path: string;
    category: string;
    description?: string;
    roles: string[];
    permissions: string[];
  }>): Promise<number> {
    await this.ensureScreenAccessTable();
    let count = 0;
    for (const entry of entries) {
      await this.upsertScreenAccess({ ...entry, requiresAuth: true, isHidden: false });
      count++;
    }
    return count;
  },
};
