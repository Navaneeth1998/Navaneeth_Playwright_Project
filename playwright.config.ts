import { defineConfig } from '@playwright/test';

export default defineConfig({
  use: {
    headless: false,
    viewport: { width: 1280, height: 720 },
    screenshot: 'only-on-failure',
    video: 'retain-on-failure',
    actionTimeout: 10000, // per interaction
  },
  testDir: './tests',
  timeout: 120000, // increase to 60 seconds if needed
});
