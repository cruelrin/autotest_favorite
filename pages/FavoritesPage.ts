import { Page } from '@playwright/test';

export class FavoritesPage {
    readonly page: Page;

    constructor(page: Page) {
        this.page = page;
    }

    async navigate() {
        await this.page.goto('https://www.ozon.ru/my/favorites');
    }

    async isProductInFavorites(): Promise<boolean> {
        const favoriteItem = await this.page.locator('.a0c4 a[data-widget="productCard"]');
        return (await favoriteItem.count()) > 0;
    }

    async getFirstFavoriteItemName(): Promise<string> {
        return await this.page.locator('.a0c4 a[data-widget="productCard"]').first().innerText();
    }

    async removeFirstFavoriteItem() {
        await this.page.locator('button[aria-label="Удалить из избранного"]').first().click();
    }
}
