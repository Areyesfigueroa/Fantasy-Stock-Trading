const getBalanceService = require('../../../services/portfolio/getBalanceService');
const portfolioDB = require('../../../db/portfolio');

jest.mock('../../../db/portfolio');

describe('Ger Balance Service', () => {
    describe('Get Account Balance', () => {
        test('Should return account balance', async () => {
            const userId = 'userId';
            const savedBalance = 80000;
            const defaultBalance = 100000;

            portfolioDB.getAccountBalance.mockReturnValue(savedBalance);
            portfolioDB.upsertPortfolio.mockReturnValue(defaultBalance);

            const balance = await getBalanceService.getAccountBalance(userId);

            expect(balance).toEqual(savedBalance);

        });

        test('if Balance is null or undefined, should initialize portfolio with 100,000', async() => {
            const userId = 'userId';
            const savedBalance = undefined;
            const newBalance = 100000;

            portfolioDB.getAccountBalance.mockReturnValue(savedBalance);
            portfolioDB.upsertPortfolio.mockReturnValue(newBalance);

            const balance = await getBalanceService.getAccountBalance(userId);

            expect(portfolioDB.upsertPortfolio).toHaveBeenCalledWith(userId, newBalance);
            expect(balance).toEqual(newBalance);
        })
    });
});