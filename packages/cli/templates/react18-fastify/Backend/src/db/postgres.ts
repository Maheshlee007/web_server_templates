import pg from 'pg';
import { env } from '../config/environment.js';
import type { DBClient, QueryResult } from './types.js';

/**
 * PostgreSQL Database Client Implementation
 */

const { Pool } = pg;

let pool: pg.Pool | null = null;

function getPoolConfig(): pg.PoolConfig {
  return {
    host: env.POSTGRES_HOST!,
    port: env.POSTGRES_PORT,
    database: env.POSTGRES_DATABASE!,
    user: env.POSTGRES_USER!,
    password: env.POSTGRES_PASSWORD!,
    ssl: env.POSTGRES_SSL ? { rejectUnauthorized: false } : false,
    max: 10,
    min: 2,
    idleTimeoutMillis: 30000,
    connectionTimeoutMillis: 15000,
  };
}

async function getPool(): Promise<pg.Pool> {
  if (pool) {
    return pool;
  }

  try {
    pool = new Pool(getPoolConfig());

    // Test the connection
    const client = await pool.connect();
    client.release();

    console.log(`✅ Connected to PostgreSQL: ${env.POSTGRES_HOST}/${env.POSTGRES_DATABASE}`);
    return pool;
  } catch (error) {
    console.error('❌ PostgreSQL connection failed:', error);
    throw error;
  }
}

export const postgresClient: DBClient = {
  dbType: 'postgres',

  async query<T = unknown>(sqlQuery: string, params: unknown[] = []): Promise<QueryResult<T>> {
    const db = await getPool();

    // PostgreSQL already uses $1, $2, $3... so no conversion needed
    // But if MSSQL-style @p1, @p2 is used, convert it
    const convertedSql = sqlQuery.replace(/@p(\d+)/g, (_, num) => `$${num}`);

    const result = await db.query(convertedSql, params);
    return {
      rows: result.rows as T[],
      rowCount: result.rowCount ?? 0,
    };
  },

  async queryOne<T = unknown>(sqlQuery: string, params: unknown[] = []): Promise<T | null> {
    const result = await this.query<T>(sqlQuery, params);
    return result.rows[0] ?? null;
  },

  async execute(sqlQuery: string, params: unknown[] = []): Promise<number> {
    const result = await this.query(sqlQuery, params);
    return result.rowCount;
  },

  async close(): Promise<void> {
    if (pool) {
      await pool.end();
      pool = null;
      console.log('🔌 PostgreSQL connection pool closed');
    }
  },

  async healthCheck(): Promise<{ connected: boolean; latencyMs: number }> {
    const start = Date.now();
    try {
      const db = await getPool();
      await db.query('SELECT 1 AS health_check');
      return { connected: true, latencyMs: Date.now() - start };
    } catch {
      return { connected: false, latencyMs: Date.now() - start };
    }
  },
};
