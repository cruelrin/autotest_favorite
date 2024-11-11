// pages/HomePage.ts
import { Page } from '@playwright/test';

export class HomePage {
    readonly page: Page;

    constructor(page: Page) {
        this.page = page;
    }

    async navigate() {
        await this.page.goto('https://www.ozon.ru/');
    }

    async searchProduct(productName: string) {
        await this.page.locator('input[placeholder="Искать на Ozon"]').fill(productName);
        await this.page.locator('button[type="button"]:has-text("Найти")').click();
    }
}
