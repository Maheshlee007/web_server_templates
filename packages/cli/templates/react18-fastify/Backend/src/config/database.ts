import sql from 'mssql';
import { env } from './environment.js';

/**
 * SQL Server connection pool configuration
 * Uses mssql package with connection pooling for efficient DB access
 */
const sqlConfig: sql.config = {
  server: env.MSSQL_SERVER,
  database: env.MSSQL_DATABASE,
  user: env.MSSQL_USER,
  password: env.MSSQL_PASSWORD,
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

/**
 * Get or create the SQL Server connection pool (singleton)
 */
export async function getPool(): Promise<sql.ConnectionPool> {
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

/**
 * Close the connection pool gracefully
 */
export async function closePool(): Promise<void> {
  if (pool) {
    await pool.close();
    pool = null;
    console.log('🔌 SQL Server connection pool closed');
  }
}

/**
 * Health check — tests database connectivity
 */
export async function checkDbHealth(): Promise<{ connected: boolean; latencyMs: number }> {
  const start = Date.now();
  try {
    const db = await getPool();
    await db.request().query('SELECT 1 AS healthCheck');
    return { connected: true, latencyMs: Date.now() - start };
  } catch {
    return { connected: false, latencyMs: Date.now() - start };
  }
}

export { sql };
