import 'dotenv/config';
import { buildApp } from './app.js';
import { env } from './config/environment.js';
import { getPool, closePool } from './config/database.js';
import { APP_CONFIG } from './config/app.js';

async function start() {
  try {
    // Test database connection on startup
    await getPool();

    // Build Fastify app
    const app = await buildApp();

    // Start listening
    await app.listen({ port: env.PORT, host: '0.0.0.0' });

    console.log(`
╔═══════════════════════════════════════════════════════════════╗
║  ${APP_CONFIG.name} v${APP_CONFIG.version} — Server Running   ║
║────────────────────────────────────────────────────────────── ║
║  API:     http://localhost:${env.PORT}${env.API_PREFIX}       ║
║  Docs:    http://localhost:${env.PORT}/docs                   ║
║  Health:  http://localhost:${env.PORT}/health                 ║
║  Mode:    ${env.NODE_ENV.padEnd(40)}                          ║
╚═══════════════════════════════════════════════════════════════╝
    `);

    // Graceful shutdown
    const signals: NodeJS.Signals[] = ['SIGINT', 'SIGTERM'];
    for (const signal of signals) {
      process.on(signal, async () => {
        console.log(`\n🛑 Received ${signal}, shutting down gracefully...`);
        await app.close();
        await closePool();
        process.exit(0);
      });
    }
  } catch (err) {
    console.error('❌ Failed to start server:', err);
    await closePool();
    process.exit(1);
  }
}

start();
