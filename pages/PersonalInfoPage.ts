import { Page } from '@playwright/test';

export class PersonalInfoPage {
  constructor(private page: Page) { }

  async fillAddressForm() {
    await this.page.getByPlaceholder('Enter your street address').fill('123 Main St');
    await this.page.getByPlaceholder('Enter additional street address (e.g. Apt Number)').fill('Apt 45B');
    await this.fillDropdown('Enter your state', 'California');
    await this.page.getByPlaceholder('Enter your city').fill('San Francisco');
    await this.page.getByPlaceholder('Enter your zip code').fill('94105');
    await this.fillDropdown('Enter your country', 'United States');
  }

  async fillDropdown(placeholder: string, value: string) {
    const input = this.page.getByPlaceholder(placeholder);
    await input.click();
    await input.fill(value);
    await input.press('ArrowDown');
    await input.press('Enter');
  }

  async clickNext() {
    await this.page.getByRole('button', { name: 'Next Page' }).click();
  }
}