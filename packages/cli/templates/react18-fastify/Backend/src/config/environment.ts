import 'dotenv/config';
import { z } from 'zod';

/**
 * Helper: Parse string-as-boolean (handles "false", "0", "no" correctly)
 */
const booleanString = z
  .union([z.boolean(), z.string()])
  .transform((val) => {
    if (typeof val === 'boolean') return val;
    return val.toLowerCase() !== 'false' && val !== '0' && val.toLowerCase() !== 'no';
  });

/**
 * Environment schema validation using Zod
 * Fails fast on startup if required env vars are missing or invalid
 */
const envSchema = z.object({
  // Application
  NODE_ENV: z.enum(['development', 'production', 'test']).default('development'),
  PORT: z.coerce.number().default(5000),

  // Database Type: 'mssql' or 'postgres'
  DB_TYPE: z.enum(['mssql', 'postgres']).default('mssql'),

  // SQL Server (required if DB_TYPE=mssql)
  MSSQL_SERVER: z.string().optional(),
  MSSQL_DATABASE: z.string().optional(),
  MSSQL_USER: z.string().optional(),
  MSSQL_PASSWORD: z.string().optional(),
  MSSQL_PORT: z.coerce.number().default(1433),
  MSSQL_ENCRYPT: booleanString.default(true),
  MSSQL_TRUST_SERVER_CERTIFICATE: booleanString.default(true),

  // PostgreSQL (required if DB_TYPE=postgres)
  POSTGRES_HOST: z.string().optional(),
  POSTGRES_PORT: z.coerce.number().default(5432),
  POSTGRES_DATABASE: z.string().optional(),
  POSTGRES_USER: z.string().optional(),
  POSTGRES_PASSWORD: z.string().optional(),
  POSTGRES_SSL: booleanString.default(false),

  // JWT
  JWT_SECRET: z.string().min(32, 'JWT_SECRET must be at least 32 characters'),
  JWT_ACCESS_EXPIRY: z.string().default('15m'),
  JWT_REFRESH_EXPIRY: z.string().default('7d'),

  // CORS
  CORS_ORIGIN: z.string().default('http://localhost:3000'),

  // Rate Limiting
  RATE_LIMIT_WINDOW_MS: z.coerce.number().default(900000), // 15 minutes
  RATE_LIMIT_MAX_REQUESTS: z.coerce.number().default(100),

  // API
  API_PREFIX: z.string().default('/api'),

  // Swagger
  SWAGGER_ADMIN_SECRET: z.string().default('admin-docs-secret-2025'),

  // Logging
  LOG_LEVEL: z.enum(['fatal', 'error', 'warn', 'info', 'debug', 'trace']).default('info'),
});

export type Env = z.infer<typeof envSchema>;

function validateEnv(): Env {
  const result = envSchema.safeParse(process.env);

  if (!result.success) {
    console.error('❌ Invalid environment variables:');
    console.error(result.error.flatten().fieldErrors);
    process.exit(1);
  }

  const env = result.data;

  // Validate DB-specific required fields
  if (env.DB_TYPE === 'mssql') {
    if (!env.MSSQL_SERVER || !env.MSSQL_DATABASE || !env.MSSQL_USER || !env.MSSQL_PASSWORD) {
      console.error('❌ DB_TYPE=mssql requires: MSSQL_SERVER, MSSQL_DATABASE, MSSQL_USER, MSSQL_PASSWORD');
      process.exit(1);
    }
  } else if (env.DB_TYPE === 'postgres') {
    if (!env.POSTGRES_HOST || !env.POSTGRES_DATABASE || !env.POSTGRES_USER || !env.POSTGRES_PASSWORD) {
      console.error('❌ DB_TYPE=postgres requires: POSTGRES_HOST, POSTGRES_DATABASE, POSTGRES_USER, POSTGRES_PASSWORD');
      process.exit(1);
    }
  }

  return env;
}

/** Validated environment variables — safe to use everywhere */
export const env = validateEnv();
