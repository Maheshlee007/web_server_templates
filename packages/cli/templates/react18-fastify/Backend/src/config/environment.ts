import 'dotenv/config';
import { z } from 'zod';

/**
 * Environment schema validation using Zod
 * Fails fast on startup if required env vars are missing or invalid
 */
const envSchema = z.object({
  // Application
  NODE_ENV: z.enum(['development', 'production', 'test']).default('development'),
  PORT: z.coerce.number().default(5000),

  // SQL Server
  MSSQL_SERVER: z.string().min(1, 'MSSQL_SERVER is required'),
  MSSQL_DATABASE: z.string().min(1, 'MSSQL_DATABASE is required'),
  MSSQL_USER: z.string().min(1, 'MSSQL_USER is required'),
  MSSQL_PASSWORD: z.string().min(1, 'MSSQL_PASSWORD is required'),
  MSSQL_PORT: z.coerce.number().default(1433),
  MSSQL_ENCRYPT: z.coerce.boolean().default(true),
  MSSQL_TRUST_SERVER_CERTIFICATE: z.coerce.boolean().default(true),

  // JWT
  JWT_SECRET: z.string().min(8, 'JWT_SECRET must be at least 8 characters'),
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
   console.log("env schema", JSON.stringify(result.data, null, 2));
  return result.data;
}

/** Validated environment variables — safe to use everywhere */
export const env = validateEnv();
