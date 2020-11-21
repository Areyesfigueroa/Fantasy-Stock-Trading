const authDB = require('../../db/auth');
const portfolioCtrl = require('../../controllers/portfolioController');
const authUserSessionService = require('../../services/auth/authUserSessionService');
const getBalanceService = require('../../services/portfolio/getBalanceService');

const StockErrorHandler = require('../../error/StockErrorHandler');

jest.mock('../../db/auth');
jest.mock('../../services/auth/authUserSessionService');
jest.mock('../../services/portfolio/getBalanceService');

const getMockedResponse = () => {
    const response = { 
        statusCode: 200,
        send: jest.fn(obj => obj),
        status: jest.fn(code => {statusCode=code; return response})
    };

    return response;
}

describe("Portfolio Controller Tests", () => {
    describe("Get User balance", () => {

        test('Response should send balance', async () => {
            const request = { headers: { authorization: 'Bearer token' } };
            const response = getMockedResponse();
            const user = { user_id: 'userId' };
            const balance = 100000;
            const sessionId = 'sessionId';

            await authUserSessionService.authUserSession.mockReturnValue(sessionId);
            await authDB.getUserBySessionID.mockReturnValue(user);
            await getBalanceService.getAccountBalance.mockReturnValue(balance);

            await portfolioCtrl.getBalance(request, response);

            expect(authUserSessionService.authUserSession).toHaveBeenCalledWith(request, response);
            expect(authDB.getUserBySessionID).toHaveBeenCalledWith(sessionId);
            expect(getBalanceService.getAccountBalance).toHaveBeenCalledWith(user.user_id);
            expect(response.send).toHaveBeenCalledWith(balance);
        });

        test('Response should send error', async() => {
            const request = {}
            const response = getMockedResponse();

            const errorMsg = "Mocked Error";
            await authUserSessionService.authUserSession.mockImplementation(() => {
                throw new Error(errorMsg);
            });

            await portfolioCtrl.getBalance(request, response);

            //Assert
            let error = response.send.mock.results[0].value;
            let errorHandler = new StockErrorHandler(`Server Error, could not get account balance: ${errorMsg}`);
            
            expect(error).toEqual(errorHandler);
        })
    })
})
