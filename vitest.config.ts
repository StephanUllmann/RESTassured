import { cloudflareTest } from '@cloudflare/vitest-pool-workers';
import { defineConfig } from 'vitest/config';

export default defineConfig({
  plugins: [
    cloudflareTest({
      wrangler: { configPath: './wrangler.jsonc' },
      miniflare: {
        d1Databases: {
          assured_d1: 'fa28b306-9416-480e-9e02-d53c5e3e4afa',
        },
        d1Persist: '.wrangler/state/v3/d1',
      },
    }),
  ],
  test: {
    setupFiles: ['./src/test-setup.ts'],
    coverage: { enabled: true, provider: 'istanbul' },
  },
});
