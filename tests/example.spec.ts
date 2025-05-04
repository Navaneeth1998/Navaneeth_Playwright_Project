import { test, expect } from '@playwright/test';
import { generateRandomUser } from '../utils/generateUser';
import path from 'path';

test('Kaleidoscope Application End-to-End', async ({ page }) => {
    const user = generateRandomUser();

    
    await page.goto('https://apply.mykaleidoscope.com/program/sdet-test-scholarship');

    const applyNowButton = page.locator('xpath=//*[@id="sign-in"]');
    await applyNowButton.waitFor({ state: 'visible' });

    await applyNowButton.click();

    await expect(page).toHaveURL(/.*login|signup|application/i);

    const emailField = page.locator('input[placeholder="Email Address"]');
    await emailField.waitFor({ state: 'visible' });
    await emailField.fill(user.email);

    await expect(emailField).toHaveValue(`${user.email}`);

    const nextButton = page.locator('#login-page__cta');
    await nextButton.waitFor({ state: 'visible' });
    await nextButton.click();
    await page.getByLabel('First Name').fill(user.firstName);
    await page.getByLabel('Last Name').fill(user.lastName);
    await page.locator('input[type="tel"]').fill('+17021234567');

    await page.getByLabel('Create a Password').fill('StrongPassword123!');

    await page.getByLabel('I confirm that I am at least 13 years old').check();

    await page.locator('#onboarding-screen__form-submit').click();

    await page.waitForNavigation();
    await expect(page).toHaveURL(/\/program\/.*\/application\/start/);

    await page.getByPlaceholder('Enter your street address').fill('123 Main St');

    await page.getByPlaceholder('Enter additional street address (e.g. Apt Number)').fill('Apt 45B');

    const stateInput = page.getByPlaceholder('Enter your state');

    await stateInput.click();
    await page.waitForTimeout(2000) 
    await stateInput.fill('California');
    await page.waitForTimeout(2000)
    await stateInput.press('ArrowDown');
    await stateInput.press('Enter');

    await page.getByPlaceholder('Enter your city').fill('San Francisco');

    await page.getByPlaceholder('Enter your zip code').fill('94105');

    const countryInput = page.getByPlaceholder('Enter your country');
    await countryInput.click();
    await page.waitForTimeout(2000)
    await countryInput.fill('United States');
    await page.waitForTimeout(2000)
    await countryInput.press('ArrowDown');
    await countryInput.press('Enter');

    await page.getByRole('button', { name: 'Next Page' }).click();


    const activities = [
        {
            name: 'Debate Club',
            years: '2',
            leadership: 'President, Best Speaker Award',
            description: 'Led team debates, organized events, trained juniors.',
        },
        {
            name: 'Science Fair',
            years: '1',
            leadership: 'Participant',
            description: 'Presented a solar-powered water purifier.',
        },
        {
            name: 'Drama Club',
            years: '3',
            leadership: 'Lead Actor',
            description: 'Performed in annual school plays and managed props.',
        },
        {
            name: 'Coding Club',
            years: '2',
            leadership: 'Team Lead',
            description: 'Mentored students and developed web apps.',
        },
    ];

    for (const activity of activities) {
        
        await page.click('text=Add Entry');

        await page.waitForSelector('.mantine-Modal-body');

        await page.getByLabel('Extracurricular Activity Name').fill(activity.name);

        await page.getByLabel('Total Number of Years Involved').fill(activity.years);

        await page.getByLabel(/List any leadership roles/i).fill(activity.leadership);

        await page.getByLabel('Description of Involvement').fill(activity.description);

        await page.waitForTimeout(1000);
        await page.getByRole('button', { name: 'Add', exact: true }).click();

        await expect(page.locator('.mantine-Modal-body')).toBeHidden();
    }

    await page.click('text=Save');
    await page.click('text=Next');
    await page.click('text=Next');

    await page.getByPlaceholder('Please enter the name of your current High School').fill('Springfield High School');

    await page.getByPlaceholder('Enter high school street address').fill('123 Main Street');

    await page.getByPlaceholder('Enter additional high school address (e.g. PO Box)').fill('PO Box 789');

    await page.getByPlaceholder('Enter high school city').fill('Springfield');

    const highstateInput = page.getByPlaceholder('Enter high school state');
    await highstateInput.click();
    await highstateInput.fill('California');
    await page.waitForTimeout(1000); 
    await highstateInput.press('ArrowDown');
    await page.waitForTimeout(1000); 
    await highstateInput.press('Enter');
    await page.getByPlaceholder('e.g. 55413').fill('90210');

    await page.getByPlaceholder('Enter your current GPA').fill('3.9');

    await page.getByPlaceholder('Enter a date').fill('06/01/2025');

    await page.waitForTimeout(3000); 

    const fileChooserPromise = page.waitForEvent('filechooser');
    await page.getByRole('button', { name: 'Upload File' }).click();
    const fileChooser = await fileChooserPromise;
    await fileChooser.setFiles('/Users/prabhuloganathan/Desktop/Navneeth-Playwright/My School Transcript.pdf');

    await expect(page.locator('text=This field is required')).toHaveCount(0);

    await page.waitForTimeout(8000);

    await page.getByRole('button', { name: 'Next Page' }).click();


    await page.getByRole('checkbox', { name: 'Cars' }).check();
    await page.getByRole('checkbox', { name: 'Animals' }).check();
    await page.getByRole('checkbox', { name: 'School' }).check();
    await page.getByRole('checkbox', { name: 'Other' }).check();

    await page.getByLabel('Essay about Cars').fill('My essay on cars: I love electric vehicles and their impact on the environment.');
    await page.getByLabel('Essay about Animals').fill('My essay on animals: Animals play a vital role in our ecosystem.');
    await page.getByLabel('Essay about School').fill('My essay on school: School is where I developed discipline and curiosity.');
    await page.getByLabel('Provide an essay about any topic').fill('My essay on space exploration: It drives human innovation.');

    await page.getByRole('button', { name: 'Next Page' }).click();


    await page.getByRole('button', { name: 'Submit' }).click();

    const welcomeHeading = page.getByRole('heading', { level: 1 });
    await welcomeHeading.waitFor({ state: 'visible' });
    await expect(welcomeHeading).toHaveText('Welcome back, SDET!');


    await page.pause();

});


