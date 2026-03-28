import { getPool, sql } from '../config/database.js';
import type { User } from '../types/index.js';

/**
 * User Repository — Raw SQL queries for Users table
 */
export const userRepository = {
  /**
   * Find user by email
   */
  async findByEmail(email: string): Promise<User | null> {
    const pool = await getPool();
    const result = await pool
      .request()
      .input('email', sql.NVarChar(255), email)
      .query<User>('SELECT * FROM QC_Users WHERE Email = @email');
    return result.recordset[0] ?? null;
  },

  /**
   * Find user by ID
   */
  async findById(id: string): Promise<User | null> {
    const pool = await getPool();
    const result = await pool
      .request()
      .input('id', sql.UniqueIdentifier, id)
      .query<User>('SELECT * FROM QC_Users WHERE Id = @id');
    return result.recordset[0] ?? null;
  },

  /**
   * Create a new user
   */
  async create(data: {
    email: string;
    passwordHash: string;
    firstName: string;
    lastName: string;
  }): Promise<User> {
    const pool = await getPool();
    const result = await pool
      .request()
      .input('email', sql.NVarChar(255), data.email)
      .input('passwordHash', sql.NVarChar(500), data.passwordHash)
      .input('firstName', sql.NVarChar(100), data.firstName)
      .input('lastName', sql.NVarChar(100), data.lastName)
      .query<User>(
        `INSERT INTO QC_Users (Email, PasswordHash, FirstName, LastName)
         OUTPUT INSERTED.*
         VALUES (@email, @passwordHash, @firstName, @lastName)`
      );
    return result.recordset[0];
  },

  /**
   * Update user profile
   */
  async update(
    id: string,
    data: { firstName?: string; lastName?: string; email?: string }
  ): Promise<User | null> {
    const setClauses: string[] = [];
    const pool = await getPool();
    const request = pool.request().input('id', sql.UniqueIdentifier, id);

    if (data.firstName !== undefined) {
      setClauses.push('FirstName = @firstName');
      request.input('firstName', sql.NVarChar(100), data.firstName);
    }
    if (data.lastName !== undefined) {
      setClauses.push('LastName = @lastName');
      request.input('lastName', sql.NVarChar(100), data.lastName);
    }
    if (data.email !== undefined) {
      setClauses.push('Email = @email');
      request.input('email', sql.NVarChar(255), data.email);
    }

    if (setClauses.length === 0) return this.findById(id);

    setClauses.push('UpdatedAt = GETUTCDATE()');

    const result = await request.query<User>(
      `UPDATE QC_Users SET ${setClauses.join(', ')} OUTPUT INSERTED.* WHERE Id = @id`
    );
    return result.recordset[0] ?? null;
  },

  /**
   * List all users with pagination
   */
  async findAll(page: number, limit: number): Promise<{ items: User[]; total: number }> {
    const pool = await getPool();
    const offset = (page - 1) * limit;

    const countResult = await pool
      .request()
      .query<{ total: number }>('SELECT COUNT(*) AS total FROM QC_Users');
    const total = countResult.recordset[0].total;

    const result = await pool
      .request()
      .input('offset', sql.Int, offset)
      .input('limit', sql.Int, limit)
      .query<User>(
        `SELECT * FROM QC_Users ORDER BY CreatedAt DESC OFFSET @offset ROWS FETCH NEXT @limit ROWS ONLY`
      );

    return { items: result.recordset, total };
  },

  /**
   * Deactivate a user (soft delete)
   */
  async deactivate(id: string): Promise<boolean> {
    const pool = await getPool();
    const result = await pool
      .request()
      .input('id', sql.UniqueIdentifier, id)
      .query('UPDATE QC_Users SET IsActive = 0, UpdatedAt = GETUTCDATE() WHERE Id = @id');
    return (result.rowsAffected[0] ?? 0) > 0;
  },
};
