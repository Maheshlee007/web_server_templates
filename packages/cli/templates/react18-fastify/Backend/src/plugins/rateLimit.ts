import type { FastifyInstance } from 'fastify';
import fastifyRateLimit from '@fastify/rate-limit';
import { env } from '../config/environment.js';

/**
 * Global rate limiting plugin
 * Default: 100 requests per 15 minutes
 * Auth routes get stricter limits applied at route level
 */
export async function rateLimitPlugin(app: FastifyInstance) {
  await app.register(fastifyRateLimit, {
    max: env.RATE_LIMIT_MAX_REQUESTS,
    timeWindow: env.RATE_LIMIT_WINDOW_MS,
    errorResponseBuilder: (_request, context) => ({
      success: false,
      message: 'Too many requests, please slow down',
      retryAfter: Math.ceil(context.ttl / 1000),
    }),
  });
}
