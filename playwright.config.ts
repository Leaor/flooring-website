import { defineConfig } from '@playwright/test';

export default defineConfig({
  testDir: './tests',
  testMatch: ['browser.spec.ts', 'contact-configured.spec.ts'],
  timeout: 90_000,
  expect: { timeout: 15_000 },
  fullyParallel: false,
  workers: 2,
  retries: 0,
  reporter: [['list'], ['html', { open: 'never' }], ['json', { outputFile: process.env.PLAYWRIGHT_JSON_OUTPUT_FILE || 'test-results/results.json' }]],
  // Run `npm run build` first. Existing development or production servers can be
  // reused locally; otherwise Playwright starts and stops the four built apps.
  webServer: ['humber', 'kingsway', 'true-grain', 'montgomery'].map((site, index) => ({
    command: `npm run start --workspace @flooring/${site}`,
    url: `http://127.0.0.1:${3000 + index}`,
    reuseExistingServer: true,
    timeout: 60_000,
  })),
  use: {
    browserName: 'chromium',
    launchOptions: { executablePath: process.env.CHROMIUM_PATH || '/usr/bin/chromium', args: ['--no-sandbox'] },
    screenshot: 'only-on-failure',
    trace: 'retain-on-failure',
  },
});
