import { test, expect } from '@playwright/test';

test.describe('Ozon Favorites Functionality', () => {
    test('Add item to favorites', async ({ page }) => {
        // Переход на главную страницу Ozon
        await page.goto('https://www.ozon.ru/');

        // Заполнение поля поиска
        await page.locator('input[placeholder="Искать на Ozon"]').fill('ноутбук');

        // Клик по кнопке поиска
        await page.locator('button[type="button"]:has-text("Найти")').click();

        // Ожидание результатов поиска
        await page.waitForSelector('.a0c4 a[data-widget="productCard"]', { timeout: 20000 });

        // Выбор первого товара в результатах поиска
        await page.locator('.a0c4 a[data-widget="productCard"]').first().click();

        // Добавление товара в избранное
        await page.waitForSelector('button[aria-label="Добавить в избранное"]');
        await page.locator('button[aria-label="Добавить в избранное"]').click();

        // Переход в раздел "Избранное"
        await page.goto('https://www.ozon.ru/my/favorites');

        // Проверка, что товар добавлен в избранное
        const favoriteItem = await page.locator('.a0c4 a[data-widget="productCard"]');
        expect(await favoriteItem.count()).toBeGreaterThan(0); // Проверяем, что хотя бы один товар есть в избранном

        // Дополнительная проверка (например, имя товара)
        const itemName = await favoriteItem.first().innerText();
        console.log(`Добавленный товар в избранном: ${itemName}`);
    });

    test('Remove item from favorites', async ({ page }) => {
        // Переход в раздел "Избранное"
        await page.goto('https://www.ozon.ru/my/favorites');

        // Удаление товара из избранного
        await page.locator('button[aria-label="Удалить из избранного"]').first().click();

        // Проверка, что товар удален
        const favoriteItem = await page.locator('.a0c4 a[data-widget="productCard"]');
        expect(await favoriteItem.count()).toBe(0); // Убедимся, что товаров в избранном больше нет
    });
});
