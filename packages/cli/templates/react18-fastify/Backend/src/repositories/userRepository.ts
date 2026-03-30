import { getDB, getDbType } from '../db/index.js';
import type { User } from '../types/index.js';

/**
 * User Repository — Database-agnostic queries for Users table
 * Supports both MSSQL and PostgreSQL via the DB abstraction layer
 */

// SQL queries differ between MSSQL and PostgreSQL
const sql = {
  mssql: {
    findByEmail: 'SELECT * FROM QC_Users WHERE Email = $1',
    findById: 'SELECT * FROM QC_Users WHERE Id = $1',
    create: `INSERT INTO QC_Users (Email, PasswordHash, FirstName, LastName)
             OUTPUT INSERTED.*
             VALUES ($1, $2, $3, $4)`,
    update: (setClauses: string[]) =>
      `UPDATE QC_Users SET ${setClauses.join(', ')}, UpdatedAt = GETUTCDATE()
       OUTPUT INSERTED.* WHERE Id = $1`,
    count: 'SELECT COUNT(*) AS total FROM QC_Users',
    findAll: `SELECT * FROM QC_Users ORDER BY CreatedAt DESC
              OFFSET $1 ROWS FETCH NEXT $2 ROWS ONLY`,
    deactivate: 'UPDATE QC_Users SET IsActive = 0, UpdatedAt = GETUTCDATE() WHERE Id = $1',
  },
  postgres: {
    findByEmail: 'SELECT * FROM qc_users WHERE email = $1',
    findById: 'SELECT * FROM qc_users WHERE id = $1',
    create: `INSERT INTO qc_users (email, password_hash, first_name, last_name)
             VALUES ($1, $2, $3, $4)
             RETURNING *`,
    update: (setClauses: string[]) =>
      `UPDATE qc_users SET ${setClauses.join(', ')}, updated_at = NOW()
       WHERE id = $1 RETURNING *`,
    count: 'SELECT COUNT(*) AS total FROM qc_users',
    findAll: `SELECT * FROM qc_users ORDER BY created_at DESC
              LIMIT $2 OFFSET $1`,
    deactivate: `UPDATE qc_users SET is_active = false, updated_at = NOW() WHERE id = $1`,
  },
};

// Map PostgreSQL column names to our interface
function mapUser(row: Record<string, unknown>, dbType: 'mssql' | 'postgres'): User {
  if (dbType === 'postgres') {
    return {
      Id: row.id as string,
      Email: row.email as string,
      PasswordHash: row.password_hash as string,
      FirstName: row.first_name as string,
      LastName: row.last_name as string,
      IsActive: row.is_active as boolean,
      CreatedAt: row.created_at as Date,
      UpdatedAt: row.updated_at as Date,
    };
  }
  return row as unknown as User;
}

export const userRepository = {
  /**
   * Find user by email
   */
  async findByEmail(email: string): Promise<User | null> {
    const db = await getDB();
    const dbType = getDbType();
    const row = await db.queryOne(sql[dbType].findByEmail, [email]);
    return row ? mapUser(row as Record<string, unknown>, dbType) : null;
  },

  /**
   * Find user by ID
   */
  async findById(id: string): Promise<User | null> {
    const db = await getDB();
    const dbType = getDbType();
    const row = await db.queryOne(sql[dbType].findById, [id]);
    return row ? mapUser(row as Record<string, unknown>, dbType) : null;
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
    const db = await getDB();
    const dbType = getDbType();
    const row = await db.queryOne(sql[dbType].create, [
      data.email,
      data.passwordHash,
      data.firstName,
      data.lastName,
    ]);
    return mapUser(row as Record<string, unknown>, dbType);
  },

  /**
   * Update user profile
   */
  async update(
    id: string,
    data: { firstName?: string; lastName?: string; email?: string }
  ): Promise<User | null> {
    const db = await getDB();
    const dbType = getDbType();

    const setClauses: string[] = [];
    const params: unknown[] = [id];
    let paramIndex = 2;

    if (data.firstName !== undefined) {
      setClauses.push(`${dbType === 'postgres' ? 'first_name' : 'FirstName'} = $${paramIndex++}`);
      params.push(data.firstName);
    }
    if (data.lastName !== undefined) {
      setClauses.push(`${dbType === 'postgres' ? 'last_name' : 'LastName'} = $${paramIndex++}`);
      params.push(data.lastName);
    }
    if (data.email !== undefined) {
      setClauses.push(`${dbType === 'postgres' ? 'email' : 'Email'} = $${paramIndex++}`);
      params.push(data.email);
    }

    if (setClauses.length === 0) return this.findById(id);

    const query = sql[dbType].update(setClauses);
    const row = await db.queryOne(query, params);
    return row ? mapUser(row as Record<string, unknown>, dbType) : null;
  },

  /**
   * List all users with pagination
   */
  async findAll(page: number, limit: number): Promise<{ items: User[]; total: number }> {
    const db = await getDB();
    const dbType = getDbType();
    const offset = (page - 1) * limit;

    const countResult = await db.queryOne<{ total: number }>(sql[dbType].count, []);
    const total = countResult?.total ?? 0;

    const result = await db.query(sql[dbType].findAll, [offset, limit]);
    const items = result.rows.map((row) => mapUser(row as Record<string, unknown>, dbType));

    return { items, total };
  },

  /**
   * Deactivate a user (soft delete)
   */
  async deactivate(id: string): Promise<boolean> {
    const db = await getDB();
    const dbType = getDbType();
    const affected = await db.execute(sql[dbType].deactivate, [id]);
    return affected > 0;
  },
};
