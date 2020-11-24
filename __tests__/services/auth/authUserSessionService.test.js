const authUserSessionService = require('../../../services/auth/authUserSessionService');
const authDB = require('../../../db/auth');
const mockResponse = require('../../../services/test/mockResponse');

jest.mock('../../../db/auth');

describe('Auth User Session Service', () => {
    describe('Auth User Session', () => {
        test('Missing Authorization Header, should throw error', async () => {
            const request = { headers: { authorization: '' } };
            const response = mockResponse.getResponse();

            await expect(async () => {
                await authUserSessionService.authUserSession(request, response);
            }).rejects.toEqual(new Error('Missing Authorization Header'));
        });

        test('Has expired, response should send hasExpired object', async () => {
            const request = { headers: { authorization: 'Bearer token' } };
            const response = mockResponse.getResponse();

            authDB.hasUserSessionExpired.mockReturnValue(true);

            await authUserSessionService.authUserSession(request, response);

            expect(response.send.mock.results[0].value).toEqual({ hasExpired: true });
        });

        test('Should return session Id', async () => {
            const request = { headers: { authorization: 'Bearer token' } };
            const response = mockResponse.getResponse();

            authDB.hasUserSessionExpired.mockReturnValue(false);

            const sessionId = await authUserSessionService.authUserSession(request, response);

            expect(sessionId).toEqual('token');
        })
    });
})