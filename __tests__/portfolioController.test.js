const portfolioDB = require('../db/portfolio');
const authDB = require('../db/auth');
const portfolioCtrl = require('../controllers/portfolioController');
const StockErrorHandler = require('../error/StockErrorHandler');

jest.mock('../db/auth');
jest.mock('../db/portfolio');

describe("Portfolio Controller Tests", () => {
    describe("Get User balance", () => {
        //Test DB Query Params
        //Test Response
        //Test expired response
        //Test no balance returned
        //Test missing auth header
        //Test error response
        test('Response should return balance', async() => {
            const request = { headers: { authorization: 'Bearer token' } };
            const response = { send: jest.fn(obj => obj) };
            const user = { user_id: 'userID' }
            const balance = 100000;

            authDB.hasUserSessionExpired.mockReturnValue(false);
            authDB.getUserBySessionID.mockReturnValue(user);
            portfolioDB.getAccountBalance.mockReturnValue(balance);

            await portfolioCtrl.getBalance(request, response);

            expect(response.send.mock.results[0].value).toEqual(balance);
        })
    })
})
