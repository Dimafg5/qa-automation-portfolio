import { test, expect } from "@playwright/test";
import { faker } from "@faker-js/faker";

test("Успешная регистрация", async ({ page }) => {
  const testData = {
    userName: "TestUser" + faker.number.int({ min: 10, max: 100 }),
    password: "Pass1221",
    email: faker.internet.email(),
  };
  await page.goto("https://runit.hexlet.ru/signup");

  const userName = page.locator("#username");
  const password = page.locator("#password");
  const email = page.locator("#email");
  const submitButton = page.getByRole("button", {
    name: "Sign up",
    exact: true,
  });

  await userName.fill(testData.userName);
  await password.fill(testData.password);
  await email.fill(testData.email);
  await submitButton.click();
  await expect(page.locator("body")).toContainText(testData.userName);
});
