const mockUserSession = require('../../../services/test/mockUserSession');
const loginUserService = require('../../../services/auth/loginUserService');

const authDB = require('../../../db/auth');

jest.mock('../../../db/auth');

describe('Login User Service', () => {
    describe('Login User', () => {
        test('Should return user session', async() => {
            const email = 'test@gmail.com';
            const password = 'pass123';
            const userSession = mockUserSession.getMockedUserSession();
            const { user, sessionId } = userSession;

            authDB.getUser.mockReturnValue(user);
            authDB.createUserSession.mockReturnValue(sessionId);

            const result = await loginUserService.loginUser(email, password);

            expect(result).toEqual(userSession);
        });
    })
})