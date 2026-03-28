import { getPool, sql } from '../config/database.js';

/**
 * Role Repository — Queries for Roles, UserRoles, Permissions, and RolePermissions
 */
export const roleRepository = {
  /**
   * Get all roles assigned to a user
   */
  async getUserRoles(userId: string): Promise<string[]> {
    const pool = await getPool();
    const result = await pool
      .request()
      .input('userId', sql.UniqueIdentifier, userId)
      .query<{ Name: string }>(
        `SELECT r.Name FROM QC_Roles r
         INNER JOIN QC_UserRoles ur ON r.Id = ur.RoleId
         WHERE ur.UserId = @userId`
      );
    return result.recordset.map((r) => r.Name);
  },

  /**
   * Get all permissions for a user (derived from their roles)
   */
  async getUserPermissions(userId: string): Promise<string[]> {
    const pool = await getPool();
    const result = await pool
      .request()
      .input('userId', sql.UniqueIdentifier, userId)
      .query<{ Name: string }>(
        `SELECT DISTINCT p.Name FROM QC_Permissions p
         INNER JOIN QC_RolePermissions rp ON p.Id = rp.PermissionId
         INNER JOIN QC_UserRoles ur ON rp.RoleId = ur.RoleId
         WHERE ur.UserId = @userId`
      );
    return result.recordset.map((p) => p.Name);
  },

  /**
   * Assign a role to a user by role name
   */
  async assignRole(userId: string, roleName: string): Promise<void> {
    const pool = await getPool();
    await pool
      .request()
      .input('userId', sql.UniqueIdentifier, userId)
      .input('roleName', sql.NVarChar(50), roleName)
      .query(
        `INSERT INTO QC_UserRoles (UserId, RoleId)
         SELECT @userId, Id FROM QC_Roles WHERE Name = @roleName
         AND NOT EXISTS (
           SELECT 1 FROM QC_UserRoles ur
           INNER JOIN QC_Roles r ON ur.RoleId = r.Id
           WHERE ur.UserId = @userId AND r.Name = @roleName
         )`
      );
  },

  /**
   * Remove a role from a user
   */
  async removeRole(userId: string, roleName: string): Promise<void> {
    const pool = await getPool();
    await pool
      .request()
      .input('userId', sql.UniqueIdentifier, userId)
      .input('roleName', sql.NVarChar(50), roleName)
      .query(
        `DELETE ur FROM QC_UserRoles ur
         INNER JOIN QC_Roles r ON ur.RoleId = r.Id
         WHERE ur.UserId = @userId AND r.Name = @roleName`
      );
  },

  /**
   * Get all available roles
   */
  async getAllRoles(): Promise<{ Id: number; Name: string; Description: string | null }[]> {
    const pool = await getPool();
    const result = await pool
      .request()
      .query<{ Id: number; Name: string; Description: string | null }>(
        'SELECT Id, Name, Description FROM QC_Roles ORDER BY Id'
      );
    return result.recordset;
  },

  /**
   * Get all permissions for a specific role
   */
  async getRolePermissions(roleName: string): Promise<string[]> {
    const pool = await getPool();
    const result = await pool
      .request()
      .input('roleName', sql.NVarChar(50), roleName)
      .query<{ Name: string }>(
        `SELECT p.Name FROM QC_Permissions p
         INNER JOIN QC_RolePermissions rp ON p.Id = rp.PermissionId
         INNER JOIN QC_Roles r ON rp.RoleId = r.Id
         WHERE r.Name = @roleName`
      );
    return result.recordset.map((p) => p.Name);
  },
};
