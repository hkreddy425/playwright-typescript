import { ApiClient } from '../clients/apiClients';

export class AuthHelper {

    static async getBearerToken(apiClient: ApiClient) {

        const response = await apiClient.post(

            '/login',

            {
                username: 'hari',
                password: '123'
            }
        );

        const responseBody = await response.json();

        return responseBody.token;
    }
}