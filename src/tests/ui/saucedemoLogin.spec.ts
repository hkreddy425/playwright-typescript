import '../../hooks/testHooks';

import { test, expect }
    from '@playwright/test';

import { LoginPage }
    from '../../pages/login/loginPage';

import { InventoryPage }
    from '../../pages/add cart/inventoryPage';

import { UI_TEST_DATA }
    from '../../testdata/uiTestData';

import { logger }
    from '../../utils/logger';

test.describe('Sauce Demo Login', () => {

    test(
        'Login with valid credentials',

        async ({ page }) => {

            logger.info(
                'Login Test Started'
            );

            const loginPage =
                new LoginPage(page);

            const inventoryPage =
                new InventoryPage(page);

            await loginPage.goto();

            await loginPage.login(

                UI_TEST_DATA.USERNAME,

                UI_TEST_DATA.PASSWORD
            );

            await expect(page)
                .toHaveURL(/inventory\.html$/);

            await expect(
                inventoryPage.productsTitle
            ).toHaveText('Products');

            await expect(
                inventoryPage.inventoryContainer
            ).toBeVisible();

            logger.info(
                'Login Test Completed'
            );
        }
    );
});