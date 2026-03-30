import sql from 'mssql';
import { env } from '../config/environment.js';
import type { DBClient, QueryResult } from './types.js';

/**
 * MSSQL Database Client Implementation
 */

const sqlConfig: sql.config = {
  server: env.MSSQL_SERVER!,
  database: env.MSSQL_DATABASE!,
  user: env.MSSQL_USER!,
  password: env.MSSQL_PASSWORD!,
  port: env.MSSQL_PORT,
  options: {
    encrypt: env.MSSQL_ENCRYPT,
    trustServerCertificate: env.MSSQL_TRUST_SERVER_CERTIFICATE,
  },
  pool: {
    max: 10,
    min: 2,
    idleTimeoutMillis: 30000,
  },
  requestTimeout: 30000,
  connectionTimeout: 15000,
};

let pool: sql.ConnectionPool | null = null;

async function getPool(): Promise<sql.ConnectionPool> {
  if (pool && pool.connected) {
    return pool;
  }

  try {
    pool = await new sql.ConnectionPool(sqlConfig).connect();
    console.log(`✅ Connected to SQL Server: ${env.MSSQL_SERVER}/${env.MSSQL_DATABASE}`);
    return pool;
  } catch (error) {
    console.error('❌ SQL Server connection failed:', error);
    throw error;
  }
}

export const mssqlClient: DBClient = {
  dbType: 'mssql',

  async query<T = unknown>(sqlQuery: string, params: unknown[] = []): Promise<QueryResult<T>> {
    const db = await getPool();
    const request = db.request();

    // Bind parameters: $1, $2, $3... -> @p1, @p2, @p3...
    const convertedSql = sqlQuery.replace(/\$(\d+)/g, (_, num) => `@p${num}`);
    params.forEach((value, index) => {
      request.input(`p${index + 1}`, value);
    });

    const result = await request.query<T>(convertedSql);
    return {
      rows: result.recordset ?? [],
      rowCount: result.rowsAffected[0] ?? result.recordset?.length ?? 0,
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
      await pool.close();
      pool = null;
      console.log('🔌 SQL Server connection pool closed');
    }
  },

  async healthCheck(): Promise<{ connected: boolean; latencyMs: number }> {
    const start = Date.now();
    try {
      const db = await getPool();
      await db.request().query('SELECT 1 AS healthCheck');
      return { connected: true, latencyMs: Date.now() - start };
    } catch {
      return { connected: false, latencyMs: Date.now() - start };
    }
  },
};

// Re-export sql types for MSSQL-specific operations if needed
export { sql };
