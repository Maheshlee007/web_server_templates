import type { FastifyInstance, FastifyRequest, FastifyReply } from 'fastify';
import { checkDbHealth } from '../config/database.js';
import { APP_CONFIG } from '../config/app.js';

/**
 * Health Controller — application and database health checks
 */
export const healthController = {
  /**
   * Basic health check
   */
  async health(_request: FastifyRequest, _reply: FastifyReply) {
    return {
      success: true,
      data: {
        status: 'ok',
        app: APP_CONFIG.name,
        version: APP_CONFIG.version,
        timestamp: new Date().toISOString(),
        uptime: process.uptime(),
      },
    };
  },

  /**
   * Database connectivity check
   */
  async dbHealth(_request: FastifyRequest, _reply: FastifyReply) {
    const dbStatus = await checkDbHealth();
    const statusCode = dbStatus.connected ? 200 : 503;

    return {
      success: dbStatus.connected,
      data: {
        status: dbStatus.connected ? 'ok' : 'unhealthy',
        database: dbStatus.connected ? 'connected' : 'disconnected',
        latencyMs: dbStatus.latencyMs,
        timestamp: new Date().toISOString(),
      },
    };
  },
};
