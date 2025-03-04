import { test, expect } from '@playwright/test';

test('User should be able to log in as Broker', async ({ page }) => {
    // Navigate to login page
    await page.goto('https://staging.truenorthfleet.com/trm');

    // Fill in login form
    await page.fill('#username', 'test+mavbroker@truenorthfleet.com');
    await page.fill('#password', 'FIinW285V2SVjq');

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


test('User should be able to log in as Carrier', async ({ page }) => {
    // Navigate to login page
    await page.goto('https://staging.truenorthfleet.com/trm');

    // Fill in login form
    await page.fill('#username', 'test+mavcarrier@truenorthfleet.com');
    await page.fill('#password', 'k46KjQLgMD8g20');

    // Click login button
    await page.click("button[value='default']");

    // Assert that login was successful
    await expect(page).toHaveURL('https://staging.truenorthfleet.com/trm/carrier/loadcentral');
    await expect(page.locator('.MuiTypography-root.MuiTypography-h3.css-1xlo71g')).toBeVisible();


    //Verify the Nav Menu for Carrier User Role
    // Locate the <ul> element 
    const ul = page.locator('.MuiList-root.MuiList-padding.css-1ontqvh');

    // Ensure the <ul> exists
    await expect(ul).toBeVisible();

    // Get all <li> elements inside the <ul>
    const listItems = ul.locator('li');

    // Verify the number of <li> elements (if expected count is known)
    await expect(listItems).toHaveCount(4); // Adjust the count as needed

    // Loop through each <li> and validate text content
    const expectedItems = ['LoadCentral', 'Post Truck','Profile', 'Notifications'];
    for (let i = 0; i < expectedItems.length; i++) {
        await expect(listItems.nth(i)).toHaveText(expectedItems[i]);
    }


    
});


test('User should be able to log in as Staff Member', async ({ page }) => {
    // Navigate to login page
    await page.goto('https://staging.truenorthfleet.com/trm');

    // Fill in login form
    await page.fill('#username', 'test+mavstaff@truenorthfleet.com');
    await page.fill('#password', 'tm3jF6w77cq2');

    // Click login button
    await page.click("button[value='default']");

    // Assert that login was successful
    await expect(page).toHaveURL('https://staging.truenorthfleet.com/trm/carrier/loadcentral');
    await expect(page.locator('.MuiTypography-root.MuiTypography-h3.css-1xlo71g')).toBeVisible();


    //Verify the Nav Menu for Broker User Role
    // Locate the <ul> element 
    const ul = page.locator('.MuiList-root.MuiList-padding.css-1ontqvh');

    // Ensure the <ul> exists
    await expect(ul).toBeVisible();

    // Get all <li> elements inside the <ul>
    const listItems = ul.locator('li');

    // Verify the number of <li> elements (if expected count is known)
    await expect(listItems).toHaveCount(9); 

    // Loop through each <li> and validate text content
    const expectedItems = ['Trucklist', 'Load Offers', 'Posted Loads', 'Booked Loads', 'Loadboard Control Center', 'LoadCentral', 'Post Truck', 'Profile', 'Notifications']; // Adjust as needed
    for (let i = 0; i < expectedItems.length; i++) {
        await expect(listItems.nth(i)).toHaveText(expectedItems[i]);
    }
});