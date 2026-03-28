/**
 * JWT Payload types
 */
export interface JwtPayload {
  userId: string;
  email: string;
  roles: string[];
  permissions: string[];
  tokenType?: 'access' | 'refresh';
}

export interface JwtTokenPair {
  accessToken: string;
  refreshToken: string;
}

/**
 * Extend Fastify's JWT namespace
 */
declare module '@fastify/jwt' {
  interface FastifyJWT {
    payload: JwtPayload;
    user: JwtPayload;
  }
}
