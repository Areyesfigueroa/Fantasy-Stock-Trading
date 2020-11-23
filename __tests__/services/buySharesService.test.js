const { TestScheduler } = require('jest');
const portfolioDB = require('../../db/portfolio');
const stocksDB = require('../../db/stocks');
const buySharesServices = require('../../services/stock/buySharesService');

jest.mock('../../db/portfolio');
jest.mock('../../db/stocks');

describe("Buy Share Services", () => {
    describe('Calculate New Balance', () => {
        test('Should calculate and return the newBalance', async() => {
            const userId='userId';
            const unitPrice=300;
            const shareUnits=3;
            const accountBalance=100000.99;
            const newBalance = +parseFloat(accountBalance - (unitPrice * shareUnits)).toFixed(2);

            portfolioDB.getAccountBalance.mockReturnValue(accountBalance);

            const result = await buySharesServices.calculateNewBalance(userId, unitPrice, shareUnits);
            
            expect(result).toEqual(newBalance);
        })

        // TODO: Error not throwing.
        test('Share units < 0, should throw error', () => {
            const userId='userId';
            const unitPrice=300;
            const shareUnits=-1;
            const error = new Error('Negative values are not accepted');
            // await buySharesServices.calculateNewBalance(userId, unitPrice, shareUnits);
            expect(async() => {
                await buySharesServices.calculateNewBalance(userId, unitPrice, shareUnits);
            }).toThrow(error);
        });

        test('New Balance < 0, throw error', () => {

        });
    })
})