import { Locator, Page } from '@playwright/test';

import { logger } from '../../utils/logger';

export class LoginPage {

    readonly page: Page;

    readonly usernameInput: Locator;

    readonly passwordInput: Locator;

    readonly loginButton: Locator;

    constructor(page: Page) {

        this.page = page;

        this.usernameInput =
            page.locator('#user-name');

        this.passwordInput =
            page.locator('#password');

        this.loginButton =
            page.locator('#login-button');
    }

    /**
     * Navigate to Login Page
     */

    async goto() {

        logger.info(
            'Navigating to Login Page'
        );

        await this.page.goto('https://www.saucedemo.com');
    }

    /**
     * Perform Login
     */

    async login(
        username: string,
        password: string
    ) {

        logger.info('Entering Username');

        await this.usernameInput.fill(
            username
        );

        logger.info('Entering Password');

        await this.passwordInput.fill(
            password
        );

        logger.info('Clicking Login Button');

        await this.loginButton.click();
    }
}