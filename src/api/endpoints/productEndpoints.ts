export const PRODUCT_ENDPOINTS = {

    GET_ALL_OBJECTS: '/objects',

    GET_OBJECT_BY_ID: (id: string) => `/objects/${id}`,

    CREATE_OBJECT: '/objects',

    UPDATE_OBJECT: (id: string) => `/objects/${id}`,

    DELETE_OBJECT: (id: string) => `/objects/${id}`
};