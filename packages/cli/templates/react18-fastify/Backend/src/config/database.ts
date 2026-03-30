/**
 * Database Configuration — Dual DB Support (MSSQL / PostgreSQL)
 *
 * This module provides backward-compatible exports while supporting both databases.
 * For new code, prefer importing from '../db/index.js'
 */

import { env } from './environment.js';
import { getDB, closeDB, checkDbHealth } from '../db/index.js';
import type { DBClient } from '../db/types.js';

// Re-export the main functions for backward compatibility
export { getDB as getPool, closeDB as closePool, checkDbHealth as checkDbHealth };

// Export sql types for MSSQL (backward compatibility for existing repositories)
// This is only used when DB_TYPE=mssql
let sql: typeof import('mssql') | null = null;

if (env.DB_TYPE === 'mssql') {
  // Dynamic import will be resolved at runtime
  import('mssql').then((m) => {
    sql = m.default;
  }).catch(() => {
    // If mssql not available, that's fine - we're using postgres
  });
}

export { sql };

/**
 * Get the database type
 */
export function getDbType(): 'mssql' | 'postgres' {
  return env.DB_TYPE;
}

/**
 * Helper to check if we're using PostgreSQL
 */
export function isPostgres(): boolean {
  return env.DB_TYPE === 'postgres';
}

/**
 * Helper to check if we're using MSSQL
 */
export function isMssql(): boolean {
  return env.DB_TYPE === 'mssql';
}
