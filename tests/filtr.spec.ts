import { test, expect } from "@playwright/test";
import { faker } from "@faker-js/faker";

test("Проверка работоспособности фильтра", async ({ page }) => {
  page.on('console', msg => {
    if (msg.type() === 'warning' && msg.text().includes('Mixed Content')) {
      return; // Игнорируем
    }
  });
  await page.goto("https://automationexercise.com/");
  const consentButton = page.getByRole("button", { name: "Consent" });
if (await consentButton.isVisible({ timeout: 5000 }).catch(() => false)) {
  await consentButton.click();
}
  //await page.getByRole("button", { name: "Consent" }).click();
  await page.getByRole("link", { name: "Products" }).click();
  await page.getByRole("link", { name: " Men" }).click();
  await page.getByRole("link", { name: "TSHIRTS" }).click();
  await page
    .locator(
      "div:nth-child(7) > .product-image-wrapper > .choose > .nav > li > a"
    )
    .click();
  await page.getByRole("button", { name: " Add to cart" }).click();

  await expect(page.getByRole("heading", { name: "Added!" })).toBeVisible();
  await page.getByRole("link", { name: "View Cart" }).click();
  await page.getByText("Proceed To Checkout").click();
  await expect(page.getByRole("heading", { name: "Checkout" })).toBeVisible();
  await page.getByRole("link", { name: "Register / Login" }).click();
  await expect(page).toHaveURL(/login/);
});
