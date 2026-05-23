import { test } from '@playwright/test';

import { ApiClient } from '../../api/clients/apiClients';

import { PRODUCT_ENDPOINTS } from '../../api/endpoints/productEndpoints';

import { expectedCreateResponseStructure } from '../../api/payloads/expectedResponses';

import {
    createProductPayload,
    updateProductPayload
} from '../../api/payloads/productPayload';

import { ProductValidations } from '../../api/validations/productValidations';

import { RequestBuilder } from '../../api/utils/requestBuilder';

test.describe.serial('Product API Tests', () => {

    let apiClient: ApiClient;

    let createdObjectId: string;

    /**
     * Runs once before all tests
     */

    test.beforeAll(async () => {

        apiClient = new ApiClient();

        await apiClient.createContext();
    });

    /**
     * POST - Create Product
     */

    test('POST - Create Product', async () => {

        /**
         * Dynamic headers
         * const token = 'abc123';
         */

        const headers = RequestBuilder.getHeaders();

        const response = await apiClient.post(

            PRODUCT_ENDPOINTS.CREATE_OBJECT,

            createProductPayload(),

            headers
        );

        const responseBody = await response.json();

        console.log('Create Response:', responseBody);

        createdObjectId = responseBody.id;


        ProductValidations.validateCreateResponse(responseBody);
    });

    /**
     * GET - Fetch Product
     */

    test('GET - Get Created Product', async () => {

        const headers = RequestBuilder.getHeaders();

        const response = await apiClient.get(

            PRODUCT_ENDPOINTS.GET_OBJECT_BY_ID(createdObjectId),

            headers
        );

        const responseBody = await response.json();

        console.log('Get Response:', responseBody);

        ProductValidations.validateGetResponse(responseBody);
    });

    /**
     * PUT - Update Product
     */

    test('PUT - Update Product', async () => {

        const headers = RequestBuilder.getHeaders();

        const response = await apiClient.put(

            PRODUCT_ENDPOINTS.UPDATE_OBJECT(createdObjectId),

            updateProductPayload(),

            headers
        );

        const responseBody = await response.json();

        console.log('Update Response:', responseBody);

        ProductValidations.validateUpdateResponse(responseBody);
    });

    /**
     * DELETE - Delete Product
     */

    test('DELETE - Delete Product', async () => {

        const headers = RequestBuilder.getHeaders();

        const response = await apiClient.delete(

            PRODUCT_ENDPOINTS.DELETE_OBJECT(createdObjectId),

            headers
        );

        console.log('Delete Status:', response.status());

        ProductValidations.validateDeleteResponse(response.status());
    });
});