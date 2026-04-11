// scripts/seed.ts (or wherever you kept it)
import { drizzle } from 'drizzle-orm/d1';
import { getPlatformProxy } from 'wrangler';
import { resetDatabase, seedDatabase } from '../src/db/seed-utils.ts';

interface Env {
  assured_d1: D1Database;
}

async function runSeed() {
  console.log('🌱 Starting database seed...');

  // Establish connection to local/remote DB
  const { env, dispose } = await getPlatformProxy<Env>({
    persist: true,
  });
  const db = drizzle(env.assured_d1);

  console.log('🧹 Wiping existing data...');
  await resetDatabase(db);

  console.log('🛒 Seeding database...');
  await seedDatabase(db);

  console.log('✅ Seed completed successfully!');
  await dispose();
  process.exit(0);
}

runSeed().catch((err) => {
  console.error('❌ Seeding failed:', err);
  process.exit(1);
});
