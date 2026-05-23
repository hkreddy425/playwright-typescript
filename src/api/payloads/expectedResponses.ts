import { expect } from '@playwright/test';
export const expectedCreateResponseStructure = {

    id: expect.any(String),

    name: expect.any(String),

    createdAt: expect.any(Number),

    data: {

        year: expect.any(Number),

        price: expect.any(Number),

        'CPU model': expect.any(String),

        'Hard disk size': expect.any(String)
    }
};