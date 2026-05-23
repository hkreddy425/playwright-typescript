# TypeScript Playwright Framework

This repository contains a test automation framework built using **Playwright** and **TypeScript**. It is designed to be robust, scalable, and easy to maintain, incorporating modern testing practices and utilities.

## Features

### 1. **Playwright & TypeScript**
- Built on top of [Playwright](https://playwright.dev/) for reliable end-to-end testing.
- Uses **TypeScript** for type safety and better developer experience.

### 2. **Environment Configuration**
- Supports multiple environments (e.g., `dev`, `qa`, `prod`) using `.env` files.
- Automatically loads the correct `.env` file based on the `NODE_ENV` environment variable.
- Configured in `playwright.config.ts` using `dotenv`.

### 3. **Encryption & Decryption of Environment Variables**
- Includes utilities to encrypt and decrypt sensitive data in `.env` files.
- Uses `crypto-js` for AES encryption.
- **Utilities:**
  - `encryptEnvFile()`: Encrypts values in the `.env` file.
  - `decryptEnvFile()`: Decrypts values in the `.env` file.
  - Located in `src/utils/EncryptAndDecryptEnvFile.ts`.

### 4. **Custom Logging**
- Implements a custom logger using [Winston](https://github.com/winstonjs/winston).
- Logs are separated by severity levels (e.g., `silly`, `debug`, `info`, `error`) into different files.
- Includes timestamps with timezone support (Asia/Kolkata).
- Located in `src/utils/LoggingUtils.ts`.

### 5. **Data-Driven Testing**
- **CSV Support:** Utility to convert CSV files to JSON for data-driven tests (`src/utils/convertCsvToJSON.ts`).
- **Faker Support:** Generates synthetic test data using `@faker-js/faker` (`src/utils/FakerDataUtils.ts`).

### 6. **Page Object Model (POM)**
- Follows the Page Object Model design pattern for better code organization and reuse.
- Page classes are located in `src/pages`.

### 7. **Reporting**
- Configured to generate multiple reports:
  - **List Reporter:** Console output.
  - **JUnit Reporter:** XML output for CI/CD integration (`results.xml`).
  - **HTML Reporter:** Interactive HTML report.
- Screenshots and traces are captured on failure or retry.

## Project Structure

```
typescript-playwright-framework/
├── src/
│   ├── api/                # API testing related code
│   ├── config/             # Configuration files (.env)
│   ├── data/               # Data files
│   ├── logging/            # Generated log files
│   ├── pages/              # Page Object Models
│   ├── reporting/          # Reporting utilities
│   ├── testdata/           # Test data files
│   ├── tests/              # Playwright test specs
│   └── utils/              # Utility functions (Encryption, Logging, etc.)
├── playwright.config.ts    # Playwright configuration
├── package.json            # Dependencies and scripts
└── README.md               # Project documentation
```

## Getting Started

### Prerequisites
- Node.js (v14 or higher)
- npm

### Installation
1. Clone the repository:
   ```bash
   git clone git@github.com:Srijith-Seetharaman/typescript-playwright-framework.git
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
   (or)
   ```bash
   yarn install
   ```
3. Install Playwright browsers:
   ```bash
   npx playwright install
   ```
   or
   ```bash
   yarn playwright install
   ```

### Running Tests

- Set-up before running this test

1. You can only run this if you have an ICICI account
2. If you have it, do:
```bash
cp src/config/.env.example src/config/.env
```
3. Set your ICICI username and password in the environment variable
4. (If you want to test using QA environment setup, then):
```bash
cp src/config/.env.example src/config/.env.qa
```
5. Run the test to encrypt your credentials using the command:
```bash
npx playwright test src\tests\zzencryptUtilTest.spec.ts
```
or
```bash
yarn playwright test src\tests\zzencryptUtilTest.spec.ts
```
6. Run the tests:
  ```bash
  npx playwright test loginTest.spec.ts
  ```
  or
  ```bash
  yarn playwright test loginTest.spec.ts
  ```


```
[If you want to check the QA setup capabilities, set up environment variables in .env.qa, set NODE_ENV=qa as your environment variable in your terminal session and run the tests.]
```

### Viewing Reports
- Show the HTML report:
  ```bash
  npm run show-report
  ```

## Utilities Usage

### Encrypting/Decrypting .env files
You can use the helper functions in `src/utils/EncryptAndDecryptEnvFile.ts` to secure your environment variables. Ensure you have a `SALT` environment variable set for encryption/decryption.

### Logging
Import the `logger` from `src/utils/LoggingUtils.ts` to log messages in your tests:
```typescript
import { logger } from "../utils/LoggingUtils";

logger.info("This is an info message");
logger.error("This is an error message");
```

## License
This project is licensed under the MIT License.
