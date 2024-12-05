import { test, expect } from '@playwright/test';

test.describe('Ozon API Favorites Tests', () => {
    const baseUrl = 'https://www.ozon.ru/api/composer-api.bx';

    test('Add product to favorites via API', async ({ request }) => {
        const loginResponse = await request.post(`${baseUrl}/login`, {
            data: {
                username: 'user@example.com',
                password: 'secure_password',
            },
        });
        expect(loginResponse.ok()).toBeTruthy();

        const authToken = (await loginResponse.json()).token;

        const productId = '1697092279'; // Замените на ID тестового продукта
        const addToFavoritesResponse = await request.post(`${baseUrl}/favorites/add`, {
            headers: {
                Authorization: `Bearer ${authToken}`,
            },
            data: {
                productId,
            },
        });

        expect(addToFavoritesResponse.ok()).toBeTruthy();
        expect((await addToFavoritesResponse.json()).status).toBe('success');
    });

    test('Remove product from favorites via API', async ({ request }) => {
        const loginResponse = await request.post(`${baseUrl}/login`, {
            data: {
                username: 'user@example.com',
                password: 'secure_password',
            },
        });
        expect(loginResponse.ok()).toBeTruthy();

        const authToken = (await loginResponse.json()).token;

        const productId = '1697092279'; 
        const removeFromFavoritesResponse = await request.post(`${baseUrl}/favorites/remove`, {
            headers: {
                Authorization: `Bearer ${authToken}`,
            },
            data: {
                productId,
            },
        });

        expect(removeFromFavoritesResponse.ok()).toBeTruthy();
        expect((await removeFromFavoritesResponse.json()).status).toBe('success');
    });

    test('Get all favorite products via API', async ({ request }) => {
        const loginResponse = await request.post(`${baseUrl}/login`, {
            data: {
                username: 'user@example.com',
                password: 'secure_password',
            },
        });
        expect(loginResponse.ok()).toBeTruthy();

        const authToken = (await loginResponse.json()).token;

        const favoritesResponse = await request.get(`${baseUrl}/favorites`, {
            headers: {
                Authorization: `Bearer ${authToken}`,
            },
        });

        expect(favoritesResponse.ok()).toBeTruthy();
        const favorites = await favoritesResponse.json();
        expect(favorites.products).toBeDefined();
        console.log(`Избранные товары: ${JSON.stringify(favorites.products, null, 2)}`);
    });
});
