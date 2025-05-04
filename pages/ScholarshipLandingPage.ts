import { Page, Locator } from '@playwright/test';

export class ScholarshipLandingPage {
  readonly page: Page;
  readonly applyNowButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.applyNowButton = page.locator('xpath=//*[@id="sign-in"]');
  }

  async goto() {
    await this.page.goto('https://apply.mykaleidoscope.com/program/sdet-test-scholarship');
  }

  async clickApplyNow() {
    await this.applyNowButton.waitFor({ state: 'visible' });
    await this.applyNowButton.click();
  }
}
