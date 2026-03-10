import { test, expect } from '@playwright/test';
// https://playwright.dev/docs/intro

test('visits the app root url', async ({ page }) => {
  await page.goto('/');

  //   await page.waitForLoadState('networkidle');
  await expect(page.locator('h1')).toHaveText('TV Shows Dashboard');
});
