export class CommonHelpers {

    /**
     * Generate random number
     */

    static generateRandomNumber() {

        return Math.floor(
            Math.random() * 10000
        );
    }

    /**
     * Generate random email
     */

    static generateRandomEmail() {

        return `test${Date.now()}@mail.com`;
    }

    /**
     * Convert object to formatted JSON
     */

    static prettyPrint(data: object) {

        return JSON.stringify(
            data,
            null,
            2
        );
    }
}