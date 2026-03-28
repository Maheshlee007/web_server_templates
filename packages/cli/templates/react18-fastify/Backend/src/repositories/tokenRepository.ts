import { getPool, sql } from '../config/database.js';
import crypto from 'crypto';

/**
 * Token Repository — Manages refresh tokens in DB
 */
export const tokenRepository = {
  /**
   * Store a refresh token
   */
  async create(userId: string, token: string, expiresAt: Date): Promise<void> {
    const pool = await getPool();
    await pool
      .request()
      .input('id', sql.UniqueIdentifier, crypto.randomUUID())
      .input('userId', sql.UniqueIdentifier, userId)
      .input('token', sql.NVarChar(500), token)
      .input('expiresAt', sql.DateTime2, expiresAt)
      .query(
        `INSERT INTO QC_RefreshTokens (Id, UserId, Token, ExpiresAt)
         VALUES (@id, @userId, @token, @expiresAt)`
      );
  },

  /**
   * Find a valid (non-revoked, non-expired) refresh token
   */
  async findValid(token: string): Promise<{ Id: string; UserId: string } | null> {
    const pool = await getPool();
    const result = await pool
      .request()
      .input('token', sql.NVarChar(500), token)
      .query<{ Id: string; UserId: string }>(
        `SELECT Id, UserId FROM QC_RefreshTokens
         WHERE Token = @token AND RevokedAt IS NULL AND ExpiresAt > GETUTCDATE()`
      );
    return result.recordset[0] ?? null;
  },

  /**
   * Revoke a specific refresh token
   */
  async revoke(token: string): Promise<void> {
    const pool = await getPool();
    await pool
      .request()
      .input('token', sql.NVarChar(500), token)
      .query('UPDATE QC_RefreshTokens SET RevokedAt = GETUTCDATE() WHERE Token = @token');
  },

  /**
   * Revoke all refresh tokens for a user (e.g., on password change or logout-all)
   */
  async revokeAllForUser(userId: string): Promise<void> {
    const pool = await getPool();
    await pool
      .request()
      .input('userId', sql.UniqueIdentifier, userId)
      .query(
        'UPDATE QC_RefreshTokens SET RevokedAt = GETUTCDATE() WHERE UserId = @userId AND RevokedAt IS NULL'
      );
  },
};
