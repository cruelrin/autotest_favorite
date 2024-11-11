import { test, expect } from '@playwright/test';
import { HomePage } from '../pages/HomePage';
import { ProductPage } from '../pages/ProductPage';
import { FavoritesPage } from '../pages/FavoritesPage';

test.describe('Ozon Favorites Functionality', () => {
    test('Add item to favorites', async ({ page }) => {
        const homePage = new HomePage(page);
        const productPage = new ProductPage(page);
        const favoritesPage = new FavoritesPage(page);

        // Переход на главную страницу и поиск товара
        await homePage.navigate();
        await homePage.searchProduct('ноутбук');

        // Выбор первого товара из результатов поиска и добавление в избранное
        await page.waitForSelector('.a0c4 a[data-widget="productCard"]');
        await page.locator('.a0c4 a[data-widget="productCard"]').first().click();
        await productPage.addToFavorites();

        // Переход в избранное и проверка, что товар добавлен
        await favoritesPage.navigate();
        expect(await favoritesPage.isProductInFavorites()).toBe(true);

        // Дополнительная проверка имени товара
        const itemName = await favoritesPage.getFirstFavoriteItemName();
        console.log(`Добавленный товар в избранное: ${itemName}`);
    });

    test('Remove item from favorites', async ({ page }) => {
        const favoritesPage = new FavoritesPage(page);

        // Переход в избранное
        await favoritesPage.navigate();

        // Удаление товара из избранного и проверка, что его больше нет
        await favoritesPage.removeFirstFavoriteItem();
        expect(await favoritesPage.isProductInFavorites()).toBe(false);
    });
});
