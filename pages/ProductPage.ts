import { Page } from '@playwright/test';

export class ProductPage {
    readonly page: Page;

    constructor(page: Page) {
        this.page = page;
    }

    async addToFavorites() {
        await this.page.waitForSelector('button[aria-label="Добавить в избранное"]');
        await this.page.locator('button[aria-label="Добавить в избранное"]').click();
    }
}

