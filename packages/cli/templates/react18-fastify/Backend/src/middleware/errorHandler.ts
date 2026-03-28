import type { FastifyInstance, FastifyError, FastifyRequest, FastifyReply } from 'fastify';

/**
 * Global error handler — consistent error response format
 */
export function errorHandler(app: FastifyInstance) {
  app.setErrorHandler((error: FastifyError, request: FastifyRequest, reply: FastifyReply) => {
    const statusCode = error.statusCode ?? 500;

    // Log server errors
    if (statusCode >= 500) {
      request.log.error(error, 'Internal server error');
    } else {
      request.log.warn(error, `Client error: ${statusCode}`);
    }

    // Rate limit errors
    if (statusCode === 429) {
      return reply.status(429).send({
        success: false,
        message: error.message || 'Too many requests',
      });
    }

    // Validation errors (Fastify built-in)
    if (error.validation) {
      return reply.status(400).send({
        success: false,
        message: 'Validation failed',
        errors: error.validation.map((v) => ({
          field: v.instancePath || v.params?.missingProperty || 'unknown',
          message: v.message,
        })),
      });
    }

    // Business logic errors (thrown with statusCode)
    if (statusCode < 500) {
      return reply.status(statusCode).send({
        success: false,
        message: error.message,
      });
    }

    // Unexpected server errors — don't leak details
    return reply.status(500).send({
      success: false,
      message: 'Internal server error',
    });
  });

  // Handle 404
  app.setNotFoundHandler((_request, reply) => {
    reply.status(404).send({
      success: false,
      message: 'Route not found',
    });
  });
}
