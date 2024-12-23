import { test, expect } from '@playwright/test';

test.describe('Ozon API Favorites Tests', () => {
    const baseUrl = 'https://www.ozon.ru/api/composer-api.bx';

    test('Add product to favorites via API', async ({ request }) => {
        // Логин через правильный эндпоинт
        const loginResponse = await request.post(
            `${baseUrl}/widget/json/v2?widgetStateId=loginOrRegistration-340567-default-1`,
            {
                data: {
                    username: 'sheveleva_k@iuca.kg', 
                    password: 'djoy1364',  
                },
                headers: {
                    'Content-Type': 'application/json',
                    'x-requested-with': 'XMLHttpRequest', 
                },
            }
        );

        // Проверка успешного логина
        expect(loginResponse.ok()).toBeTruthy();

        // Получаем токен из ответа
        const authToken = (await loginResponse.json()).token;

       
        const productId = '1763436170'; 

        // Запрос на добавление товара в избранное
        const addToFavoritesResponse = await request.post(`${baseUrl}/favorites/add`, {
            headers: {
                Authorization: `Bearer ${authToken}`,
            },
            data: {
                productId,
            },
        });

        // Проверка успешности добавления товара
        expect(addToFavoritesResponse.ok()).toBeTruthy();
        expect((await addToFavoritesResponse.json()).status).toBe('success');
    });

    test('Remove product from favorites via API', async ({ request }) => {
        const loginResponse = await request.post(
            `${baseUrl}/widget/json/v2?widgetStateId=loginOrRegistration-340567-default-1`,
            {
                data: {
                    username: 'sheveleva_k@iuca.kg', // замените на реальные данные
                    password: 'djoy1364',  // замените на реальные данные
                },
                headers: {
                    'Content-Type': 'application/json',
                    'x-requested-with': 'XMLHttpRequest',
                },
            }
        );
        expect(loginResponse.ok()).toBeTruthy();

        const authToken = (await loginResponse.json()).token;

        const productId = '1763436170'; // замените на ID тестового товара
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
        const loginResponse = await request.post(
            `${baseUrl}/widget/json/v2?widgetStateId=loginOrRegistration-340567-default-1`,
            {
                data: {
                    username: 'sheveleva_k@iuca.kg', // замените на реальные данные
                    password: 'djoy1364',  // замените на реальные данные
                },
                headers: {
                    'Content-Type': 'application/json',
                    'x-requested-with': 'XMLHttpRequest',
                },
            }
        );
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
