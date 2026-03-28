import { env } from './environment.js';

/**
 * JWT configuration derived from validated environment
 */
export const jwtConfig = {
  secret: env.JWT_SECRET,
  accessExpiry: env.JWT_ACCESS_EXPIRY,
  refreshExpiry: env.JWT_REFRESH_EXPIRY,
} as const;
