import type { FastifyRequest, FastifyReply } from 'fastify';
import type { AuthService } from '../services/authService.js';
import { loginSchema, registerSchema, refreshTokenSchema } from '../utils/validators.js';
import { ZodError } from 'zod';

/**
 * Auth Controller Factory — returns handlers bound to the authService
 */
export function createAuthController(authService: AuthService) {
  /**
   * Helper: format Zod errors into a clean response
   */
  function formatZodError(error: ZodError) {
    return {
      success: false,
      message: 'Validation failed',
      errors: error.errors.reduce(
        (acc, e) => {
          const field = e.path.join('.');
          if (!acc[field]) acc[field] = [];
          acc[field].push(e.message);
          return acc;
        },
        {} as Record<string, string[]>
      ),
    };
  }

  return {
    /**
     * POST /auth/register
     */
    async register(request: FastifyRequest, reply: FastifyReply) {
      try {
        const data = registerSchema.parse(request.body);
        const result = await authService.register(data);
        return reply.status(201).send({ success: true, data: result });
      } catch (error: any) {
        if (error instanceof ZodError) {
          return reply.status(400).send(formatZodError(error));
        }
        if (error.statusCode) {
          return reply.status(error.statusCode).send({ success: false, message: error.message });
        }
        throw error;
      }
    },

    /**
     * POST /auth/login
     */
    async login(request: FastifyRequest, reply: FastifyReply) {
      try {
        const data = loginSchema.parse(request.body);
        const result = await authService.login(data);
        return reply.send({ success: true, data: result });
      } catch (error: any) {
        if (error instanceof ZodError) {
          return reply.status(400).send(formatZodError(error));
        }
        if (error.statusCode) {
          return reply.status(error.statusCode).send({ success: false, message: error.message });
        }
        throw error;
      }
    },

    /**
     * POST /auth/refresh
     */
    async refresh(request: FastifyRequest, reply: FastifyReply) {
      try {
        const { refreshToken } = refreshTokenSchema.parse(request.body);
        const result = await authService.refresh(refreshToken);

        if (!result) {
          return reply.status(401).send({
            success: false,
            message: 'Invalid or expired refresh token',
          });
        }

        return reply.send({ success: true, data: result });
      } catch (error: any) {
        if (error instanceof ZodError) {
          return reply.status(400).send(formatZodError(error));
        }
        throw error;
      }
    },

    /**
     * POST /auth/logout — Requires authentication
     */
    async logout(request: FastifyRequest, reply: FastifyReply) {
      await authService.logout(request.userId!);
      return reply.send({ success: true, message: 'Logged out successfully' });
    },

    /**
     * GET /auth/me — Requires authentication
     */
    async me(request: FastifyRequest, reply: FastifyReply) {
      const user = await authService.getMe(request.userId!);
      if (!user) {
        return reply.status(404).send({ success: false, message: 'User not found' });
      }
      return reply.send({ success: true, data: user });
    },
  };
}
