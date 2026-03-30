import { getDB, getDbType } from '../db/index.js';

/**
 * Role Repository — Queries for Roles, UserRoles, Permissions, and RolePermissions
 * Supports both MSSQL and PostgreSQL
 */

const sql = {
  mssql: {
    getUserRoles: `SELECT r.Name FROM QC_Roles r
                   INNER JOIN QC_UserRoles ur ON r.Id = ur.RoleId
                   WHERE ur.UserId = $1`,
    getUserPermissions: `SELECT DISTINCT p.Name FROM QC_Permissions p
                         INNER JOIN QC_RolePermissions rp ON p.Id = rp.PermissionId
                         INNER JOIN QC_UserRoles ur ON rp.RoleId = ur.RoleId
                         WHERE ur.UserId = $1`,
    assignRole: `INSERT INTO QC_UserRoles (UserId, RoleId)
                 SELECT $1, Id FROM QC_Roles WHERE Name = $2
                 AND NOT EXISTS (
                   SELECT 1 FROM QC_UserRoles ur
                   INNER JOIN QC_Roles r ON ur.RoleId = r.Id
                   WHERE ur.UserId = $1 AND r.Name = $2
                 )`,
    removeRole: `DELETE ur FROM QC_UserRoles ur
                 INNER JOIN QC_Roles r ON ur.RoleId = r.Id
                 WHERE ur.UserId = $1 AND r.Name = $2`,
    getAllRoles: 'SELECT Id, Name, Description FROM QC_Roles ORDER BY Id',
    getRolePermissions: `SELECT p.Name FROM QC_Permissions p
                         INNER JOIN QC_RolePermissions rp ON p.Id = rp.PermissionId
                         INNER JOIN QC_Roles r ON rp.RoleId = r.Id
                         WHERE r.Name = $1`,
  },
  postgres: {
    getUserRoles: `SELECT r.name FROM qc_roles r
                   INNER JOIN qc_user_roles ur ON r.id = ur.role_id
                   WHERE ur.user_id = $1`,
    getUserPermissions: `SELECT DISTINCT p.name FROM qc_permissions p
                         INNER JOIN qc_role_permissions rp ON p.id = rp.permission_id
                         INNER JOIN qc_user_roles ur ON rp.role_id = ur.role_id
                         WHERE ur.user_id = $1`,
    assignRole: `INSERT INTO qc_user_roles (user_id, role_id)
                 SELECT $1, id FROM qc_roles WHERE name = $2
                 ON CONFLICT DO NOTHING`,
    removeRole: `DELETE FROM qc_user_roles
                 WHERE user_id = $1 AND role_id = (SELECT id FROM qc_roles WHERE name = $2)`,
    getAllRoles: 'SELECT id, name, description FROM qc_roles ORDER BY id',
    getRolePermissions: `SELECT p.name FROM qc_permissions p
                         INNER JOIN qc_role_permissions rp ON p.id = rp.permission_id
                         INNER JOIN qc_roles r ON rp.role_id = r.id
                         WHERE r.name = $1`,
  },
};

export const roleRepository = {
  /**
   * Get all roles assigned to a user
   */
  async getUserRoles(userId: string): Promise<string[]> {
    const db = await getDB();
    const dbType = getDbType();
    const result = await db.query<{ Name?: string; name?: string }>(sql[dbType].getUserRoles, [userId]);
    return result.rows.map((r) => (r.Name ?? r.name) as string);
  },

  /**
   * Get all permissions for a user (derived from their roles)
   */
  async getUserPermissions(userId: string): Promise<string[]> {
    const db = await getDB();
    const dbType = getDbType();
    const result = await db.query<{ Name?: string; name?: string }>(sql[dbType].getUserPermissions, [userId]);
    return result.rows.map((p) => (p.Name ?? p.name) as string);
  },

  /**
   * Assign a role to a user by role name
   */
  async assignRole(userId: string, roleName: string): Promise<void> {
    const db = await getDB();
    const dbType = getDbType();
    await db.execute(sql[dbType].assignRole, [userId, roleName]);
  },

  /**
   * Remove a role from a user
   */
  async removeRole(userId: string, roleName: string): Promise<void> {
    const db = await getDB();
    const dbType = getDbType();
    await db.execute(sql[dbType].removeRole, [userId, roleName]);
  },

  /**
   * Get all available roles
   */
  async getAllRoles(): Promise<{ Id: number; Name: string; Description: string | null }[]> {
    const db = await getDB();
    const dbType = getDbType();
    const result = await db.query<Record<string, unknown>>(sql[dbType].getAllRoles, []);
    return result.rows.map((r) => ({
      Id: (r.Id ?? r.id) as number,
      Name: (r.Name ?? r.name) as string,
      Description: (r.Description ?? r.description) as string | null,
    }));
  },

  /**
   * Get all permissions for a specific role
   */
  async getRolePermissions(roleName: string): Promise<string[]> {
    const db = await getDB();
    const dbType = getDbType();
    const result = await db.query<{ Name?: string; name?: string }>(sql[dbType].getRolePermissions, [roleName]);
    return result.rows.map((p) => (p.Name ?? p.name) as string);
  },
};
