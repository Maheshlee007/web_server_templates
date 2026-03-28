import type { FastifyInstance } from 'fastify';
import fastifyJwt from '@fastify/jwt';
import { jwtConfig } from '../config/jwt.js';

/**
 * JWT plugin — registers @fastify/jwt
 * Provides request.jwtVerify() and reply.jwtSign() decorators
 */
export async function jwtPlugin(app: FastifyInstance) {
  await app.register(fastifyJwt, {
    secret: jwtConfig.secret,
    sign: {
      expiresIn: jwtConfig.accessExpiry,
    },
  });
}
