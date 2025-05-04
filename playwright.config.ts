
import { defineConfig } from '@playwright/test';

export default defineConfig({
  testDir: './tests',
  timeout: 120000,
  fullyParallel: true, // Enables parallel execution across all tests

  use: {
    headless: false,
    viewport: { width: 1280, height: 720 },
    screenshot: 'only-on-failure',
    video: 'retain-on-failure',
    actionTimeout: 10000,
  },

  // Define multiple parallel projects (optional - useful for multiple browsers)
  projects: [
    {
      name: 'Chromium',
      use: { browserName: 'chromium' },
    }
  ],
});
