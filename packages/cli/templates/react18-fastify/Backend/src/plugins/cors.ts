import type { FastifyInstance } from 'fastify';
import fastifyCors from '@fastify/cors';
import { env } from '../config/environment.js';

/**
 * CORS plugin configuration
 */
export async function corsPlugin(app: FastifyInstance) {
  await app.register(fastifyCors, {
    origin: "http://localhost:3000", //env.CORS_ORIGIN.split(',').map((o) => o.trim()),
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With'],
  });
}
