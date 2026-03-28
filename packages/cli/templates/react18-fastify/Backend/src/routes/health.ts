import type { FastifyInstance } from 'fastify';
import { healthController } from '../controllers/healthController.js';

/**
 * Health check routes — no authentication required
 */
export async function healthRoutes(app: FastifyInstance) {
  app.get(
    '/health',
    {
      schema: {
        tags: ['Health'],
        summary: 'Basic health check',
        description: 'Returns application status, version, and uptime',
        response: {
          200: {
            type: 'object',
            properties: {
              success: { type: 'boolean' },
              data: {
                type: 'object',
                properties: {
                  status: { type: 'string' },
                  app: { type: 'string' },
                  version: { type: 'string' },
                  timestamp: { type: 'string' },
                  uptime: { type: 'number' },
                },
              },
            },
          },
        },
      },
    },
    healthController.health
  );

  app.get(
    '/health/db',
    {
      schema: {
        tags: ['Health'],
        summary: 'Database health check',
        description: 'Tests SQL Server connectivity and returns latency',
        response: {
          200: {
            type: 'object',
            properties: {
              success: { type: 'boolean' },
              data: {
                type: 'object',
                properties: {
                  status: { type: 'string' },
                  database: { type: 'string' },
                  latencyMs: { type: 'number' },
                  timestamp: { type: 'string' },
                },
              },
            },
          },
        },
      },
    },
    healthController.dbHealth
  );
}
