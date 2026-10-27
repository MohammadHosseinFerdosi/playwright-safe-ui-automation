import { test, expect, requireDestructive } from './fixtures';
import { addFirstProduct, openCart, resetAppState } from './utils/cart';

test.describe('Checkout @destructive', () => {
  test.beforeEach(() => {
    requireDestructive();
  });

  test('completes checkout then resets app state @destructive', async ({ page }) => {
    await page.goto('/inventory.html');

    try {
      await addFirstProduct(page);
      await openCart(page);
      await page.locator('[data-test="checkout"]').click();
      await page.locator('[data-test="firstName"]').fill('Mohammad');
      await page.locator('[data-test="lastName"]').fill('Ferdosi');
      await page.locator('[data-test="postalCode"]').fill('12345');
      await page.locator('[data-test="continue"]').click();
      await page.locator('[data-test="finish"]').click();
      await expect(page.locator('[data-test="complete-header"]')).toHaveText(
        'Thank you for your order!',
      );
    } finally {
      await page.goto('/inventory.html');
      await resetAppState(page);
    }
  });
});
