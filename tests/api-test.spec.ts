import { test, expect } from '@playwright/test';

test('api get test', async ({ request }) => {

    const response = await request.get('https://reqres.in/api/users?page=2')

    expect(response.status()).toBe(200)

    const text = await response.text();

    expect(text).toContain('tobias.funke@reqres.in')


});

test.only('api post test', async ({ request }) => {

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