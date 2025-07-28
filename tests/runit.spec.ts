import { test, expect } from "@playwright/test";
import { faker } from "@faker-js/faker";

test("Успешная регистрация", async ({ page }) => {
  const firstName = faker.person.firstName();
  const nameNumber = faker.number.int({ min: 10, max: 100 });
  const testData = {
    userName: `${firstName}${nameNumber}`,
    password: faker.internet.password({ length: 10 }),
    email: faker.internet.email(),
  };
  
  await page.goto("https://runit.hexlet.ru/signup");

  const userNameInput = page.getByRole('textbox', { name: 'Username' });
  const password = page.locator("#password");
  const email = page.locator("#email");
  const submitButton = page.getByRole("button", {
    name: "Sign up",
    exact: true,
  });

  await userNameInput.hover(); 
  await userNameInput.focus();
  await userNameInput.fill(testData.userName);
  
  // Заполняем поля регистрации
  await password.hover();
  await password.focus();
  await password.fill(testData.password);
  
  await email.hover();
  await email.focus();
  await email.fill(testData.email);
  
  // Ждем успешной регистрации И авторизации
  await submitButton.click();
  await page.waitForURL(/\/u\/.*/);


  await expect(page.getByRole("heading", { level: 1 })).toContainText(testData.userName);
});
