const axios = require('../../axios').instance;
const mockSearchBySymbolRes = require('../../services/test/mockSearchBySymbolRes');
const mockResponse = require('../../services/test/mockResponse');
const mockUserSession = require('../../services/test/mockUserSession');
const stockCtrl = require('../../controllers/stockController');
const formatStockDataService = require('../../services/stock/formatStockDataService');

jest.mock('../../db/auth');
jest.mock('../../services/auth/registerUserService');
jest.mock('../../services/auth/loginUserService');
jest.mock('../../services/auth/authUserSessionService');
jest.mock('../../axios')

describe('Stock Controller Tests', () => {
    describe('Search By Symbol', () => {
        test('Response should be formatted object', async() => {
            const request = { params: { symbol: 'TSLA' } };
            const response = mockResponse.getResponse();
            const res = { data: mockSearchBySymbolRes.getData(request.params.symbol) };
            const formattedRes = formatStockDataService.formatStockData(res);

            axios.get.mockResolvedValue(res);
            
            await stockCtrl.searchBySymbol(request, response);

            expect(response.send.mock.results[0].value).toEqual(formattedRes);
        });

        test('Response should throw 404 error', async () => {
            const request = { params: { symbol: 'TSLA' } };
            const response = mockResponse.getResponse();
            const error = {
                message: "Mock Error",
                response: {
                    status: 404
                }
            };

            axios.get.mockImplementation(() => {
                throw new Error(error);
            });

            await stockCtrl.searchBySymbol(request, response);

            console.log(response.send.mock.results[0].value);

        })
    })
});