import { test, expect } from './fixtures';
import { addFirstProduct, openCart, removeAllCartItems, resetAppState } from './utils/cart';

test.describe('Cart (safe)', () => {
  test('adds a product and cleans up in finally', async ({ page }) => {
    await page.goto('/inventory.html');

    try {
      await addFirstProduct(page);
      await openCart(page);
      await expect(page.locator('.cart_item')).toHaveCount(1);
    } finally {
      await removeAllCartItems(page);
      await page.goto('/inventory.html');
      await resetAppState(page);
    }
  });
});
