import { test } from '@playwright/test';

import * as allure from 'allure-js-commons';

test.afterEach(async ({ page }, testInfo) => {

    /**
     * Attach screenshot on failure
     */

    if (testInfo.status !== testInfo.expectedStatus) {

        const screenshot = await page.screenshot();

        await allure.attachment(
            'Failure Screenshot',
            screenshot,
            'image/png'
        );
    }

    /**
     * Attach trace file
     */

    if (testInfo.attachments.length > 0) {

        for (const attachment of testInfo.attachments) {

            if (attachment.path) {

                await allure.attachment(
                    attachment.name,
                    attachment.path,
                    attachment.contentType || 'text/plain'
                );
            }
        }
    }
});