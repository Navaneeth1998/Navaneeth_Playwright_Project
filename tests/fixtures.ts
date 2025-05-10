import { test as baseTest } from '@playwright/test';

import { ScholarshipLandingPage } from '../pages/ScholarshipLandingPage';
import { SignupPage } from '../pages/SignupPage';
import { PersonalInfoPage } from '../pages/PersonalInfoPage';
import { ActivitiesPage } from '../pages/ActivitiesPage';
import { EducationPage } from '../pages/EducationPage';
import { EssayPage } from '../pages/EssayPage';
import { ConfirmationPage } from '../pages/ConfirmationPage';

type PageFixtures = {
  landingPage: ScholarshipLandingPage;
  signupPage: SignupPage;
  personalInfoPage: PersonalInfoPage;
  activitiesPage: ActivitiesPage;
  educationPage: EducationPage;
  essayPage: EssayPage;
  confirmationPage: ConfirmationPage;
};

export const test = baseTest.extend<PageFixtures>({
  landingPage: async ({ page }, use) => {
    await use(new ScholarshipLandingPage(page));
  },
  signupPage: async ({ page }, use) => {
    await use(new SignupPage(page));
  },
  personalInfoPage: async ({ page }, use) => {
    await use(new PersonalInfoPage(page));
  },
  activitiesPage: async ({ page }, use) => {
    await use(new ActivitiesPage(page));
  },
  educationPage: async ({ page }, use) => {
    await use(new EducationPage(page));
  },
  essayPage: async ({ page }, use) => {
    await use(new EssayPage(page));
  },
  confirmationPage: async ({ page }, use) => {
    await use(new ConfirmationPage(page));
  },
});
