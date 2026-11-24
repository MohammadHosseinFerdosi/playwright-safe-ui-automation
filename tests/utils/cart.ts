import { Page, expect } from '@playwright/test';

export async function addFirstProduct(page: Page) {
  const addButton = page.locator('[data-test^="add-to-cart-"]').first();
  await addButton.click();
  await expect(page.locator('.shopping_cart_badge')).toHaveText('1');
}

export async function openCart(page: Page) {
  await page.locator('.shopping_cart_link').click();
  await expect(page).toHaveURL(/cart\.html/);
}

export async function removeAllCartItems(page: Page) {
  const removes = page.locator('[data-test^="remove-"]');
  const count = await removes.count();
  for (let i = 0; i < count; i++) {
    await removes.first().click();
  }
}

export async function resetAppState(page: Page) {
  await page.locator('#react-burger-menu-btn').click();
  await page.locator('[data-test="reset-sidebar-link"]').click();
  await page.locator('#react-burger-cross-btn').click();
}
