// This is a Playwright test script that automates the application process for a scholarship program.
// It uses the Page Object Model (POM) design pattern to organize the code and make it more maintainable.
// The script includes various page classes that encapsulate the functionality of each page in the application process.
// The test script uses the Playwright testing framework to perform end-to-end testing of the application process.
// The test script is structured to first navigate to the scholarship landing page, then fill out the signup form,
// personal information, activities, education details, essays, and finally submit the application.

// It uses the Playwright testing framework to perform end-to-end testing of the application process.
// The test script is structured to first navigate to the scholarship landing page, then fill out the signup form,
// personal information, activities, education details, essays, and finally submit the application.


import { test, expect } from '@playwright/test';
import { generateRandomUser } from '../utils/generateUser';

import { ScholarshipLandingPage } from '../pages/ScholarshipLandingPage';
import { SignupPage } from '../pages/SignupPage';
import { PersonalInfoPage } from '../pages/PersonalInfoPage';
import { ActivitiesPage } from '../pages/ActivitiesPage';
import { EducationPage } from '../pages/EducationPage';
import { EssayPage } from '../pages/EssayPage';
import { ConfirmationPage } from '../pages/ConfirmationPage';


test('Kaleidoscope Application E2E - Page Object Model', async ({ page }) => {
  const user = generateRandomUser();

  const landingPage = new ScholarshipLandingPage(page);
  const signupPage = new SignupPage(page);
  const personalInfoPage = new PersonalInfoPage(page);
  const activitiesPage = new ActivitiesPage(page);
  const educationPage = new EducationPage(page);
  const essayPage = new EssayPage(page);
  const confirmationPage = new ConfirmationPage(page);

  await landingPage.goto();
  await landingPage.clickApplyNow();

  await signupPage.fillEmail(user.email);
  await signupPage.clickNext();
  await signupPage.completeSignupForm(user.firstName, user.lastName, 'StrongPassword123!', '+17021234567');

  await personalInfoPage.fillAddressForm();
  await personalInfoPage.clickNext();

  await activitiesPage.addActivities();
  await activitiesPage.saveAndProceed();

  await educationPage.fillEducationDetails();
  await educationPage.uploadTranscript();
  await educationPage.clickNext();

  await essayPage.fillEssays();
  await essayPage.clickNext();

  await confirmationPage.submitApplication();
  await confirmationPage.verifySuccess();
});
