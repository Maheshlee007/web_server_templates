import type { FastifyRequest, FastifyReply } from 'fastify';
import { userService } from '../services/userService.js';
import { updateUserSchema, userIdParamSchema, paginationSchema } from '../utils/validators.js';
import { ZodError } from 'zod';

/**
 * User Controller — handles user CRUD endpoints
 *
 * Defense layers (even if frontend is bypassed):
 * 1. Route-level: authenticate + authorize middleware
 * 2. Controller-level: ownership + self-protection checks
 * 3. Service-level: business rules
 */
export const userController = {
  /**
   * GET /users — List all users (Admin/Manager only, enforced by route middleware)
   */
  async listUsers(
    request: FastifyRequest,
    reply: FastifyReply
  ) {
    try {
      const { page, limit } = paginationSchema.parse(request.query);
      const result = await userService.listUsers(page, limit);
      return reply.send({ success: true, data: result });
    } catch (error) {
      if (error instanceof ZodError) {
        return reply.status(400).send({
          success: false,
          message: 'Invalid pagination parameters',
        });
      }
      throw error;
    }
  },

  /**
   * GET /users/:id — Get user by ID (Owner, Admin, or users:read permission)
   */
  async getUser(request: FastifyRequest, reply: FastifyReply) {
    try {
      const { id } = userIdParamSchema.parse(request.params as Record<string, unknown>);

      // Authorization: owner, admin, or has users:read
      const isAdmin = request.userRoles?.includes('Admin');
      const isOwner = request.userId === id;
      const canRead = request.userPermissions?.includes('users:read');

      if (!isAdmin && !isOwner && !canRead) {
        return reply.status(403).send({
          success: false,
          message: 'Forbidden — you can only view your own profile',
        });
      }

      const user = await userService.getUserById(id);
      if (!user) {
        return reply.status(404).send({ success: false, message: 'User not found' });
      }

      return reply.send({ success: true, data: user });
    } catch (error) {
      if (error instanceof ZodError) {
        return reply.status(400).send({ success: false, message: 'Invalid user ID' });
      }
      throw error;
    }
  },

  /**
   * PUT /users/:id — Update user profile (Owner or Admin with users:write)
   */
  async updateUser(request: FastifyRequest, reply: FastifyReply) {
    try {
      const { id } = userIdParamSchema.parse(request.params as Record<string, unknown>);

      const isAdmin = request.userRoles?.includes('Admin');
      const isOwner = request.userId === id;
      const canWrite = request.userPermissions?.includes('users:write');

      // Only owner can update own profile, or admin WITH users:write permission
      if (!isOwner && !(isAdmin && canWrite)) {
        return reply.status(403).send({
          success: false,
          message: 'Forbidden — you can only update your own profile',
        });
      }

      const data = updateUserSchema.parse(request.body);
      const user = await userService.updateUser(id, data);

      if (!user) {
        return reply.status(404).send({ success: false, message: 'User not found' });
      }

      request.log.info({ action: 'user_updated', targetId: id, by: request.userId }, 'User profile updated');
      return reply.send({ success: true, data: user });
    } catch (error) {
      if (error instanceof ZodError) {
        return reply.status(400).send({
          success: false,
          message: 'Validation failed',
          errors: (error as ZodError).errors,
        });
      }
      throw error;
    }
  },

  /**
   * DELETE /users/:id — Deactivate user (Admin + users:delete only)
   * Self-deletion protection: Admin cannot deactivate their own account
   */
  async deactivateUser(request: FastifyRequest, reply: FastifyReply) {
    try {
      const { id } = userIdParamSchema.parse(request.params as Record<string, unknown>);

      // Self-protection: prevent admin from deactivating themselves
      if (request.userId === id) {
        return reply.status(400).send({
          success: false,
          message: 'Cannot deactivate your own account',
        });
      }

      const deactivated = await userService.deactivateUser(id);

      if (!deactivated) {
        return reply.status(404).send({ success: false, message: 'User not found' });
      }

      request.log.info({ action: 'user_deactivated', targetId: id, by: request.userId }, 'User deactivated');
      return reply.send({ success: true, message: 'User deactivated successfully' });
    } catch (error) {
      if (error instanceof ZodError) {
        return reply.status(400).send({ success: false, message: 'Invalid user ID' });
      }
      throw error;
    }
  },
};
