import { Page } from '@playwright/test';

export class SignupPage {
  constructor(private page: Page) { }

  async fillEmail(email: string) {
    await this.page.locator('input[placeholder="Email Address"]').fill(email);
  }

  async clickNext() {
    await this.page.locator('#login-page__cta').click();
  }

  async completeSignupForm(firstName: string, lastName: string, password: string, phone: string) {
    await this.page.getByLabel('First Name').fill(firstName);
    await this.page.getByLabel('Last Name').fill(lastName);
    await this.page.locator('input[type="tel"]').fill(phone);
    await this.page.getByLabel('Create a Password').fill(password);
    await this.page.getByLabel('I confirm that I am at least 13 years old').check();
    await this.page.locator('#onboarding-screen__form-submit').click();
    await this.page.waitForNavigation();
  }
}
