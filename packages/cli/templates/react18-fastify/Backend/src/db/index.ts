import { env } from '../config/environment.js';
import type { DBClient } from './types.js';

/**
 * Database Client Factory
 * Returns the appropriate database client based on DB_TYPE environment variable
 */

let dbClient: DBClient | null = null;

export async function getDB(): Promise<DBClient> {
  if (dbClient) {
    return dbClient;
  }

  if (env.DB_TYPE === 'postgres') {
    const { postgresClient } = await import('./postgres.js');
    dbClient = postgresClient;
  } else {
    const { mssqlClient } = await import('./mssql.js');
    dbClient = mssqlClient;
  }

  return dbClient;
}

/**
 * Close the database connection pool
 */
export async function closeDB(): Promise<void> {
  if (dbClient) {
    await dbClient.close();
    dbClient = null;
  }
}

/**
 * Check database health
 */
export async function checkDbHealth(): Promise<{ connected: boolean; latencyMs: number; dbType: string }> {
  const db = await getDB();
  const health = await db.healthCheck();
  return { ...health, dbType: db.dbType };
}

/**
 * Get the current database type
 */
export function getDbType(): 'mssql' | 'postgres' {
  return env.DB_TYPE;
}

// Re-export types
export type { DBClient, QueryResult } from './types.js';
