import type { FastifyInstance } from 'fastify';
import { createAuthController } from '../controllers/authController.js';
import { createAuthService } from '../services/authService.js';
import { createTokenService } from '../services/tokenService.js';
import { authenticate } from '../middleware/authenticate.js';

/**
 * Auth routes — registration, login, refresh, logout, me
 */
export async function authRoutes(app: FastifyInstance) {
  // Build service chain
  const tokenService = createTokenService(app);
  const authService = createAuthService(tokenService);
  const authController = createAuthController(authService);

  // ──── Public routes (stricter rate limit) ────

  app.post(
    '/auth/register',
    {
      config: {
        rateLimit: {
          max: 5,
          timeWindow: '15 minutes',
        },
      },
      schema: {
        tags: ['Authentication'],
        summary: 'Register a new user',
        description: 'Creates a new user account with Guest role. Returns JWT tokens.',
        body: {
          type: 'object',
          required: ['email', 'password', 'firstName', 'lastName'],
          properties: {
            email: { type: 'string', format: 'email' },
            password: { type: 'string', minLength: 8 },
            firstName: { type: 'string', minLength: 1, maxLength: 100 },
            lastName: { type: 'string', minLength: 1, maxLength: 100 },
          },
        },
        response: {
          201: {
            type: 'object',
            properties: {
              success: { type: 'boolean' },
              data: {
                type: 'object',
                properties: {
                  user: {
                    type: 'object',
                    properties: {
                      id: { type: 'string' },
                      email: { type: 'string' },
                      firstName: { type: 'string' },
                      lastName: { type: 'string' },
                      isActive: { type: 'boolean' },
                      roles: { type: 'array', items: { type: 'string' } },
                      permissions: { type: 'array', items: { type: 'string' } },
                      createdAt: { type: 'string' },
                    },
                  },
                  accessToken: { type: 'string' },
                  refreshToken: { type: 'string' },
                },
              },
            },
          },
        },
      },
    },
    authController.register
  );

  app.post(
    '/auth/login',
    {
      config: {
        rateLimit: {
          max: 10,
          timeWindow: '15 minutes',
        },
      },
      schema: {
        tags: ['Authentication'],
        summary: 'User login',
        description: 'Authenticates user with email and password. Returns JWT tokens.',
        body: {
          type: 'object',
          required: ['email', 'password'],
          properties: {
            email: { type: 'string', format: 'email' },
            password: { type: 'string', minLength: 6 },
          },
        },
        response: {
          200: {
            type: 'object',
            properties: {
              success: { type: 'boolean' },
              data: {
                type: 'object',
                properties: {
                  user: {
                    type: 'object',
                    properties: {
                      id: { type: 'string' },
                      email: { type: 'string' },
                      firstName: { type: 'string' },
                      lastName: { type: 'string' },
                      isActive: { type: 'boolean' },
                      roles: { type: 'array', items: { type: 'string' } },
                      permissions: { type: 'array', items: { type: 'string' } },
                      createdAt: { type: 'string' },
                    },
                  },
                  accessToken: { type: 'string' },
                  refreshToken: { type: 'string' },
                },
              },
            },
          },
        },
      },
    },
    authController.login
  );

  app.post(
    '/auth/refresh',
    {
      schema: {
        tags: ['Authentication'],
        summary: 'Refresh access token',
        description: 'Exchange a valid refresh token for a new token pair.',
        body: {
          type: 'object',
          required: ['refreshToken'],
          properties: {
            refreshToken: { type: 'string' },
          },
        },
      },
    },
    authController.refresh
  );

  // ──── Protected routes ────

  app.post(
    '/auth/logout',
    {
      preHandler: [authenticate],
      schema: {
        tags: ['Authentication'],
        summary: 'User logout',
        description: 'Revokes all refresh tokens for the authenticated user.',
        security: [{ BearerAuth: [] }],
      },
    },
    authController.logout
  );

  app.get(
    '/auth/me',
    {
      preHandler: [authenticate],
      schema: {
        tags: ['Authentication'],
        summary: 'Get current user profile',
        description: 'Returns the authenticated user profile with roles and permissions.',
        security: [{ BearerAuth: [] }],
      },
    },
    authController.me
  );
}
