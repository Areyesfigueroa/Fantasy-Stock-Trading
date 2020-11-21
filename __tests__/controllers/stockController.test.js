const axios = require('../../axios').instance;
const mockSearchBySymbolRes = require('../../services/test/mockSearchBySymbolRes');
const mockResponse = require('../../services/test/mockResponse');
const mockUserSession = require('../../services/test/mockUserSession');
const mockGetStockHistoryRes = require('../../services/test/mockGetStockHistoryRes');
const stockCtrl = require('../../controllers/stockController');
const formatStockDataService = require('../../services/stock/formatStockDataService');
const authUserSession = require('../../services/auth/authUserSessionService');
const StockErrorHandler = require('../../error/StockErrorHandler');
const utils = require('../../utils');
const auth = require('../../db/auth');
const { authUserSession } = require('../../services/auth/authUserSessionService');

jest.mock('../../db/auth');
jest.mock('../../services/auth/registerUserService');
jest.mock('../../services/auth/loginUserService');
jest.mock('../../services/auth/authUserSessionService');
jest.mock('../../axios');
jest.mock('../../utils');

//What is typescript?

describe('Stock Controller Tests', () => {
    describe('Search By Symbol', () => {
        test('Response should be formatted object', async() => {
            const request = { params: { symbol: 'TSLA' } };
            const response = mockResponse.getResponse();
            const res = { data: mockSearchBySymbolRes.getData(request.params.symbol) };
            const formattedRes = formatStockDataService.formatSearchResults(res);

            axios.get.mockResolvedValue(res);
            
            await stockCtrl.searchBySymbol(request, response);

            expect(response.send.mock.results[0].value).toEqual(formattedRes);
        });

        test('Response should throw general error', async () => {
            const request = { params: { symbol: 'TSLA' } };
            const response = mockResponse.getResponse();
            const error = {
                message: "Mock Error",
                response: {
                    status: 500
                }
            };

            axios.get.mockImplementation(() => {
                throw error;
            });

            await stockCtrl.searchBySymbol(request, response);

            expect(response.send.mock.results[0].value).toEqual(new StockErrorHandler(error.message));
        })

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
                throw error;
            });

            await stockCtrl.searchBySymbol(request, response);

            expect(response.send.mock.results[0].value).toEqual(new StockErrorHandler("Company Symbol not found."));
        });
    });

    describe('Get Stock History', () => {
        test('Response should return stock history obj', async() => {
            const request = {params: { symbol: 'TSLA' }};
            const response = mockResponse.getResponse();
            const res = { data: mockGetStockHistoryRes.getData() }
            const formattedDate = "20201102";
            const formattedStockHistory = formatStockDataService.formatHistoryData(res);

            utils.getLatestWeekday.mockReturnValue(formattedDate);
            axios.get.mockResolvedValue(res);

            await stockCtrl.getStockHistory(request, response);

            expect(response.send.mock.results[0].value).toEqual(formattedStockHistory);
        });

        test('Response should return general error', async() => {
            const request = { params: { symbol: 'TSLA' } };
            const response = mockResponse.getResponse();
            const formattedDate = "20201102";
            const error = {
                message: "Mock Error",
                response: {
                    status: 500
                }
            };

            utils.getLatestWeekday.mockReturnValue(formattedDate);
            axios.get.mockImplementation(() => {
                throw error;
            });

            await stockCtrl.getStockHistory(request, response);

            expect(response.send.mock.results[0].value).toEqual(new StockErrorHandler(error.message));
        })

        test('Response should return 404 error', async() => {
            const request = { params: { symbol: 'TSLA' } };
            const response = mockResponse.getResponse();
            const formattedDate = "20201102";
            const error = {
                message: "Mock Error",
                response: {
                    status: 404
                }
            };

            utils.getLatestWeekday.mockReturnValue(formattedDate);
            axios.get.mockImplementation(() => {
                throw error;
            });

            await stockCtrl.getStockHistory(request, response);

            expect(response.send.mock.results[0].value).toEqual(new StockErrorHandler("Company Symbol not found."));
        })
    });

    describe('Buy Shares', () => {
        test('Response should be success object', () => {
            const request = {body: { unitPrice: 300, shareUnits: 3 }};
            const response = mockResponse.getResponse();

            authUserSession.authUserSession.mockReturnValue('sessionId');
            auth.getUserBySessionID.mockReturnValue(mockUserSession.getMockedUserSession());

            //TODO Complete mocking
        })



    })
});