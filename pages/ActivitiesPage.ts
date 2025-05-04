import { Page } from '@playwright/test';

export class ActivitiesPage {
  constructor(private page: Page) {}

  activities = [
    {
      name: 'Debate Club',
      years: '2',
      leadership: 'President',
      description: 'Organized debates.'
    },
    {
      name: 'Coding Club',
      years: '2',
      leadership: 'Lead',
      description: 'Built web apps.'
    }
  ];

  async addActivities() {
    for (const activity of this.activities) {
      await this.page.click('text=Add Entry');
      await this.page.getByLabel('Extracurricular Activity Name').fill(activity.name);
      await this.page.getByLabel('Total Number of Years Involved').fill(activity.years);
      await this.page.getByLabel(/leadership roles/i).fill(activity.leadership);
      await this.page.getByLabel('Description of Involvement').fill(activity.description);
      await this.page.getByRole('button', { name: 'Add', exact: true }).click();
    }
  }

  async saveAndProceed() {
    await this.page.click('text=Save');
    await this.page.click('text=Next');
    await this.page.click('text=Next');
  }
}