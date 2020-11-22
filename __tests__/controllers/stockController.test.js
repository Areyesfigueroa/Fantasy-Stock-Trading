const axios = require('../../axios').instance;
const mockSearchBySymbolRes = require('../../services/test/mockSearchBySymbolRes');
const mockResponse = require('../../services/test/mockResponse');
const mockUserSession = require('../../services/test/mockUserSession');
const mockGetStockHistoryRes = require('../../services/test/mockGetStockHistoryRes');
const stockCtrl = require('../../controllers/stockController');
const formatStockDataService = require('../../services/stock/formatStockDataService');
const StockErrorHandler = require('../../error/StockErrorHandler');
const utils = require('../../utils');
const authDB = require('../../db/auth');
const buySharesService = require('../../services/stock/buySharesService');
const authUserSessionService = require('../../services/auth/authUserSessionService');
const getStocksService = require('../../services/stock/getStocksService');

jest.mock('../../db/auth');
jest.mock('../../services/auth/registerUserService');
jest.mock('../../services/auth/loginUserService');
jest.mock('../../services/auth/authUserSessionService');
jest.mock('../../services/stock/buySharesService');
jest.mock('../../services/stock/sellSharesService');
jest.mock('../../services/stock/getStocksService');
jest.mock('../../axios');
jest.mock('../../utils');

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
        test('Response should be success object', async () => {
            const request = {body: { unitPrice: 300, shareUnits: 3 }};
            const response = mockResponse.getResponse();
            const newBalance = 100000;
            const successObj = { success: true }

            authUserSessionService.authUserSession.mockReturnValue('sessionId');
            authDB.getUserBySessionID.mockReturnValue(mockUserSession.getMockedUserSession());
            buySharesService.calculateNewBalance.mockReturnValue(newBalance);

            await stockCtrl.buyShares(request, response);

            expect(response.send.mock.results[0].value).toEqual(successObj);
        });
        
        test('Response should throw an error', async () => {
            const request = {body: { unitPrice: 300, shareUnits: 3 }};
            const response = mockResponse.getResponse();

            const errorMsg = "Mock Error";
            authUserSessionService.authUserSession.mockImplementation(() => {
                throw new Error(errorMsg);
            });

            await stockCtrl.buyShares(request, response);

            expect(response.send.mock.results[0].value).toEqual(new StockErrorHandler(`Could not update your stocks: ${errorMsg}`));
        });
    })

    describe('Sell Shares', () => {
        test('Response should be success object', async () => {
            const request = {body: { symbol: 'TSLA', unitPrice: 300, shareUnits: 3 }};
            const response = mockResponse.getResponse();
            const successObj = { success: true };
    
            authUserSessionService.authUserSession.mockReturnValue('sessionId');
            authDB.getUserBySessionID.mockReturnValue(mockUserSession.getMockedUserSession());
    
            await stockCtrl.sellShares(request, response);
    
            expect(response.send.mock.results[0].value).toEqual(successObj);
        });

        test('Response should throw an error', async () => {
            const request = {};
            const response = mockResponse.getResponse();
            
            const errorMsg = 'Mock Error';
            authUserSessionService.authUserSession.mockImplementation(() => {
                throw new Error(errorMsg);
            });

            await stockCtrl.sellShares(request, response);

            expect(response.send.mock.results[0].value).toEqual(new StockErrorHandler(`Could not reduce the shares: ${errorMsg}`));
        });
    });

    describe('Get Stocks', () => {
        test('Response should return formatted data', async() => {
            const request = {body: { symbol: 'TSLA', unitPrice: 300, shareUnits: 3 }};
            const response = mockResponse.getResponse();

            authUserSessionService.authUserSession.mockReturnValue('sessionId');
            authDB.getUserBySessionID.mockReturnValue(mockUserSession.getMockedUserSession());
            getStocksService.getFormattedStocks.mockReturnValue({});

            await stockCtrl.getStocks(request, response);

            expect(response.send.mock.results[0].value).toEqual({});
        });

        test('Response should return error', async () => {
            const request = {body: { symbol: 'TSLA', unitPrice: 300, shareUnits: 3 }};
            const response = mockResponse.getResponse();
            const errorMsg = "Mock Error";
            
            authUserSessionService.authUserSession.mockImplementation(() => {
                throw new Error(errorMsg);
            });

            await stockCtrl.getStocks(request, response);

            expect(response.send.mock.results[0].value).toEqual(new StockErrorHandler(`Could not retrive saved stocks: ${errorMsg}`));
        });
    });
});