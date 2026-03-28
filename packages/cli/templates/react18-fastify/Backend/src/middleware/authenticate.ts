import type { FastifyRequest, FastifyReply } from 'fastify';
import type { JwtPayload } from '../types/jwt.js';

/**
 * Authentication Middleware — Verifies JWT access token
 * Use as a preHandler on protected routes
 */
export async function authenticate(request: FastifyRequest, reply: FastifyReply) {
  try {
    const decoded = (await request.jwtVerify()) as JwtPayload;
    // Attach user info to request for downstream use
    request.userId = decoded.userId;
    request.userRoles = decoded.roles;
    request.userPermissions = decoded.permissions;
  } catch (err) {
    reply.status(401).send({
      success: false,
      message: 'Unauthorized — invalid or expired token',
    });
  }
}
