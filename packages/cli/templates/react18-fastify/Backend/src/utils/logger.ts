import { env } from '../config/environment.js';

/**
 * Logger configuration
 * Uses Fastify's built-in Pino logger — this exports the options
 */
export const loggerOptions = {
  level: env.LOG_LEVEL,
  ...(env.NODE_ENV === 'development'
    ? {
        transport: {
          target: 'pino-pretty',
          options: {
            translateTime: 'HH:MM:ss Z',
            ignore: 'pid,hostname',
            colorize: true,
          },
        },
      }
    : {}),
};
