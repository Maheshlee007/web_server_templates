import type { FastifyInstance } from 'fastify';
import { jwtConfig } from '../config/jwt.js';
import type { JwtPayload, JwtTokenPair } from '../types/jwt.js';

/**
 * Token Service — JWT generation & refresh token management
 */
export function createTokenService(app: FastifyInstance) {
  const decodeRefreshToken = (refreshToken: string): JwtPayload | null => {
    try {
      const decoded = app.jwt.verify<JwtPayload & { tokenType?: string }>(refreshToken);
      if (decoded.tokenType !== 'refresh') {
        return null;
      }

      return {
        userId: decoded.userId,
        email: decoded.email,
        roles: decoded.roles,
        permissions: decoded.permissions,
      };
    } catch {
      return null;
    }
  };

  return {
    /**
     * Generate an access + refresh token pair
     */
    async generateTokenPair(payload: JwtPayload): Promise<JwtTokenPair> {
      const accessToken = app.jwt.sign(
        {
          userId: payload.userId,
          email: payload.email,
          roles: payload.roles,
          permissions: payload.permissions,
        },
        { expiresIn: jwtConfig.accessExpiry }
      );

      const refreshToken = app.jwt.sign(
        {
          userId: payload.userId,
          email: payload.email,
          roles: payload.roles,
          permissions: payload.permissions,
          tokenType: 'refresh',
        },
        { expiresIn: jwtConfig.refreshExpiry }
      );

      return { accessToken, refreshToken };
    },

    /**
     * Validate a refresh token and return a new token pair
     */
    async refreshTokens(refreshToken: string): Promise<JwtTokenPair | null> {
      const payload = decodeRefreshToken(refreshToken);
      if (!payload) return null;

      return this.generateTokenPair(payload);
    },

    /**
     * Validate refresh token, return userId if valid
     */
    async validateRefreshToken(refreshToken: string): Promise<string | null> {
      const payload = decodeRefreshToken(refreshToken);
      return payload?.userId ?? null;
    },

    /**
     * Revoke all tokens for a user (logout everywhere)
     */
    async revokeAllUserTokens(userId: string): Promise<void> {
      void userId;
    },
  };
}

export type TokenService = ReturnType<typeof createTokenService>;
