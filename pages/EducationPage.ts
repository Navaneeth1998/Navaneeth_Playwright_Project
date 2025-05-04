// pages/EducationPage.ts
import { Page } from '@playwright/test';
import path from 'path';

export class EducationPage {
  constructor(private page: Page) { }

  async fillEducationDetails() {
    await this.page.getByPlaceholder('Please enter the name of your current High School').fill('Springfield High');
    await this.page.getByPlaceholder('Enter high school street address').fill('123 Main St');
    await this.page.getByPlaceholder('Enter additional high school address (e.g. PO Box)').fill('PO Box 789');
    await this.page.getByPlaceholder('Enter high school city').fill('Springfield');
    await this.fillDropdown('Enter high school state', 'California');
    await this.page.getByPlaceholder('e.g. 55413').fill('90210');
    await this.page.getByPlaceholder('Enter your current GPA').fill('3.9');
    await this.page.getByPlaceholder('Enter a date').fill('06/01/2025');
  }

  async fillDropdown(placeholder: string, value: string) {
    const input = this.page.getByPlaceholder(placeholder);
    await input.click();
    await input.fill(value);
    await input.press('ArrowDown');
    await input.press('Enter');
  }

  async uploadTranscript() {
    const fileChooserPromise = this.page.waitForEvent('filechooser');
    await this.page.getByRole('button', { name: 'Upload File' }).click();
    const fileChooser = await fileChooserPromise;
    await fileChooser.setFiles(path.resolve('My School Transcript.pdf'));

    // wait for the file upload to complete
    await this.page.waitForTimeout(8000); // optional delay
    // wait for below button to be visible  
    await this.page.waitForSelector('button:has-text("Next Page")', { state: 'visible' });
  }

  async clickNext() {
    await this.page.getByRole('button', { name: 'Next Page' }).click();
  }
}