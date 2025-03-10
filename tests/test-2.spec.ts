import { test, expect } from '@playwright/test';
import dotenv from 'dotenv';

// Load environment variables
dotenv.config();

//Nav Menu Selectors
const navigation = {
    truckList: "//span[normalize-space()='Trucklist']",
    loadOffers: "//span[normalize-space()='Load Offers']",
    postedLoads: "//span[normalize-space()='Posted Loads']",
    bookedLoads: "//span[normalize-space()='Booked Loads']",
    loadBoardControlCenter: "//span[normalize-space()='Loadboard Control Center']",
    loadCentral: "//span[normalize-space()='LoadCentral']",
    postTruck: "//span[normalize-space()='Post Truck']",
    profile: "//span[normalize-space()='Profile']",
    expandMenu: "img[alt='drawer expand']",
}

//Page H3 Title Selectors
const pageTitles = {
    truckList: "//h3[normalize-space()='TruckList']",
    loadOffers: "//h3[normalize-space()='Load Offers']",
    postedLoads: "//h3[normalize-space()='Posted Loads']",
    bookedLoads: "//h3[normalize-space()='Booked Loads']",
    loadBoardControlCenter: "//h3[normalize-space()='Loadboard Control Center']",
    loadCentral: "//h3[normalize-space()='LoadCentral']",
    postTruck: "//span[normalize-space()='Post New Truck']",
    profile: "//h3[normalize-space()='Profile']",
}

test('User should be able to log in as Broker and navigate the menu', async ({ page }) => {
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

    // Verify the Nav Menu for Broker User Role
    const ul = page.locator('.MuiList-root.MuiList-padding.css-1ontqvh');
    await expect(ul).toBeVisible();

    const listItems = ul.locator('li');
    await expect(listItems).toHaveCount(7);

    const expectedItems = [
        { name: 'Trucklist', url: '/trm/broker/trucklist' },
        { name: 'Load Offers', url: '/trm/broker/load-offers' },
        { name: 'Posted Loads', url: '/trm/broker/posted-loads' },
        { name: 'Booked Loads', url: '/trm/broker/load-offers/booked' },
        { name: 'Loadboard Control Center', url: '/trm/broker/loadboard-control-center' },
        { name: 'Profile', url: '/trm/account/profile' },
        { name: 'Notifications', url: '' }
    ];

    for (let i = 0; i < expectedItems.length; i++) {
        const item = listItems.nth(i);
        await expect(item).toHaveText(expectedItems[i].name);

    }

    //Navigate to each page from the menu and Validate the H3 page title
    await page.locator(navigation.expandMenu).click();

    expect(page.locator(pageTitles.truckList)).toContainText("TruckList")

    await page.locator(navigation.loadOffers).click();
    expect(page.locator(pageTitles.loadOffers)).toContainText("Load Offers")

    await page.locator(navigation.expandMenu).click();

    await page.locator(navigation.postedLoads).click();
    expect(page.locator(pageTitles.postedLoads)).toContainText("Posted Loads")

    await page.locator(navigation.bookedLoads).click();
    expect(page.locator(pageTitles.bookedLoads)).toContainText("Booked Loads")

    await page.locator(navigation.loadBoardControlCenter).click();
    expect(page.locator(pageTitles.loadBoardControlCenter)).toContainText("Loadboard Control Center")

    await page.locator(navigation.profile).click();
    expect(page.locator(pageTitles.profile)).toContainText("Profile")


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
    const expectedItems = ['LoadCentral', 'Post Truck', 'Profile', 'Notifications'];
    for (let i = 0; i < expectedItems.length; i++) {
        await expect(listItems.nth(i)).toHaveText(expectedItems[i]);
    }

    //Navigate to each page from the menu and Validate the H3 page title
    await page.locator(navigation.expandMenu).click();

    expect(page.locator(pageTitles.loadCentral)).toContainText("LoadCentral")

    await page.locator(navigation.postTruck).click();
    expect(page.locator(pageTitles.postTruck)).toContainText("Post New Truck")

    await page.locator(navigation.profile).click();
    expect(page.locator(pageTitles.profile)).toContainText("Profile")



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

    //Navigate to each page from the menu and Validate the H3 page title
    await page.locator(navigation.expandMenu).click();

    await page.locator(navigation.loadOffers).click();
    expect(page.locator(pageTitles.loadOffers)).toContainText("Load Offers")

    await page.locator(navigation.expandMenu).click();

    await page.locator(navigation.postedLoads).click();
    expect(page.locator(pageTitles.postedLoads)).toContainText("Posted Loads")

    await page.locator(navigation.bookedLoads).click();
    expect(page.locator(pageTitles.bookedLoads)).toContainText("Booked Loads")

    await page.locator(navigation.loadBoardControlCenter).click();
    expect(page.locator(pageTitles.loadBoardControlCenter)).toContainText("Loadboard Control Center")

    await page.locator(navigation.loadCentral).click();
    expect(page.locator(pageTitles.loadCentral)).toContainText("LoadCentral")

    await page.locator(navigation.expandMenu).click();

    await page.locator(navigation.postTruck).click();
    expect(page.locator(pageTitles.postTruck)).toContainText("Post New Truck")

    await page.locator(navigation.profile).click();
    expect(page.locator(pageTitles.profile)).toContainText("Profile")

});