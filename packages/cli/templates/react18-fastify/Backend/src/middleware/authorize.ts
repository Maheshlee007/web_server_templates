import type { FastifyRequest, FastifyReply, HookHandlerDoneFunction } from 'fastify';

/**
 * Authorization Middleware Factory
 *
 * Creates a preHandler that checks if the authenticated user
 * has the required roles OR permissions.
 *
 * Usage:
 * ```ts
 * { preHandler: [authenticate, authorize({ roles: ['Admin'] })] }
 * { preHandler: [authenticate, authorize({ permissions: ['users:read'] })] }
 * { preHandler: [authenticate, authorize({ roles: ['Admin', 'Manager'], mode: 'any' })] }
 * ```
 */
export function authorize(options: {
  roles?: string[];
  permissions?: string[];
  mode?: 'any' | 'all'; // 'any' = at least one match, 'all' = all must match
}) {
  const { roles = [], permissions = [], mode = 'any' } = options;

  return function authorizationHandler(
    request: FastifyRequest,
    reply: FastifyReply,
    done: HookHandlerDoneFunction
  ) {
    const userRoles = request.userRoles ?? [];
    const userPermissions = request.userPermissions ?? [];

    let hasAccess = false;

    if (mode === 'any') {
      // User must have at least one of the required roles OR permissions
      const hasRole = roles.length === 0 || roles.some((r) => userRoles.includes(r));
      const hasPerm =
        permissions.length === 0 || permissions.some((p) => userPermissions.includes(p));

      hasAccess = hasRole || hasPerm;

      // If both roles and permissions are specified, user needs at least one from either
      if (roles.length > 0 && permissions.length > 0) {
        hasAccess =
          roles.some((r) => userRoles.includes(r)) ||
          permissions.some((p) => userPermissions.includes(p));
      }
    } else {
      // 'all' mode — user must have ALL specified roles AND ALL specified permissions
      const hasAllRoles = roles.every((r) => userRoles.includes(r));
      const hasAllPerms = permissions.every((p) => userPermissions.includes(p));
      hasAccess = hasAllRoles && hasAllPerms;
    }

    if (!hasAccess) {
      reply.status(403).send({
        success: false,
        message: 'Forbidden — you do not have permission to access this resource',
        required: { roles, permissions, mode },
      });
      return;
    }

    done();
  };
}
