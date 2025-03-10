import { test, expect } from '@playwright/test';
import dotenv from 'dotenv';

// Load environment variables
dotenv.config();


// Test Suite
test.describe('User Login Tests', () => {
  const users = [
    {
      role: 'Broker',
      username: process.env.BROKER_EMAIL!,
      password: process.env.BROKER_PASSWORD!,
      expectedURL: 'https://staging.truenorthfleet.com/trm/broker/trucklist',
      navMenu: ['Trucklist', 'Load Offers', 'Posted Loads', 'Booked Loads', 'Loadboard Control Center', 'Profile', 'Notifications']
    },
    {
      role: 'Carrier',
      username: process.env.CARRIER_EMAIL!,
      password: process.env.CARRIER_PASSWORD!,
      expectedURL: 'https://staging.truenorthfleet.com/trm/carrier/loadcentral',
      navMenu: ['LoadCentral', 'Post Truck', 'Profile', 'Notifications']
    },
    {
      role: 'Staff Member',
      username: process.env.STAFF_EMAIL!,
      password: process.env.STAFF_PASSWORD!,
      expectedURL: 'https://staging.truenorthfleet.com/trm/carrier/loadcentral',
      navMenu: ['Trucklist', 'Load Offers', 'Posted Loads', 'Booked Loads', 'Loadboard Control Center', 'LoadCentral', 'Post Truck', 'Profile', 'Notifications']
    }
  ];

  // Parameterized test
  for (const user of users) {
    test(`User should be able to log in as ${user.role}`, async ({ page }) => {
      await login(page, user.username, user.password, user.expectedURL);
      await verifyNavMenu(page, user.navMenu);
    });
  }
});



// Reusable function for login
async function login(page, username: string, password: string, expectedURL: string) {
  await page.goto('https://staging.truenorthfleet.com/trm');
  await page.fill('#username', username);
  await page.fill('#password', password);
  await page.click("button[value='default']");
  await expect(page).toHaveURL(expectedURL);
  await expect(page.locator('.MuiTypography-root.MuiTypography-h3.css-1xlo71g')).toBeVisible();
}

// Reusable function to verify navigation menu
async function verifyNavMenu(page, expectedItems: string[]) {
  const ul = page.locator('.MuiList-root.MuiList-padding.css-1ontqvh');
  await expect(ul).toBeVisible();

  const listItems = ul.locator('li');
  await expect(listItems).toHaveCount(expectedItems.length);

  for (let i = 0; i < expectedItems.length; i++) {
    await expect(listItems.nth(i)).toHaveText(expectedItems[i]);
  }
}



