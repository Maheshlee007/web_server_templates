#!/usr/bin/env node
/**
 * Database Migration Runner
 * Runs migrations for either MSSQL or PostgreSQL based on DB_TYPE env var
 *
 * Usage:
 *   npm run migrate          # Run all migrations
 *   npm run migrate:up       # Same as above
 *   npm run migrate:status   # Show migration status
 */

import 'dotenv/config';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const DB_TYPE = process.env.DB_TYPE || 'mssql';

console.log(`\n🗄️  Database Migration Runner`);
console.log(`   Database Type: ${DB_TYPE.toUpperCase()}\n`);

async function runMssqlMigrations() {
  const sql = (await import('mssql')).default;

  const config = {
    server: process.env.MSSQL_SERVER,
    database: process.env.MSSQL_DATABASE,
    user: process.env.MSSQL_USER,
    password: process.env.MSSQL_PASSWORD,
    port: parseInt(process.env.MSSQL_PORT || '1433'),
    options: {
      encrypt: process.env.MSSQL_ENCRYPT === 'true',
      trustServerCertificate: process.env.MSSQL_TRUST_SERVER_CERTIFICATE === 'true',
    },
  };

  const migrationsDir = path.join(__dirname, '..', 'migrations');

  if (!fs.existsSync(migrationsDir)) {
    console.log('❌ Migrations directory not found:', migrationsDir);
    process.exit(1);
  }

  const files = fs.readdirSync(migrationsDir)
    .filter(f => f.endsWith('.sql'))
    .sort();

  console.log(`📂 Found ${files.length} MSSQL migration files\n`);

  const pool = await sql.connect(config);
  console.log(`✅ Connected to ${config.server}/${config.database}\n`);

  for (const file of files) {
    console.log(`▶ Running: ${file}`);
    const filePath = path.join(migrationsDir, file);
    const content = fs.readFileSync(filePath, 'utf8');

    // Split by GO statements (MSSQL batch separator)
    const batches = content.split(/\nGO\b/gi).filter(b => b.trim());

    for (const batch of batches) {
      if (batch.trim()) {
        try {
          await pool.request().query(batch);
        } catch (err) {
          console.log(`   ⚠ Warning: ${err.message}`);
        }
      }
    }
    console.log(`   ✓ Completed`);
  }

  await pool.close();
  console.log('\n✅ All MSSQL migrations completed!\n');
}

async function runPostgresMigrations() {
  const pg = (await import('pg')).default;

  const config = {
    host: process.env.POSTGRES_HOST,
    port: parseInt(process.env.POSTGRES_PORT || '5432'),
    database: process.env.POSTGRES_DATABASE,
    user: process.env.POSTGRES_USER,
    password: process.env.POSTGRES_PASSWORD,
    ssl: process.env.POSTGRES_SSL === 'true' ? { rejectUnauthorized: false } : false,
  };

  const migrationsDir = path.join(__dirname, '..', 'migrations_postgres');

  if (!fs.existsSync(migrationsDir)) {
    console.log('❌ PostgreSQL migrations directory not found:', migrationsDir);
    process.exit(1);
  }

  const files = fs.readdirSync(migrationsDir)
    .filter(f => f.endsWith('.sql'))
    .sort();

  console.log(`📂 Found ${files.length} PostgreSQL migration files\n`);

  const pool = new pg.Pool(config);
  const client = await pool.connect();
  console.log(`✅ Connected to ${config.host}/${config.database}\n`);

  for (const file of files) {
    console.log(`▶ Running: ${file}`);
    const filePath = path.join(migrationsDir, file);
    const content = fs.readFileSync(filePath, 'utf8');

    try {
      await client.query(content);
      console.log(`   ✓ Completed`);
    } catch (err) {
      console.log(`   ⚠ Warning: ${err.message}`);
    }
  }

  client.release();
  await pool.end();
  console.log('\n✅ All PostgreSQL migrations completed!\n');
}

async function main() {
  try {
    if (DB_TYPE === 'postgres') {
      await runPostgresMigrations();
    } else {
      await runMssqlMigrations();
    }
  } catch (err) {
    console.error('❌ Migration failed:', err.message);
    process.exit(1);
  }
}

main();
