import { Page, expect } from '@playwright/test';

export class ConfirmationPage {
  constructor(private page: Page) {}

  async submitApplication() {
    await this.page.getByRole('button', { name: 'Submit' }).click();
  }

  async verifySuccess() {
    const welcomeHeading = this.page.getByRole('heading', { level: 1 });
    await welcomeHeading.waitFor({ state: 'visible' });
    await expect(welcomeHeading).toHaveText('Welcome back, SDET!');
  }
}
