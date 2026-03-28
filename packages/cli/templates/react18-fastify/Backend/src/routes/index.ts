import type { FastifyInstance } from 'fastify';
import { healthRoutes } from './health.js';
import { authRoutes } from './auth.js';
import { userRoutes } from './users.js';
import { adminRoutes } from './admin.js';
import { env } from '../config/environment.js';

/**
 * Register all routes under the API prefix
 */
export async function registerRoutes(app: FastifyInstance) {
  // Health routes — no prefix (accessible at /health, /health/db)
  await app.register(healthRoutes);

  // API routes — under /api prefix
  await app.register(
    async (apiApp) => {
      await apiApp.register(authRoutes);
      await apiApp.register(userRoutes);
      await apiApp.register(adminRoutes, { prefix: '/admin' });
    },
    { prefix: env.API_PREFIX }
  );
}
