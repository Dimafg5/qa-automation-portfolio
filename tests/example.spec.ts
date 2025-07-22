import { test, expect } from "@playwright/test";

test("Проверка кнопки,подача заявки", async ({ page }) => {
  await page.goto("https://yandex.ru/yaintern/schools/qa");
  const link = page
    .locator("#hero-button")
    .getByRole("link", { name: "Подать заявку" });
  // Ищем кнопку "Подать заявку" и кликаем по ней
  await expect(link).toBeVisible();
});

test("get started link", async ({ page }) => {
  await page.goto("https://playwright.dev/");

  // Click the get started link.
  await page.getByRole("link", { name: "Get started" }).click();

  // Expects page to have a heading with the name of Installation.
  await expect(
    page.getByRole("heading", { name: "Installation" })
  ).toBeVisible();
});
