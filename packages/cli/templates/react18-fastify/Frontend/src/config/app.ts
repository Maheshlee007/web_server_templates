/**
 * App Configuration - Single source of truth for branding & metadata
 * Change these values once, and they propagate everywhere (frontend + backend)
 */
export const APP_CONFIG = {
  name: 'Fastify React App',
  version: '1.0.0',
  description: 'Fastify React App - Full-Stack Web Application',
  apiBaseUrl: import.meta.env.VITE_API_URL || 'http://localhost:5000/api',
} as const;
