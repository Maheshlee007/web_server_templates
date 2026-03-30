import Fastify from 'fastify';
import crypto from 'crypto';
import fastifyJwt from '@fastify/jwt';
import fastifyCors from '@fastify/cors';
import fastifyHelmet from '@fastify/helmet';
import fastifySwagger from '@fastify/swagger';
import fastifySwaggerUi from '@fastify/swagger-ui';
import { loggerOptions } from './utils/logger.js';
import { rateLimitPlugin } from './plugins/rateLimit.js';
import { jwtConfig } from './config/jwt.js';
import { env } from './config/environment.js';
import { APP_CONFIG } from './config/app.js';
import { errorHandler } from './middleware/errorHandler.js';
import { registerRoutes } from './routes/index.js';

/**
 * Timing-safe string comparison to prevent timing attacks on secrets
 */
function safeCompare(a: string, b: string): boolean {
  if (a.length !== b.length) return false;
  return crypto.timingSafeEqual(Buffer.from(a), Buffer.from(b));
}

/**
 * Build and configure the Fastify application
 */
export async function buildApp() {
  const app = Fastify({
    logger: loggerOptions,
    bodyLimit: 1_048_576, // 1MB — prevent oversized payload attacks
  });

  // ──── Request ID for tracing ────
  app.addHook('onRequest', async (request) => {
    request.id = request.id || crypto.randomUUID();
  });

  // ──── CORS ────
  const corsOrigins = env.CORS_ORIGIN.split(',').map((o) => o.trim());
  if (env.NODE_ENV === 'production' && corsOrigins.includes('*')) {
    app.log.warn('⚠ CORS_ORIGIN is set to "*" in production — this is insecure. Set specific origins.');
  }
  await app.register(fastifyCors, {
    origin: corsOrigins,
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With'],
    exposedHeaders: ['X-Total-Count'],
    maxAge: 86400, // Cache preflight responses for 24 hours
  });

  // ──── Security Headers (Helmet) ────
  await app.register(fastifyHelmet, {
    contentSecurityPolicy: env.NODE_ENV === 'production',
  });

  // ──── Rate Limiting ────
  await app.register(rateLimitPlugin);

  // ──── JWT — registered at root (NOT encapsulated) ────
  await app.register(fastifyJwt, {
    secret: jwtConfig.secret,
    sign: {
      expiresIn: jwtConfig.accessExpiry,
    },
  });

  // ──── Swagger — disabled in production ────
  if (env.NODE_ENV !== 'production') {
    await app.register(fastifySwagger, {
      openapi: {
        openapi: '3.1.0',
        info: {
          title: `${APP_CONFIG.name} API`,
          description: APP_CONFIG.description,
          version: APP_CONFIG.version,
        },
        servers: [
          {
            url: `http://localhost:${env.PORT}`,
            description: 'Development server',
          },
        ],
        components: {
          securitySchemes: {
            BearerAuth: {
              type: 'http',
              scheme: 'bearer',
              bearerFormat: 'JWT',
              description: 'Enter your JWT access token',
            },
          },
        },
      },
    });

    await app.register(fastifySwaggerUi, {
      routePrefix: '/docs',
      uiConfig: {
        docExpansion: 'list',
        deepLinking: true,
        persistAuthorization: true,
      },
    });

    // ──── Secret-protected Admin Swagger docs ────
    // Access via Authorization header: Authorization: Bearer <SWAGGER_ADMIN_SECRET>
    app.get('/admin-docs', async (request, reply) => {
      const authHeader = request.headers.authorization;
      const secret = authHeader?.startsWith('Bearer ') ? authHeader.slice(7) : null;

      // Also accept query param for browser access (dev convenience)
      const querySecret = (request.query as { secret?: string }).secret;
      const providedSecret = secret || querySecret || '';

      if (!providedSecret || !safeCompare(providedSecret, env.SWAGGER_ADMIN_SECRET)) {
        return reply.status(403).send({ error: 'Forbidden — invalid or missing secret' });
      }

      return reply.type('text/html').send(`
        <!DOCTYPE html>
        <html>
        <head>
          <title>Fastify React App — Admin API Docs</title>
          <link rel="stylesheet" href="https://unpkg.com/swagger-ui-dist@5/swagger-ui.css" />
        </head>
        <body>
          <div id="swagger-ui"></div>
          <script src="https://unpkg.com/swagger-ui-dist@5/swagger-ui-bundle.js"></script>
          <script>
            SwaggerUIBundle({
              url: '/admin-docs/json',
              dom_id: '#swagger-ui',
              deepLinking: true,
              docExpansion: 'list',
              persistAuthorization: true,
              requestInterceptor: (req) => {
                req.headers['Authorization'] = 'Bearer ${providedSecret}';
                return req;
              },
            });
          </script>
        </body>
        </html>
      `);
    });

    // JSON endpoint for admin swagger spec (includes hidden routes)
    app.get('/admin-docs/json', async (request, reply) => {
      const authHeader = request.headers.authorization;
      const secret = authHeader?.startsWith('Bearer ') ? authHeader.slice(7) : null;
      const querySecret = (request.query as { secret?: string }).secret;
      const providedSecret = secret || querySecret || '';

      if (!providedSecret || !safeCompare(providedSecret, env.SWAGGER_ADMIN_SECRET)) {
        return reply.status(403).send({ error: 'Forbidden' });
      }

      const spec = JSON.parse(JSON.stringify(app.swagger()));

      const adminPaths = buildAdminSwaggerPaths();
      for (const [path, methods] of Object.entries(adminPaths)) {
        spec.paths[path] = { ...(spec.paths[path] ?? {}), ...methods };
      }

      return reply.send(spec);
    });
  } else {
    app.log.info('Swagger/admin-docs disabled in production');
  }

  // ──── Error Handling ────
  errorHandler(app);

  // ──── Routes ────
  await app.register(registerRoutes);

  // ──── Ready ────
  await app.ready();

  return app;
}

