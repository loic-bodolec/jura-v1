import type { PlaywrightTestConfig } from '@playwright/test';
import { devices } from '@playwright/test';

/**
 * Read environment variables from file.
 * https://github.com/motdotla/dotenv
 */
// require('dotenv').config();

/**
 * See https://playwright.dev/docs/test-configuration.
 */
const config: PlaywrightTestConfig = {
  testDir: './playwright',
  testIgnore: '/playwright/tests-examples/**',
  /* Global timeout for the whole test run. */
  // globalTimeout: 60 * 60 * 1000,
  /* Maximum time one test can run for. */
  timeout: 5 * 60 * 1000,
  expect: {
    /**
     * Maximum time expect() should wait for the condition to be met.
     * For example in `await expect(locator).toHaveText();`
     */
    timeout: 10000
  },
  /* Run tests in files in parallel */
  fullyParallel: false,
  /* Fail the build on CI if you accidentally left test.only in the source code. */
  forbidOnly: !!process.env.CI,
  /* Retry on CI only */
  retries: process.env.CI ? 2 : 0,
  /* Opt out of parallel tests on CI. */
  workers: process.env.CI ? 1 : undefined,
  /* Reporter to use. See https://playwright.dev/docs/test-reporters */
  reporter: [['html', { outputFolder: './playwright/playwright-report' }]],
  // reporter: [["./tests/playwright/custom-reporter/my-awesome-reporter.js"], ["html", { outputFolder: "./tests/playwright/reports" }]],
  // reporter: "./tests/playwright/custom-reporter/my-awesome-reporter.js",
  /* Shared settings for all the projects below. See https://playwright.dev/docs/api/class-testoptions. */
  use: {
    /* Maximum time each action such as `click()` can take. Defaults to 0 (no limit). */
    actionTimeout: 0,
    /* Base URL to use in actions like `await page.goto('/')`. */
    baseURL: 'http://localhost:3000',
    /* Browser distribution channel for Chromium. */
    // channel: "chrome", // or 'msedge', 'chrome-beta', 'msedge-beta', 'msedge-dev', etc.
    // browserName: "firefox", // or "chromium" or "webkit"
    headless: false,
    /* Specify user locale, for example en-GB, de-DE, etc. Locale will affect navigator.language value, Accept-Language request header value as well as number and date formatting rules. */
    // locale: 'fr-FR',
    // geolocation: { longitude: 48.858455, latitude: 2.294474 },
    permissions: ['geolocation'],
    /* Emulates consistent viewport for each page. Defaults to an 1280x720 viewport. null disables the default viewport. */
    viewport: { width: 1480, height: 720 },
    ignoreHTTPSErrors: true,
    screenshot: 'only-on-failure',
    /* Whether to record video for each test. Defaults to 'off'. */
    // video: "on-first-retry",
    /* Collect trace when retrying the failed test. See https://playwright.dev/docs/trace-viewer */
    trace: 'on-first-retry',
    launchOptions: {
      /* Slows down Playwright operations by the specified amount of milliseconds. Useful so that you can see what is going on. */
      slowMo: 1000
    }
  },

  /* Configure projects for major browsers */
  projects: [
    // {
    //   name: 'chromium',
    //   use: {
    //     ...devices['Desktop Chrome']
    //   }
    // },

    {
      name: 'firefox',
      use: {
        ...devices['Desktop Firefox']
      }
    }

    // {
    //   name: 'webkit',
    //   use: {
    //     ...devices['Desktop Safari']
    //   }
    // }

    /* Test against mobile viewports. */
    // {
    //   name: 'Mobile Chrome',
    //   use: {
    //     ...devices['Pixel 5'],
    //   },
    // },
    // {
    //   name: 'Mobile Safari',
    //   use: {
    //     ...devices['iPhone 12'],
    //   },
    // },

    /* Test against branded browsers. */
    // {
    //   name: 'Microsoft Edge',
    //   use: {
    //     channel: 'msedge',
    //   },
    // },
    // {
    //   name: 'Google Chrome',
    //   use: {
    //     channel: 'chrome',
    //   },
    // },
  ],

  /* Folder for test artifacts such as screenshots, videos, traces, etc. */
  outputDir: './playwright/test-results/'

  /* Run your local dev server before starting the tests */
  // webServer: {
  //   command: 'npm start',
  //   port: 3000
  // }
};

export default config;
