import type { FastifyInstance } from 'fastify';
import { userController } from '../controllers/userController.js';
import { authenticate } from '../middleware/authenticate.js';
import { authorize } from '../middleware/authorize.js';

/**
 * User routes — CRUD operations with defense-in-depth RBAC
 *
 * Security layers:
 * 1. authenticate — JWT token verification
 * 2. authorize — Role/permission checks at route level
 * 3. Controller — Ownership checks (user can only modify own profile)
 * 4. Service — Business rules (deactivation prevention, etc.)
 *
 * Even if frontend checks are bypassed, the API is always protected.
 */
export async function userRoutes(app: FastifyInstance) {
  // GET /users — List all users (Admin/Manager + needs users:read permission)
  app.get(
    '/users',
    {
      preHandler: [
        authenticate,
        authorize({ roles: ['Admin', 'Manager'], permissions: ['users:read'], mode: 'any' }),
      ],
      schema: {
        tags: ['Users'],
        summary: 'List all users',
        description: 'Returns a paginated list of all users. Requires Admin/Manager role OR users:read permission.',
        security: [{ BearerAuth: [] }],
        querystring: {
          type: 'object',
          properties: {
            page: { type: 'integer', minimum: 1, default: 1 },
            limit: { type: 'integer', minimum: 1, maximum: 100, default: 20 },
          },
        },
      },
    },
    async (request, reply) => userController.listUsers(request, reply)
  );

  // GET /users/:id — Get user by ID (Owner, Admin, or users:read permission)
  app.get(
    '/users/:id',
    {
      preHandler: [authenticate],
      schema: {
        tags: ['Users'],
        summary: 'Get user by ID',
        description: 'Returns a user profile. Users can view their own profile; Admins or users with users:read can view any.',
        security: [{ BearerAuth: [] }],
        params: {
          type: 'object',
          properties: {
            id: { type: 'string', format: 'uuid' },
          },
        },
      },
    },
    async (request, reply) => userController.getUser(request, reply)
  );

  // PUT /users/:id — Update user (Owner or Admin + users:write permission)
  app.put(
    '/users/:id',
    {
      preHandler: [authenticate],
      schema: {
        tags: ['Users'],
        summary: 'Update user profile',
        description: 'Updates a user profile. Users can update their own; Admins with users:write can update any.',
        security: [{ BearerAuth: [] }],
        params: {
          type: 'object',
          properties: {
            id: { type: 'string', format: 'uuid' },
          },
        },
        body: {
          type: 'object',
          properties: {
            firstName: { type: 'string' },
            lastName: { type: 'string' },
            email: { type: 'string', format: 'email' },
          },
        },
      },
    },
    async (request, reply) => userController.updateUser(request, reply)
  );

  // DELETE /users/:id — Deactivate user (Admin only + users:delete permission)
  app.delete(
    '/users/:id',
    {
      preHandler: [
        authenticate,
        authorize({ roles: ['Admin'], permissions: ['users:delete'], mode: 'all' }),
      ],
      schema: {
        tags: ['Users'],
        summary: 'Deactivate user',
        description: 'Soft-deletes a user by deactivating their account. Requires Admin role AND users:delete permission.',
        security: [{ BearerAuth: [] }],
        params: {
          type: 'object',
          properties: {
            id: { type: 'string', format: 'uuid' },
          },
        },
      },
    },
    async (request, reply) => userController.deactivateUser(request, reply)
  );
}
