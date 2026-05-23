import {
    APIRequestContext,
    APIResponse,
    request
} from '@playwright/test';

export class ApiClient {

    private requestContext!: APIRequestContext;

    /**
     * Create API request context
     */

    async createContext() {

        this.requestContext = await request.newContext({

            baseURL: process.env.BASE_URL,

            extraHTTPHeaders: {
                Accept: 'application/json'
            }
        });
    }

    /**
     * GET Request
     */

    async get(
        endpoint: string,
        headers?: Record<string, string>
    ): Promise<APIResponse> {

        return await this.requestContext.get(endpoint, {
            headers
        });
    }

    /**
     * POST Request
     */

    async post(
        endpoint: string,
        payload: object,
        headers?: Record<string, string>
    ): Promise<APIResponse> {

        return await this.requestContext.post(endpoint, {
            data: payload,
            headers
        });
    }

    /**
     * PUT Request
     */

    async put(
        endpoint: string,
        payload: object,
        headers?: Record<string, string>
    ): Promise<APIResponse> {

        return await this.requestContext.put(endpoint, {
            data: payload,
            headers
        });
    }

    /**
     * DELETE Request
     */

    async delete(
        endpoint: string,
        headers?: Record<string, string>
    ): Promise<APIResponse> {

        return await this.requestContext.delete(endpoint, {
            headers
        });
    }
}