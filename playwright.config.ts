import { defineConfig, devices } from '@playwright/test';

import { configDotenv } from 'dotenv';
import path from 'path';

/**
 * =========================================================
 * ENVIRONMENT FILE SETUP
 * =========================================================
 *
 * This loads environment variables from .env files.
 *
 * Example:
 *
 * .env
 * BASE_URL=https://www.saucedemo.com/
 *
 * .env.qa
 * BASE_URL=https://qa.saucedemo.com/
 *
 * .env.dev
 * BASE_URL=https://dev.saucedemo.com/
 *
 * Why?
 * ----
 * We should NEVER hardcode URLs, usernames,
 * passwords, tokens, etc inside framework code.
 *
 * Enterprise frameworks always use env files.
 *
 * =========================================================
 */

/**
 * If NODE_ENV is NOT passed
 * it loads default .env file
 */

if (!process.env.NODE_ENV) {

    configDotenv({
        path: path.resolve(__dirname, 'src/config/.env'),
        quiet: true
    });

} else {

    /**
     * If NODE_ENV is passed
     * Example:
     *
     * NODE_ENV=qa
     *
     * Then it loads:
     *
     * .env.qa
     */

    configDotenv({
        path: path.resolve(
            __dirname,
            `src/config/.env.${process.env.NODE_ENV}`
        ),
        quiet: true
    });
}

/**
 * =========================================================
 * PLAYWRIGHT MAIN CONFIGURATION
 * =========================================================
 */

