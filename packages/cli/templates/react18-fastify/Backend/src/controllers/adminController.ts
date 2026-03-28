import type { FastifyRequest, FastifyReply } from 'fastify';
import { userRepository } from '../repositories/userRepository.js';
import { roleRepository } from '../repositories/roleRepository.js';
import { adminRepository } from '../repositories/adminRepository.js';
import { z } from 'zod';

const paginationSchema = z.object({
  page: z.coerce.number().int().min(1).default(1),
  limit: z.coerce.number().int().min(1).max(100).default(20),
  search: z.string().optional(),
  role: z.string().optional(),
  isActive: z
    .union([z.boolean(), z.string().transform((v) => v === 'true')])
    .optional(),
});

const updateRolesSchema = z.object({
  roles: z.array(z.string().min(1)).min(1, 'At least one role is required'),
});

const toggleStatusSchema = z.object({
  isActive: z.boolean(),
});

/**
 * Admin Controller — Handles user/role/permission management
 */
export const adminController = {
  /**
   * GET /admin/users — Paginated user list with search/filter
   */
  async listUsers(request: FastifyRequest, reply: FastifyReply) {
    try {
      const { page, limit, search, role, isActive } = paginationSchema.parse(request.query);
      const result = await adminRepository.listUsersWithDetails(page, limit, search, role, isActive);
      return reply.send({ success: true, data: result });
    } catch (error) {
      if (error instanceof z.ZodError) {
        return reply.status(400).send({ success: false, message: 'Invalid parameters' });
      }
      throw error;
    }
  },

  /**
   * GET /admin/users/:id — Full user details
   */
  async getUserById(request: FastifyRequest, reply: FastifyReply) {
    const { id } = request.params as { id: string };
    const user = await userRepository.findById(id);
    if (!user) {
      return reply.status(404).send({ success: false, message: 'User not found' });
    }

    const roles = await roleRepository.getUserRoles(user.Id);
    const permissions = await roleRepository.getUserPermissions(user.Id);

    return reply.send({
      success: true,
      data: {
        id: user.Id,
        email: user.Email,
        firstName: user.FirstName,
        lastName: user.LastName,
        isActive: user.IsActive,
        roles,
        permissions,
        createdAt: user.CreatedAt,
        updatedAt: user.UpdatedAt,
      },
    });
  },

  /**
   * PUT /admin/users/:id/roles — Replace user's roles
   */
  async updateUserRoles(request: FastifyRequest, reply: FastifyReply) {
    try {
      const { id } = request.params as { id: string };
      const { roles } = updateRolesSchema.parse(request.body);

      // Verify user exists
      const user = await userRepository.findById(id);
      if (!user) {
        return reply.status(404).send({ success: false, message: 'User not found' });
      }

      // Prevent removing Admin role from yourself
      if (request.userId === id && !roles.includes('Admin')) {
        return reply.status(400).send({
          success: false,
          message: 'Cannot remove Admin role from your own account',
        });
      }

      // Validate all role names exist
      const allRoles = await roleRepository.getAllRoles();
      const validRoleNames = allRoles.map((r) => r.Name);
      const invalidRoles = roles.filter((r) => !validRoleNames.includes(r));
      if (invalidRoles.length > 0) {
        return reply.status(400).send({
          success: false,
          message: `Invalid role(s): ${invalidRoles.join(', ')}`,
        });
      }

      // Replace all user roles
      await adminRepository.replaceUserRoles(id, roles);

      // Fetch updated data
      const updatedRoles = await roleRepository.getUserRoles(id);
      const updatedPermissions = await roleRepository.getUserPermissions(id);

      return reply.send({
        success: true,
        data: {
          id: user.Id,
          email: user.Email,
          firstName: user.FirstName,
          lastName: user.LastName,
          isActive: user.IsActive,
          roles: updatedRoles,
          permissions: updatedPermissions,
          createdAt: user.CreatedAt,
        },
      });
    } catch (error) {
      if (error instanceof z.ZodError) {
        return reply.status(400).send({ success: false, message: 'Invalid request body' });
      }
      throw error;
    }
  },

  /**
   * PATCH /admin/users/:id/status — Activate/deactivate user
   */
  async toggleUserStatus(request: FastifyRequest, reply: FastifyReply) {
    try {
      const { id } = request.params as { id: string };
      const { isActive } = toggleStatusSchema.parse(request.body);

      // Prevent deactivating yourself
      if (request.userId === id && !isActive) {
        return reply.status(400).send({
          success: false,
          message: 'Cannot deactivate your own account',
        });
      }

      const updated = await adminRepository.setUserStatus(id, isActive);
      if (!updated) {
        return reply.status(404).send({ success: false, message: 'User not found' });
      }

      return reply.send({
        success: true,
        message: `User ${isActive ? 'activated' : 'deactivated'} successfully`,
      });
    } catch (error) {
      if (error instanceof z.ZodError) {
        return reply.status(400).send({ success: false, message: 'Invalid request body' });
      }
      throw error;
    }
  },

  /**
   * GET /admin/roles — All roles with their permissions and user count
   */
  async listRoles(_request: FastifyRequest, reply: FastifyReply) {
    const roles = await adminRepository.listRolesWithDetails();
    return reply.send({ success: true, data: roles });
  },

  /**
   * GET /admin/permissions — All permissions
   */
  async listPermissions(_request: FastifyRequest, reply: FastifyReply) {
    const permissions = await adminRepository.listAllPermissions();
    return reply.send({ success: true, data: permissions });
  },

  /**
   * GET /admin/stats — Dashboard statistics
   */
  async getStats(_request: FastifyRequest, reply: FastifyReply) {
    const stats = await adminRepository.getSystemStats();
    return reply.send({ success: true, data: stats });
  },

  // ═══════════════════════════════════════════
  //  SCREEN-ROLE ACCESS MANAGEMENT
  // ═══════════════════════════════════════════

  /**
   * GET /admin/screen-access — Get all screen-role mappings
   */
  async getScreenAccess(_request: FastifyRequest, reply: FastifyReply) {
    const mappings = await adminRepository.getScreenAccessMappings();
    return reply.send({ success: true, data: mappings });
  },

  /**
   * PUT /admin/screen-access — Upsert a screen-role mapping
   */
  async upsertScreenAccess(request: FastifyRequest, reply: FastifyReply) {
    try {
      const schema = z.object({
        screenId: z.string().min(1),
        screenName: z.string().min(1),
        path: z.string().min(1),
        category: z.enum(['core', 'admin', 'demo', 'settings']).default('core'),
        description: z.string().optional(),
        requiresAuth: z.boolean().optional(),
        isHidden: z.boolean().optional(),
        roles: z.array(z.string()).default([]),
        permissions: z.array(z.string()).default([]),
      });

      const entry = schema.parse(request.body);

      // Validate role names if any
      if (entry.roles.length > 0) {
        const allRoles = await roleRepository.getAllRoles();
        const validRoleNames = allRoles.map((r) => r.Name);
        const invalid = entry.roles.filter((r) => !validRoleNames.includes(r));
        if (invalid.length > 0) {
          return reply.status(400).send({
            success: false,
            message: `Invalid role(s): ${invalid.join(', ')}`,
          });
        }
      }

      await adminRepository.upsertScreenAccess(entry);
      return reply.send({ success: true, message: 'Screen access mapping saved' });
    } catch (error) {
      if (error instanceof z.ZodError) {
        return reply.status(400).send({ success: false, message: 'Invalid request body', errors: error.flatten() });
      }
      throw error;
    }
  },

  /**
   * DELETE /admin/screen-access/:screenId — Remove a screen-role mapping
   */
  async deleteScreenAccess(request: FastifyRequest, reply: FastifyReply) {
    const { screenId } = request.params as { screenId: string };
    const deleted = await adminRepository.deleteScreenAccess(screenId);
    if (!deleted) {
      return reply.status(404).send({ success: false, message: 'Screen mapping not found' });
    }
    return reply.send({ success: true, message: 'Screen mapping deleted' });
  },

  /**
   * POST /admin/screen-access/seed — Seed screen access from routeRegistry defaults
   */
  async seedScreenAccess(request: FastifyRequest, reply: FastifyReply) {
    try {
      const schema = z.object({
        entries: z.array(
          z.object({
            screenId: z.string().min(1),
            screenName: z.string().min(1),
            path: z.string().min(1),
            category: z.string().default('core'),
            description: z.string().optional(),
            roles: z.array(z.string()).default([]),
            permissions: z.array(z.string()).default([]),
          })
        ),
      });
      const { entries } = schema.parse(request.body);
      const count = await adminRepository.seedScreenAccess(entries);
      return reply.send({ success: true, message: `${count} screen mappings synced` });
    } catch (error) {
      if (error instanceof z.ZodError) {
        return reply.status(400).send({ success: false, message: 'Invalid request body' });
      }
      throw error;
    }
  },
};
