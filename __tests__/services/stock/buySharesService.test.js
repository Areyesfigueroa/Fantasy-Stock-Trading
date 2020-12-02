const portfolioDB = require('../../../db/portfolio');
const getBalanceService = require('../../../services/portfolio/getBalanceService');
const buySharesServices = require('../../../services/stock/buySharesService');

jest.mock('../../../db/portfolio');
jest.mock('../../../db/stocks');
jest.mock('../../../services/portfolio/getBalanceService');

describe("Buy Share Services", () => {
    describe('Calculate New Balance', () => {
        test('Should calculate and return the newBalance', async() => {
            const userId='userId';
            const unitPrice=300;
            const shareUnits=3;
            const account_balance=100000.99;
            const newBalance = +parseFloat(account_balance - (unitPrice * shareUnits)).toFixed(2);

            getBalanceService.getAccountBalance.mockReturnValue({ account_balance });

            const result = await buySharesServices.calculateNewBalance(userId, unitPrice, shareUnits);
            expect(result).toEqual(newBalance);
        })

        test('Share units < 0, should throw error', () => {
            const userId='userId';
            const unitPrice=300;
            const shareUnits=-1;

            expect(async () => {
                await buySharesServices.calculateNewBalance(userId, unitPrice, shareUnits);
            }).rejects.toEqual(new Error('Negative values are not accepted'));
        });

        test('New Balance < 0, throw error', () => {
            const userId='userId';
            const unitPrice=300;
            const shareUnits=3;
            const accountBalance=0;
            const newBalance = +parseFloat(accountBalance - (unitPrice * shareUnits)).toFixed(2);

            portfolioDB.getAccountBalance.mockReturnValue(accountBalance);

            expect(async () => {
                await buySharesServices.calculateNewBalance(userId, unitPrice, shareUnits);
            }).rejects.toEqual(new Error(`Insufficient Funds, you are over by $${Math.abs(newBalance)}`));
        });
    })
})