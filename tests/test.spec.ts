import { test } from './fixtures';
import { generateRandomUser } from '../utils/generateUser';

test('Kaleidoscope Application E2E - With Fixtures', async ({
  landingPage,
  signupPage,
  personalInfoPage,
  activitiesPage,
  educationPage,
  essayPage,
  confirmationPage,
}) => {
  const user = generateRandomUser();

  await test.step('Step 1 - Navigate and Click Apply Now', async () => {
    await landingPage.goto();
    await landingPage.clickApplyNow();
  });

  await test.step('Step 2 - Complete Signup', async () => {
    await signupPage.fillEmail(user.email);
    await signupPage.clickNext();
    await signupPage.completeSignupForm(
      user.firstName,
      user.lastName,
      'StrongPassword123!',
      '+17021234567'
    );
  });

  await test.step('Step 3 - Fill Personal Information', async () => {
    await personalInfoPage.fillAddressForm();
    await personalInfoPage.clickNext();
  });

  await test.step('Step 4 - Add Extracurricular Activities', async () => {
    await activitiesPage.addActivities();
    await activitiesPage.saveAndProceed();
  });

  await test.step('Step 5 - Fill Education Info and Upload Transcript', async () => {
    await educationPage.fillEducationDetails();
    await educationPage.uploadTranscript();
    await educationPage.clickNext();
  });

  await test.step('Step 6 - Fill Essay Section', async () => {
    await essayPage.fillEssays();
    await essayPage.clickNext();
  });

  await test.step('Step 7 - Submit Application and Verify', async () => {
    await confirmationPage.submitApplication();
    await confirmationPage.verifySuccess();
  });
});
