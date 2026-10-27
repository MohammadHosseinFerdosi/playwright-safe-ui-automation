import { chromium, FullConfig } from '@playwright/test';
import fs from 'fs';
import path from 'path';
import dotenv from 'dotenv';

dotenv.config();

async function globalSetup(_config: FullConfig) {
  const baseURL = process.env.BASE_URL ?? 'https://www.saucedemo.com';
  const username = process.env.USERNAME ?? 'standard_user';
  const password = process.env.PASSWORD ?? 'secret_sauce';

  if (!username || !password) {
    throw new Error(
      'Missing USERNAME/PASSWORD. Copy .env.example to .env and fill values.',
    );
  }

  const authDir = path.join(__dirname, '.auth');
  fs.mkdirSync(authDir, { recursive: true });

  const browser = await chromium.launch();
  const page = await browser.newPage();
  await page.goto(baseURL);
  await page.locator('[data-test="username"]').fill(username);
  await page.locator('[data-test="password"]').fill(password);
  await page.locator('[data-test="login-button"]').click();
  await page.waitForURL('**/inventory.html');
  await page.context().storageState({ path: path.join(authDir, 'user.json') });
  await browser.close();
}

export default globalSetup;
