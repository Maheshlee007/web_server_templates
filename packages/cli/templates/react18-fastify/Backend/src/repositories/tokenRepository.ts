import crypto from 'crypto';
import { getDB, getDbType } from '../db/index.js';

/**
 * Token Repository — Manages refresh tokens in DB
 * Supports both MSSQL and PostgreSQL
 */

const sql = {
  mssql: {
    create: `INSERT INTO QC_RefreshTokens (Id, UserId, Token, ExpiresAt)
             VALUES ($1, $2, $3, $4)`,
    findValid: `SELECT Id, UserId FROM QC_RefreshTokens
                WHERE Token = $1 AND RevokedAt IS NULL AND ExpiresAt > GETUTCDATE()`,
    revoke: `UPDATE QC_RefreshTokens SET RevokedAt = GETUTCDATE() WHERE Token = $1`,
    revokeAllForUser: `UPDATE QC_RefreshTokens SET RevokedAt = GETUTCDATE()
                       WHERE UserId = $1 AND RevokedAt IS NULL`,
  },
  postgres: {
    create: `INSERT INTO qc_refresh_tokens (id, user_id, token, expires_at)
             VALUES ($1, $2, $3, $4)`,
    findValid: `SELECT id, user_id FROM qc_refresh_tokens
                WHERE token = $1 AND revoked_at IS NULL AND expires_at > NOW()`,
    revoke: `UPDATE qc_refresh_tokens SET revoked_at = NOW() WHERE token = $1`,
    revokeAllForUser: `UPDATE qc_refresh_tokens SET revoked_at = NOW()
                       WHERE user_id = $1 AND revoked_at IS NULL`,
  },
};

export const tokenRepository = {
  /**
   * Store a refresh token
   */
  async create(userId: string, token: string, expiresAt: Date): Promise<void> {
    const db = await getDB();
    const dbType = getDbType();
    await db.execute(sql[dbType].create, [crypto.randomUUID(), userId, token, expiresAt]);
  },

  /**
   * Find a valid (non-revoked, non-expired) refresh token
   */
  async findValid(token: string): Promise<{ Id: string; UserId: string } | null> {
    const db = await getDB();
    const dbType = getDbType();
    const row = await db.queryOne<Record<string, unknown>>(sql[dbType].findValid, [token]);

    if (!row) return null;

    // Normalize column names (PostgreSQL uses snake_case)
    return {
      Id: (row.Id ?? row.id) as string,
      UserId: (row.UserId ?? row.user_id) as string,
    };
  },

  /**
   * Revoke a specific refresh token
   */
  async revoke(token: string): Promise<void> {
    const db = await getDB();
    const dbType = getDbType();
    await db.execute(sql[dbType].revoke, [token]);
  },

  /**
   * Revoke all refresh tokens for a user (e.g., on password change or logout-all)
   */
  async revokeAllForUser(userId: string): Promise<void> {
    const db = await getDB();
    const dbType = getDbType();
    await db.execute(sql[dbType].revokeAllForUser, [userId]);
  },
};
