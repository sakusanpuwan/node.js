import fetchData from "./api";

global.fetch = jest.fn().mockResolvedValue({
    json: jest.fn().mockResolvedValue({
    userId: 1,
    id: 1,
    title: 'sunt aut facere...',
    body: 'quia et suscipit...',
    }),
});

describe('API Tests', () => {

    it('should return a successful response', async () => {
        const result = await fetchData(1);
        expect(result.id).toBe(1);
    });
});