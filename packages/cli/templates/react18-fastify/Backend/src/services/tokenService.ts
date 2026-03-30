import type { FastifyInstance } from 'fastify';
import { jwtConfig } from '../config/jwt.js';
import { tokenRepository } from '../repositories/tokenRepository.js';
import type { JwtPayload, JwtTokenPair } from '../types/jwt.js';

/**
 * In-memory revocation cache: userId → revocation timestamp.
 * Fast-path check before hitting the DB. Survives within a process lifetime.
 */
const revokedAtCache = new Map<string, number>();

/**
 * Parse a duration string like '7d', '15m', '1h' into milliseconds.
 */
function parseDuration(duration: string): number {
  const match = duration.match(/^(\d+)(s|m|h|d)$/);
  if (!match) return 7 * 24 * 60 * 60 * 1000; // fallback: 7 days
  const num = parseInt(match[1], 10);
  const unit = match[2];
  switch (unit) {
    case 's': return num * 1000;
    case 'm': return num * 60 * 1000;
    case 'h': return num * 60 * 60 * 1000;
    case 'd': return num * 24 * 60 * 60 * 1000;
    default: return 7 * 24 * 60 * 60 * 1000;
  }
}

/**
 * Token Service — JWT generation, refresh token rotation, and DB-backed revocation
 */
export function createTokenService(app: FastifyInstance) {
  const decodeRefreshToken = (refreshToken: string): (JwtPayload & { iat?: number }) | null => {
    try {
      const decoded = app.jwt.verify<JwtPayload & { tokenType?: string; iat?: number }>(refreshToken);
      if (decoded.tokenType !== 'refresh') {
        return null;
      }

      // Fast-path: check in-memory revocation cache
      const revokedTime = revokedAtCache.get(decoded.userId);
      if (revokedTime && decoded.iat && decoded.iat < revokedTime) {
        return null;
      }

      return {
        userId: decoded.userId,
        email: decoded.email,
        roles: decoded.roles,
        permissions: decoded.permissions,
        iat: decoded.iat,
      };
    } catch {
      return null;
    }
  };

  return {
    /**
     * Generate an access + refresh token pair and persist refresh token in DB
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

      // Persist refresh token in DB for revocation tracking
      const expiresAt = new Date(Date.now() + parseDuration(jwtConfig.refreshExpiry));
      await tokenRepository.create(payload.userId, refreshToken, expiresAt);

      return { accessToken, refreshToken };
    },

    /**
     * Validate a refresh token and return a new token pair (token rotation).
     * The old refresh token is revoked to prevent reuse.
     */
    async refreshTokens(refreshToken: string): Promise<JwtTokenPair | null> {
      const payload = decodeRefreshToken(refreshToken);
      if (!payload) return null;

      // Verify token exists and is not revoked in DB
      const dbToken = await tokenRepository.findValid(refreshToken);
      if (!dbToken) return null;

      // Revoke the old refresh token (rotation — each token is single-use)
      await tokenRepository.revoke(refreshToken);

      // Issue a new pair
      return this.generateTokenPair({
        userId: payload.userId,
        email: payload.email,
        roles: payload.roles,
        permissions: payload.permissions,
      });
    },

    /**
     * Validate refresh token, return userId if valid
     */
    async validateRefreshToken(refreshToken: string): Promise<string | null> {
      const payload = decodeRefreshToken(refreshToken);
      if (!payload) return null;

      // Also verify it's valid in DB
      const dbToken = await tokenRepository.findValid(refreshToken);
      if (!dbToken) return null;

      return payload.userId;
    },

    /**
     * Revoke all tokens for a user (logout everywhere).
     * Updates both in-memory cache and database.
     */
    async revokeAllUserTokens(userId: string): Promise<void> {
      revokedAtCache.set(userId, Math.floor(Date.now() / 1000));
      await tokenRepository.revokeAllForUser(userId);
    },

    /**
     * Check if a user's tokens have been revoked after a given timestamp (fast-path)
     */
    isTokenRevoked(userId: string, issuedAt: number): boolean {
      const revokedTime = revokedAtCache.get(userId);
      return !!revokedTime && issuedAt < revokedTime;
    },
  };
}

export type TokenService = ReturnType<typeof createTokenService>;
