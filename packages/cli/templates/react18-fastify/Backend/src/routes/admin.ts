import type { FastifyInstance } from 'fastify';
import { authenticate } from '../middleware/authenticate.js';
import { authorize } from '../middleware/authorize.js';
import { adminController } from '../controllers/adminController.js';

/**
 * Admin routes — User management, role management, system administration
 * All routes require Admin role
 */
export async function adminRoutes(app: FastifyInstance) {
  // ──── All admin routes require authentication + Admin role ────
  app.addHook('preHandler', authenticate);
  app.addHook('preHandler', authorize({ roles: ['Admin'], permissions: ['admin:access'] }));

  // ──── Hide ALL admin routes from the public Swagger docs ────
  app.addHook('onRoute', (routeOptions) => {
    if (!routeOptions.schema) routeOptions.schema = {};
    (routeOptions.schema as Record<string, unknown>).hide = true;
  });

  // ═══════════════════════════════════════════
  //  USER MANAGEMENT
  // ═══════════════════════════════════════════

  // GET /admin/users — List all users with full details
  app.get(
    '/users',
    {
      schema: {
        tags: ['Admin - Users'],
        summary: 'List all users with roles & permissions',
        description: 'Returns a paginated list of all users including their roles, permissions, and account status.',
        security: [{ BearerAuth: [] }],
        querystring: {
          type: 'object',
          properties: {
            page: { type: 'integer', minimum: 1, default: 1 },
            limit: { type: 'integer', minimum: 1, maximum: 100, default: 20 },
            search: { type: 'string', description: 'Search by name or email' },
            role: { type: 'string', description: 'Filter by role name' },
            isActive: { type: 'boolean', description: 'Filter by active status' },
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
                  items: {
                    type: 'array',
                    items: {
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
                        updatedAt: { type: 'string' },
                      },
                    },
                  },
                  total: { type: 'integer' },
                  page: { type: 'integer' },
                  limit: { type: 'integer' },
                  totalPages: { type: 'integer' },
                },
              },
            },
          },
        },
      },
    },
    adminController.listUsers
  );

  // GET /admin/users/:id — Get user details
  app.get(
    '/users/:id',
    {
      schema: {
        tags: ['Admin - Users'],
        summary: 'Get user details by ID',
        security: [{ BearerAuth: [] }],
        params: {
          type: 'object',
          properties: { id: { type: 'string', format: 'uuid' } },
          required: ['id'],
        },
      },
    },
    adminController.getUserById
  );

  // PUT /admin/users/:id/roles — Update user roles
  app.put(
    '/users/:id/roles',
    {
      schema: {
        tags: ['Admin - Users'],
        summary: 'Update user roles',
        description: 'Replaces all roles for a user with the provided set of roles.',
        security: [{ BearerAuth: [] }],
        params: {
          type: 'object',
          properties: { id: { type: 'string', format: 'uuid' } },
          required: ['id'],
        },
        body: {
          type: 'object',
          required: ['roles'],
          properties: {
            roles: {
              type: 'array',
              items: { type: 'string' },
              description: 'Array of role names to assign',
              minItems: 1,
            },
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
            },
          },
        },
      },
    },
    adminController.updateUserRoles
  );

  // PATCH /admin/users/:id/status — Activate/deactivate user
  app.patch(
    '/users/:id/status',
    {
      schema: {
        tags: ['Admin - Users'],
        summary: 'Activate or deactivate a user',
        security: [{ BearerAuth: [] }],
        params: {
          type: 'object',
          properties: { id: { type: 'string', format: 'uuid' } },
          required: ['id'],
        },
        body: {
          type: 'object',
          required: ['isActive'],
          properties: {
            isActive: { type: 'boolean' },
          },
        },
      },
    },
    adminController.toggleUserStatus
  );

  // ═══════════════════════════════════════════
  //  ROLE MANAGEMENT
  // ═══════════════════════════════════════════

  // GET /admin/roles — List all roles with permission counts
  app.get(
    '/roles',
    {
      schema: {
        tags: ['Admin - Roles'],
        summary: 'List all roles with their permissions',
        security: [{ BearerAuth: [] }],
        response: {
          200: {
            type: 'object',
            properties: {
              success: { type: 'boolean' },
              data: {
                type: 'array',
                items: {
                  type: 'object',
                  properties: {
                    id: { type: 'integer' },
                    name: { type: 'string' },
                    description: { type: 'string' },
                    permissions: { type: 'array', items: { type: 'string' } },
                    userCount: { type: 'integer' },
                  },
                },
              },
            },
          },
        },
      },
    },
    adminController.listRoles
  );

  // GET /admin/permissions — List all permissions
  app.get(
    '/permissions',
    {
      schema: {
        tags: ['Admin - Roles'],
        summary: 'List all available permissions',
        security: [{ BearerAuth: [] }],
        response: {
          200: {
            type: 'object',
            properties: {
              success: { type: 'boolean' },
              data: {
                type: 'array',
                items: {
                  type: 'object',
                  properties: {
                    id: { type: 'integer' },
                    name: { type: 'string' },
                    description: { type: 'string' },
                    resource: { type: 'string' },
                    action: { type: 'string' },
                  },
                },
              },
            },
          },
        },
      },
    },
    adminController.listPermissions
  );

  // GET /admin/stats — Dashboard statistics
  app.get(
    '/stats',
    {
      schema: {
        tags: ['Admin - Dashboard'],
        summary: 'Get system statistics',
        description: 'Returns user counts, role distribution, and recent signups.',
        security: [{ BearerAuth: [] }],
      },
    },
    adminController.getStats
  );

  // ═══════════════════════════════════════════
  //  SCREEN-ROLE ACCESS
  // ═══════════════════════════════════════════

  // GET /admin/screen-access — Get all screen-role mappings
  app.get(
    '/screen-access',
    {
      schema: {
        tags: ['Admin - Screen Access'],
        summary: 'Get screen-role access mappings',
        security: [{ BearerAuth: [] }],
      },
    },
    adminController.getScreenAccess
  );

  // PUT /admin/screen-access — Upsert a screen-role mapping
  app.put(
    '/screen-access',
    {
      schema: {
        tags: ['Admin - Screen Access'],
        summary: 'Create or update screen-role mapping',
        security: [{ BearerAuth: [] }],
        body: {
          type: 'object',
          required: ['screenId', 'screenName', 'path'],
          properties: {
            screenId: { type: 'string' },
            screenName: { type: 'string' },
            path: { type: 'string' },
            category: { type: 'string', enum: ['core', 'admin', 'demo', 'settings'] },
            description: { type: 'string' },
            requiresAuth: { type: 'boolean' },
            isHidden: { type: 'boolean' },
            roles: { type: 'array', items: { type: 'string' } },
            permissions: { type: 'array', items: { type: 'string' } },
          },
        },
      },
    },
    adminController.upsertScreenAccess
  );

  // DELETE /admin/screen-access/:screenId — Remove a screen-role mapping
  app.delete(
    '/screen-access/:screenId',
    {
      schema: {
        tags: ['Admin - Screen Access'],
        summary: 'Delete a screen-role mapping',
        security: [{ BearerAuth: [] }],
        params: {
          type: 'object',
          properties: { screenId: { type: 'string' } },
          required: ['screenId'],
        },
      },
    },
    adminController.deleteScreenAccess
  );

  // POST /admin/screen-access/seed — Seed screen access from frontend registry
  app.post(
    '/screen-access/seed',
    {
      schema: {
        tags: ['Admin - Screen Access'],
        summary: 'Seed screen access mappings from frontend route registry',
        security: [{ BearerAuth: [] }],
        body: {
          type: 'object',
          required: ['entries'],
          properties: {
            entries: {
              type: 'array',
              items: {
                type: 'object',
                properties: {
                  screenId: { type: 'string' },
                  screenName: { type: 'string' },
                  path: { type: 'string' },
                  category: { type: 'string' },
                  description: { type: 'string' },
                  roles: { type: 'array', items: { type: 'string' } },
                  permissions: { type: 'array', items: { type: 'string' } },
                },
              },
            },
          },
        },
      },
    },
    adminController.seedScreenAccess
  );
}
