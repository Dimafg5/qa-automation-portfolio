import { faker } from "@faker-js/faker";
import { test, expect } from "@playwright/test";

test("Успешная отправка формы", async ({ page }) => {
  const testData = {
    userName: faker.person.fullName(),
    email: faker.internet.email(),
    mobilePhone: faker.phone.number({ style: "international" }),
    subject: faker.lorem.sentence(20),
  };

  await page.goto("https://guru.qahacking.ru/");
  await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));

  const userName = page.locator("#mod-rscontact-full-name-91");
  const email = page.locator("#mod-rscontact-email-91");
  const mobilePhone = page.locator("#mod-rscontact-mobile-phone-91");
  const subject = page.locator("#mod-rscontact-subject-91");
  const submitButton = page.getByRole("button", {
    name: "M Send",
    exact: true,
  });

  await userName.fill(testData.userName);
  await email.fill(testData.email);
  await mobilePhone.fill(testData.mobilePhone);
  await subject.fill(testData.subject);
  await submitButton.click();
  await expect(page.locator("body")).toContainText(
    "No e-mail addresses (To) have been configured. Please set them up in the module's parameters, under the 'Email Options' tab."
  );
});
