export class RequestBuilder {

    static getHeaders(token?: string) {

        /*return {

            'Content-Type': 'application/json',

            'x-api-key': '12345',

            'client-id': 'test-client',

            ...(token && {
                Authorization: `Bearer ${token}`
            })
        };*/

        return {

            'Content-Type': 'application/json',

            ...(token && {
                Authorization: `Bearer ${token}`
            })
        };
    }
}