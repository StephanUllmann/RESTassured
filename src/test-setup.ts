// src/test-setup.ts
import { env } from 'cloudflare:test';
import { beforeEach } from 'vitest';
import { drizzle } from 'drizzle-orm/d1';
import { resetDatabase, seedDatabase } from './db/seed-utils';

beforeEach(async () => {
  const db = drizzle(env.assured_d1);

  // 1. Create tables if they don't exist (needed for blank test environments)
  await env.assured_d1.batch([
    env.assured_d1.prepare(
      'CREATE TABLE IF NOT EXISTS products_categories (id INTEGER PRIMARY KEY AUTOINCREMENT, designation TEXT(128) NOT NULL)'
    ),
    env.assured_d1.prepare(
      'CREATE UNIQUE INDEX IF NOT EXISTS designation_idx ON products_categories (designation)'
    ),
    env.assured_d1.prepare(
      'CREATE TABLE IF NOT EXISTS products (id INTEGER PRIMARY KEY AUTOINCREMENT, title TEXT NOT NULL, description TEXT NOT NULL, image TEXT NOT NULL, price INTEGER NOT NULL, categoryId INTEGER NOT NULL, rating_rate REAL DEFAULT 0, rating_count INTEGER DEFAULT 0, FOREIGN KEY (categoryId) REFERENCES products_categories(id))'
    ),
    env.assured_d1.prepare(
      'CREATE UNIQUE INDEX IF NOT EXISTS title_idx ON products (title)'
    ),
  ]);

  // 2. Wipe and seed using the shared logic
  await resetDatabase(db);
  await seedDatabase(db);
});
