import { test, expect } from '@playwright/test';
import dotenv from 'dotenv';

// Load environment variables
dotenv.config();

test('User should be able to log in as Broker', async ({ page }) => {
    // Navigate to login page
    const url = process.env.STAGING_URL as string;
    const broker_email = process.env.BROKER_EMAIL ?? '';
    const broker_password = process.env.BROKER_PASSWORD || '';

    await page.goto(url);

    // Fill in login form
    await page.fill('#username', broker_email);
    await page.fill('#password', broker_password);

    // Click login button
    await page.click("button[value='default']");

    // Assert that login was successful
    await expect(page).toHaveURL('https://staging.truenorthfleet.com/trm/broker/trucklist');
    await expect(page.locator('.MuiTypography-root.MuiTypography-h3.css-1xlo71g')).toBeVisible();


    //Verify the Nav Menu for Broker User Role
    // Locate the <ul> element 
    const ul = page.locator('.MuiList-root.MuiList-padding.css-1ontqvh');

    // Ensure the <ul> exists
    await expect(ul).toBeVisible();

    // Get all <li> elements inside the <ul>
    const listItems = ul.locator('li');

    // Verify the number of <li> elements (if expected count is known)
    await expect(listItems).toHaveCount(7); 

    // Loop through each <li> and validate text content
    const expectedItems = ['Trucklist', 'Load Offers', 'Posted Loads', 'Booked Loads', 'Loadboard Control Center', 'Profile', 'Notifications']; // Adjust as needed
    for (let i = 0; i < expectedItems.length; i++) {
        await expect(listItems.nth(i)).toHaveText(expectedItems[i]);
    }
});