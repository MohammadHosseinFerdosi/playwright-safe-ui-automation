import { test, expect } from './fixtures';

test.describe('Inventory (safe)', () => {
  test('shows product catalog after authenticated session', async ({ page }) => {
    await page.goto('/inventory.html');
    await expect(page.locator('.inventory_item')).toHaveCount(6);
    await expect(page.locator('.title')).toHaveText('Products');
  });

  test('sorts products by price low to high', async ({ page }) => {
    await page.goto('/inventory.html');
    await page.locator('[data-test="product-sort-container"]').selectOption('lohi');

    const prices = await page.locator('.inventory_item_price').allTextContents();
    const values = prices.map((p) => Number(p.replace('$', '')));
    const sorted = [...values].sort((a, b) => a - b);
    expect(values).toEqual(sorted);
  });
});
