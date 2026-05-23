import { Locator, Page } from '@playwright/test';

export class InventoryPage {

    readonly page: Page;

    readonly productsTitle: Locator;

    readonly inventoryContainer: Locator;

    constructor(page: Page) {

        this.page = page;

        this.productsTitle =
            page.locator('.title');

        this.inventoryContainer =
            page.locator('.inventory_list');
    }
}