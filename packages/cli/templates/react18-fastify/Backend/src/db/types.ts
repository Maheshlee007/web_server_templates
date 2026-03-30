/**
 * Database Abstraction Layer Types
 * Provides a common interface for MSSQL and PostgreSQL
 */

export interface QueryResult<T> {
  rows: T[];
  rowCount: number;
}

export interface DBClient {
  /**
   * Execute a parameterized query
   * @param sql - SQL query with placeholders ($1, $2 for PG or @p1, @p2 for MSSQL)
   * @param params - Array of parameter values
   */
  query<T = unknown>(sql: string, params?: unknown[]): Promise<QueryResult<T>>;

  /**
   * Execute a query and return the first row or null
   */
  queryOne<T = unknown>(sql: string, params?: unknown[]): Promise<T | null>;

  /**
   * Execute a query, insert, update, or delete
   * Returns the number of affected rows
   */
  execute(sql: string, params?: unknown[]): Promise<number>;

  /**
   * Close the connection pool
   */
  close(): Promise<void>;

  /**
   * Health check - verify database connectivity
   */
  healthCheck(): Promise<{ connected: boolean; latencyMs: number }>;

  /**
   * Get the database type
   */
  readonly dbType: 'mssql' | 'postgres';
}

/**
 * SQL placeholder style converter
 * PostgreSQL uses $1, $2, $3...
 * MSSQL uses @p1, @p2, @p3...
 */
export function toMssqlParams(sql: string): string {
  return sql.replace(/\$(\d+)/g, (_, num) => `@p${num}`);
}

export function toPgParams(sql: string): string {
  return sql.replace(/@p(\d+)/g, (_, num) => `$${num}`);
}