/**
 * Build OpenAPI path entries for admin routes (hidden from public swagger)
 * These are manually listed here so the secret admin-docs endpoint can expose them.
 */
function buildAdminSwaggerPaths(): Record<string, Record<string, unknown>> {
  const security = [{ BearerAuth: [] }];
  const prefix = '/api/admin';

  return {
    [`${prefix}/users`]: {
      get: {
        tags: ['Admin - Users'],
        summary: 'List all users with roles & permissions',
        description: 'Returns a paginated list of all users including their roles, permissions, and account status.',
        security,
        parameters: [
          { name: 'page', in: 'query', schema: { type: 'integer', default: 1 } },
          { name: 'limit', in: 'query', schema: { type: 'integer', default: 20 } },
          { name: 'search', in: 'query', schema: { type: 'string' } },
          { name: 'role', in: 'query', schema: { type: 'string' } },
          { name: 'isActive', in: 'query', schema: { type: 'boolean' } },
        ],
        responses: { 200: { description: 'Paginated users list' } },
      },
    },
    [`${prefix}/users/{id}`]: {
      get: {
        tags: ['Admin - Users'],
        summary: 'Get user details by ID',
        security,
        parameters: [{ name: 'id', in: 'path', required: true, schema: { type: 'string', format: 'uuid' } }],
        responses: { 200: { description: 'User details' } },
      },
    },
    [`${prefix}/users/{id}/roles`]: {
      put: {
        tags: ['Admin - Users'],
        summary: 'Update user roles',
        security,
        parameters: [{ name: 'id', in: 'path', required: true, schema: { type: 'string', format: 'uuid' } }],
        requestBody: {
          content: { 'application/json': { schema: { type: 'object', required: ['roles'], properties: { roles: { type: 'array', items: { type: 'string' } } } } } },
        },
        responses: { 200: { description: 'Roles updated' } },
      },
    },
    [`${prefix}/users/{id}/status`]: {
      patch: {
        tags: ['Admin - Users'],
        summary: 'Activate or deactivate a user',
        security,
        parameters: [{ name: 'id', in: 'path', required: true, schema: { type: 'string', format: 'uuid' } }],
        requestBody: {
          content: { 'application/json': { schema: { type: 'object', required: ['isActive'], properties: { isActive: { type: 'boolean' } } } } },
        },
        responses: { 200: { description: 'Status updated' } },
      },
    },
    [`${prefix}/roles`]: {
      get: {
        tags: ['Admin - Roles'],
        summary: 'List all roles with their permissions',
        security,
        responses: { 200: { description: 'Roles with permissions' } },
      },
    },
    [`${prefix}/permissions`]: {
      get: {
        tags: ['Admin - Roles'],
        summary: 'List all available permissions',
        security,
        responses: { 200: { description: 'All permissions' } },
      },
    },
    [`${prefix}/stats`]: {
      get: {
        tags: ['Admin - Dashboard'],
        summary: 'Get system statistics',
        description: 'Returns user counts, role distribution, and recent signups.',
        security,
        responses: { 200: { description: 'System statistics' } },
      },
    },
    [`${prefix}/screen-access`]: {
      get: {
        tags: ['Admin - Screen Access'],
        summary: 'Get screen-role access mappings',
        security,
        responses: { 200: { description: 'Screen access mappings' } },
      },
      put: {
        tags: ['Admin - Screen Access'],
        summary: 'Update screen-role access mapping',
        security,
        requestBody: {
          content: { 'application/json': { schema: { type: 'object', required: ['screenId', 'roles'], properties: { screenId: { type: 'string' }, roles: { type: 'array', items: { type: 'string' } } } } } },
        },
        responses: { 200: { description: 'Mapping updated' } },
      },
    },
  };
}
