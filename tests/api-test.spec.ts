import { test, expect } from '@playwright/test';

test('api get test', async ({ request }) => {

    // const response = await request.get('https://reqres.in/api/users?page=2')
    const response = await request.get('https://staging.truenorthfleet.com/api/driver-availability')

    expect(response.status()).toBe(200)

    const text = await response.text();

    expect(text).toContain('tobias.funke@reqres.in')


});

test('api post test', async ({ request }) => {

    const response = await request.post('https://reqres.in/api/register', {

        data: {
            "email": "eve.holt@reqres.in",
            "password": "pistol"
        }
    }
    )

    expect(response.status()).toBe(200)


    const responseBody = await response.json();

    expect(responseBody).toHaveProperty('id', 4);
    expect(responseBody).toHaveProperty('token', 'QpwL5tke4Pnpja7X4');

});

test("API Authentication using OAuth Token", async ({ request }) => {
    const authToken = "eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6Il96R1R1cW54OTBIQ1AzTWVPaC1ZSyJ9.eyJodHRwczovL3N0YWdpbmcudHJ1ZW5vcnRoZmxlZXQuY29tL2VtYWlsIjoidGVzdCttYXZjYXJyaWVyQHRydWVub3J0aGZsZWV0LmNvbSIsInVzZXJfaWQiOjMxNDgzLCJjYXJyaWVyX2lkIjoiNDM2Y2RjZTgtZmZlYS00OWVkLWJjMmQtNjg3MjAxNmUxOTAxIiwiYnJva2VyX2lkIjpudWxsLCJhcHBfcm9sZXMiOlsiQ2FycmllciJdLCJfaXNfc29jaWFsIjpmYWxzZSwiaHR0cHM6Ly9zdGFnaW5nLnRydWVub3J0aGZsZWV0LmNvbS9hcHBfbWV0YWRhdGEiOnt9LCJpc3MiOiJodHRwczovL2xvZ2luLXN0YWdpbmcudHJ1ZW5vcnRoZmxlZXQuY29tLyIsInN1YiI6ImF1dGgwfDY3YzI0YTVkMGY3YmM1NDg0OTkyYWY1YSIsImF1ZCI6WyJodHRwczovL3N0YWdpbmcudHJ1ZW5vcnRoZmxlZXQuY29tLyIsImh0dHBzOi8vZGV2LXdxMDBteDExLnVzLmF1dGgwLmNvbS91c2VyaW5mbyJdLCJpYXQiOjE3NDExODk0MzksImV4cCI6MTc0MTE5NjYzOSwic2NvcGUiOiJvcGVuaWQgcHJvZmlsZSBlbWFpbCIsImF6cCI6ImpDUnJWUDBUeGg0VUdxQUdyV09rNUs3NFBuTllFTzFUIiwicGVybWlzc2lvbnMiOlsicmVhZDpsb2FkcyIsInVzZTpjYXJyaWVyX2FwcCJdfQ.fRQa3oHkAjgj1Vsmty40WoKyHx7SFn3d6hgwcM0qfy1pA7uQCVNPNJnsS_l6n5FdmMYtM4-qQOT0FoKlwacqlhZZ1I960UkdxgOWaODm2wVGiE5eK1w5HStsuJrSiIWDURRUDOrl8joh4eeZJpaCXOPIyU7mZJcmkMGUF-4XpadGTwm5DjXbELy64XLNRbzXnTVJFumvcf4gyLdgi5kEn1jdFesdDYN2ASeiuRBFzlzXDqGJLlalG9SYNnFnltAaI27lBKCRqmzjyQ51kPww8W5zv5E3WQNTePU2rDINe_hQH-FcRPbkZCnxTnUSmXhbNNEW0geJ4QaJ558trJRrDw"; // Use your token

    // Example API request with token
    const response = await request.get("https://staging.truenorthfleet.com/trm", {
        headers: {
            Authorization: `Bearer ${authToken}`
        }
    });

    expect(response.ok()).toBeTruthy();
    console.log(await response.json()); // Print API response
});