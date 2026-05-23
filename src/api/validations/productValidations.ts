import { expect } from '@playwright/test';
import { expectedCreateResponseStructure } from '../payloads/expectedResponses';

export class ProductValidations {

    static validateCreateResponse(responseBody: any) {

    expect(responseBody).toMatchObject(
        expectedCreateResponseStructure
    );
}

    static validateUpdateResponse(responseBody: any) {
        expect(responseBody.name).toContain('Updated');
    }

    static validateDeleteResponse(statusCode: number) {
        expect(statusCode).toBe(200);
    }

    static validateGetResponse(responseBody: any) {
        expect(responseBody).not.toBeNull();
    }
}