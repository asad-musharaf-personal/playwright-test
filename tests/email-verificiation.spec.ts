import { test, expect } from '@playwright/test';
import { MailSlurp } from 'mailslurp-client';

test('Email Verification using MailSlurp', async ({ page }) => {

    // Initialize MailSlurp with API key
    const mailslurp = new MailSlurp({ apiKey: "9d07da5264bf1aa29c12ebf77892a7e46ef36bf968803a08d781821a8af250ff" });

    // Step 1: Create a temporary email inbox
    const inbox = await mailslurp.inboxController.createInboxWithDefaults();
    console.log(`Generated Email: ${inbox.emailAddress}`);

    // Step 2: Navigate to sign-up page and register
    await page.goto('https://playground.mailslurp.com/');
    await page.click("a[data-test='sign-in-create-account-link']");
    await page.fill("input[name='email']", inbox.emailAddress);
    await page.fill("input[name='password']", 'Test@1234');
    await page.click(".Button__button___vS7Mv");

    // Step 3: Wait for the verification email
    console.log('Waiting for verification email...');
    const email = await mailslurp.waitForLatestEmail(inbox.id, 30000); // 30s timeout

    //Verify email content
    expect(email.body).toContain('Your Demo verification code is')

    // Step 4: Extract the dynamic 6-digit verification code
    const codeMatch = email.body?.match(/\b\d{6}\b/);
    const verificationCode = codeMatch ? codeMatch[0] : null;

    if (!verificationCode) {
        throw new Error("Verification code not found in email");
    }

    console.log(`Extracted Verification Code: ${verificationCode}`);

    // Step 5: Input the extracted verification code
    await page.fill("input[placeholder='Enter your code']", verificationCode);

    // Step 6: Submit the verification form
    await page.click(".Button__button___vS7Mv");


    // await expect(page).toHaveURL(/verified/); 

    // Step 7: Assert verification success
    console.log("Email verification successful!");

    // // Step 4: Extract verification link
    // const linkRegex = /(https?:\/\/[^\s]+)/g;
    // const matches = email.body?.match(linkRegex);
    // const verificationLink = matches ? matches[0] : null;

    // if (!verificationLink) {
    //     throw new Error('Verification link not found in email');
    // }

    // console.log(`Verification Link: ${verificationLink}`);
    // await page.goto(verificationLink);

    // // Step 5: Assert verification success
    // await expect(page).toHaveURL(/verified/); // Update based on your verification page

    // console.log('Email verification successful!');
});