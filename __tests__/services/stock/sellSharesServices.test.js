const sellSharesService = require('../../../services/stock/sellSharesService');
const portfolioDB = require('../../../db/portfolio');
const stocksDB = require('../../../db/stocks');

jest.mock('../../../db/portfolio');
jest.mock('../../../db/stocks');

describe('Sell Share Services Tests', () => {
    describe('Calculate Saved Shares', () => {
        test('Share units < 0, should throw error', async() => {
            const userId = 'userId';
            const symbol = 'TSLA';
            const shareUnits = -1;

            expect(async () => {
                await sellSharesService.calculateSavedShares(userId, symbol, shareUnits);
            }).rejects.toEqual(new Error('Negative values are not accepted'));
        });

        test('Insufficient share units, throw error', async() => {
            const userId = 'userId';
            const symbol = 'TSLA';
            const shareUnits = 3;
            const savedShareUnits = 2;
            
            stocksDB.getShareUnits.mockReturnValue(savedShareUnits);

            await expect(async () => {
                await sellSharesService.calculateSavedShares(userId, symbol, shareUnits);
            }).rejects.toEqual(new Error('Insufficient Share Units'));
        })
    })

    describe('Update Share Units', () => {
        test('Should call deleteStock', async() => {
            const userId = 'userId';
            const symbol = 'TSLA';
            const shareUnits = 3;
            const newShareUnits = 0;

            stocksDB.reduceShareUnits.mockReturnValue(newShareUnits);

            await sellSharesService.updateShareUnits(userId, symbol, shareUnits);

            expect(stocksDB.deleteStock).toHaveBeenCalledWith(userId, symbol);
        }); 
    });

    describe('Update Account Balance', () => {
        test('Should calculate new balance', async() => {
            const userId = 'userId';
            const unitPrice = 300;
            const shareUnits = 3;
            const account_balance = 100000;
            const newBalanceMock = +(account_balance + (unitPrice * shareUnits)).toFixed(2);

            portfolioDB.getAccountBalance.mockReturnValue(account_balance);
            portfolioDB.upsertPortfolio.mockImplementation((uId, newBalance) => {
                expect(uId).toEqual(userId);
                expect(newBalance).toEqual(newBalanceMock);
            });

            await sellSharesService.updateAccountBalance(userId, unitPrice, shareUnits);
            
        })
    });
});