export default defineConfig({

    /**
     * =====================================================
     * TEST DIRECTORY
     * =====================================================
     *
     * This tells Playwright where your test files exist.
     *
     * Example:
     *
     * src/tests/api/
     * src/tests/ui/
     *
     * If you give wrong path:
     * "No Tests Found" error comes.
     *
     * =====================================================
     */

    testDir: './src/tests',

    /**
     * =====================================================
     * PARALLEL EXECUTION
     * =====================================================
     *
     * true  -> tests run simultaneously
     * false -> tests run one by one
     *
     * Why important?
     * ----------------
     * Faster execution.
     *
     * Example:
     * 100 tests
     * Without parallel -> 30 mins
     * With parallel    -> 8 mins
     *
     * Enterprise frameworks ALWAYS use parallel execution.
     *
     * =====================================================
     */

    fullyParallel: true,

    /**
     * =====================================================
     * FAIL IF test.only EXISTS
     * =====================================================
     *
     * Sometimes developers accidentally commit:
     *
     * test.only(...)
     *
     * Then only ONE test executes in CI.
     *
     * This setting prevents that mistake in CI pipeline.
     *
     * =====================================================
     */

    forbidOnly: !!process.env.CI,

    /**
     * =====================================================
     * RETRIES
     * =====================================================
     *
     * If test fails:
     *
     * CI -> retries 2 times
     * Local -> retries 1 time
     *
     * Why useful?
     * ------------
     * Helps temporary flaky failures.
     *
     * Example:
     * - network issue
     * - slow loading
     * - timing issue
     *
     * =====================================================
     */

    retries: process.env.CI ? 2 : 1,

    /**
     * =====================================================
     * WORKERS
     * =====================================================
     *
     * Workers = number of browsers running in parallel.
     *
     * Example:
     *
     * workers: 4
     *
     * means:
     * 4 tests can run simultaneously.
     *
     * Why set 1 in CI?
     * ----------------
     * CI machines may be slower.
     * Reduces flaky behavior.
     *
     * undefined means:
     * Playwright automatically decides based on CPU.
     *
     * =====================================================
     */

    workers: process.env.CI ? 1 : undefined,

    /**
     * =====================================================
     * REPORTERS
     * =====================================================
     *
     * REPORTERS generate test execution reports.
     *
     * =====================================================
     */

    reporter: [

        /**
         * -----------------------------------------------
         * LIST REPORTER
         * -----------------------------------------------
         *
         * Shows results in terminal.
         *
         * Example:
         *
         * ✓ Login Test
         * ✓ Add To Cart
         *
         * -----------------------------------------------
         */

        ['list'],

        /**
         * -----------------------------------------------
         * HTML REPORTER
         * -----------------------------------------------
         *
         * Generates Playwright HTML report.
         *
         * Command to open:
         *
         * npx playwright show-report
         *
         * -----------------------------------------------
         */

        ['html'],

        /**
         * -----------------------------------------------
         * ALLURE REPORTER
         * -----------------------------------------------
         *
         * Generates allure-results folder.
         *
         * Required for Allure reports.
         *
         * Commands:
         *
         * Generate Report:
         * npx allure generate allure-results --clean
         *
         * Open Report:
         * npx allure open
         *
         * -----------------------------------------------
         */

        ['allure-playwright']
    ],

    /**
     * =====================================================
     * COMMON SETTINGS
     * =====================================================
     *
     * Applies to ALL tests.
     *
     * =====================================================
     */

    use: {

        /**
         * -------------------------------------------------
         * BASE URL
         * -------------------------------------------------
         *
         * NEVER hardcode URLs here directly.
         *
         * Use .env file instead.
         *
         * Example:
         *
         * BASE_URL=https://www.saucedemo.com/
         *
         * Then:
         *
         * page.goto('/')
         *
         * automatically becomes:
         *
         * https://www.saucedemo.com/
         *
         * -------------------------------------------------
         */

        baseURL: process.env.BASE_URL,

        /**
         * -------------------------------------------------
         * HEADLESS MODE
         * -------------------------------------------------
         *
         * false -> browser visible
         * true  -> browser hidden
         *
         * Use false during framework development.
         * Use true in CI pipelines.
         *
         * -------------------------------------------------
         */

        headless: false,

        /**
         * -------------------------------------------------
         * SCREENSHOT
         * -------------------------------------------------
         *
         * only-on-failure
         *
         * Takes screenshot ONLY if test fails.
         *
         * Best enterprise practice.
         *
         * -------------------------------------------------
         */

        screenshot: 'only-on-failure',

        /**
         * -------------------------------------------------
         * VIDEO RECORDING
         * -------------------------------------------------
         *
         * retain-on-failure
         *
         * Stores video ONLY for failed tests.
         *
         * Very useful for debugging.
         *
         * -------------------------------------------------
         */

        video: 'retain-on-failure',

        /**
         * -------------------------------------------------
         * TRACE
         * -------------------------------------------------
         *
         * One of Playwright's BEST features.
         *
         * Captures:
         * - clicks
         * - network
         * - locators
         * - screenshots
         * - DOM snapshots
         *
         * on-first-retry means:
         * collect trace only when retry happens.
         *
         * Helps reduce storage.
         *
         * -------------------------------------------------
         */

        trace: 'retain-on-failure',

        /**
         * -------------------------------------------------
         * ACTION TIMEOUT
         * -------------------------------------------------
         *
         * Maximum time for actions like:
         * - click
         * - fill
         * - hover
         *
         * Example:
         * click should finish within 15 seconds.
         *
         * -------------------------------------------------
         */

        actionTimeout: 15000,

        /**
         * -------------------------------------------------
         * NAVIGATION TIMEOUT
         * -------------------------------------------------
         *
         * Maximum page load wait time.
         *
         * Example:
         * page.goto()
         *
         * waits maximum 30 seconds.
         *
         * -------------------------------------------------
         */

        navigationTimeout: 30000
    },

    /**
     * =====================================================
     * BROWSER CONFIGURATION
     * =====================================================
     *
     * Defines which browsers to execute.
     *
     * =====================================================
     */

    projects: [

        /**
         * -------------------------------------------------
         * CHROMIUM
         * -------------------------------------------------
         *
         * Runs tests in Chrome browser engine.
         *
         * Most commonly used in automation.
         *
         * -------------------------------------------------
         */

        {
            name: 'chromium',

            use: {
                ...devices['Desktop Chrome']
            }
        }

        /**
         * =================================================
         * FUTURE BROWSERS
         * =================================================
         *
         * You can later add:
         *
         * Firefox
         * Safari
         * Edge
         * Mobile
         *
         * =================================================
         */
    ]
});