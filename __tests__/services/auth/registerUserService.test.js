const mockUserSession = require('../../../services/test/mockUserSession');
const authDB = require('../../../db/auth');
const registerUserService = require('../../../services/auth/registerUserService');

jest.mock('../../../db/auth');

describe('Register User Service', () => {
    describe('Register User', () => {
        test('Should return user session obj', async () => {
            const email = 'test@gmail.com';
            const fName = 'John';
            const lName = 'Doe';
            const password = 'pass123';
            const termsCheck = true;
            const userSession = mockUserSession.getMockedUserSession('userId', email, fName, lName, 'sessionId');
            const { user, sessionId } = userSession;

            authDB.getUser.mockReturnValue(user);
            authDB.createUserSession.mockReturnValue(sessionId);

            const result = await registerUserService.registerUser(email, fName, lName, password, termsCheck);

            expect(result).toEqual(userSession);
        })
    });
})