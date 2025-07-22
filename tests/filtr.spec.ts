import { test, expect } from "@playwright/test";
import { faker } from "@faker-js/faker";

test("Проверка работи фиььтра", async ({ page }) => {
  await page.goto("https://automationexercise.com/");
  await page.getByRole("button", { name: "Consent" }).click();
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
