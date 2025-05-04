// pages/EssayPage.ts
import { Page } from '@playwright/test';

export class EssayPage {
  constructor(private page: Page) { }

  async fillEssays() {
    await this.page.getByRole('checkbox', { name: 'Cars' }).check();
    await this.page.getByRole('checkbox', { name: 'Animals' }).check();
    await this.page.getByRole('checkbox', { name: 'School' }).check();
    await this.page.getByRole('checkbox', { name: 'Other' }).check();

    await this.page.getByLabel('Essay about Cars').fill('Electric cars are the future.');
    await this.page.getByLabel('Essay about Animals').fill('Animals help maintain ecological balance.');
    await this.page.getByLabel('Essay about School').fill('School shapes our future.');
    await this.page.getByLabel('Provide an essay about any topic').fill('Space inspires innovation.');
  }

  async clickNext() {
    await this.page.getByRole('button', { name: 'Next Page' }).click();
  }
}
