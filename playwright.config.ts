// playwright.config.ts
import * as dotenv from 'dotenv';
dotenv.config(); // 1) carga variables de .env antes de leer process.env

import { defineConfig, devices } from '@playwright/test';

// 2) parseo básico de envs (todo viene como string)
const BASE_URL = process.env.BASE_URL ?? 'http://localhost:5173';
const HEADLESS = process.env.HEADLESS === undefined
  ? true
  : process.env.HEADLESS.toLowerCase() === 'true';
const RETRIES = Number(process.env.RETRIES ?? (process.env.CI ? 2 : 0));

export default defineConfig({
  testDir: './tests',
  timeout: 30_000,
  expect: { timeout: 5_000 },
  fullyParallel: true,
  retries: RETRIES,
  reporter: [
    ['html', { open: 'never' }],
    ['list']
  ],
  use: {
    baseURL: BASE_URL,          // 3) acá usamos la URL del .env
    headless: HEADLESS,
    trace: 'on-first-retry',
    screenshot: 'only-on-failure',
    video: 'retain-on-failure'
  },
  projects: [
    { name: 'Desktop Chrome', use: { ...devices['Desktop Chrome'] } },
 //   { name: 'Mobile Safari', use: { ...devices['iPhone 14'] } }
  ]
});
