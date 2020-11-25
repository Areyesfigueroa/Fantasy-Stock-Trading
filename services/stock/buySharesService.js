const portfolioDB = require('../../db/portfolio');
const stocksDB = require('../../db/stocks');
const getBalanceService = require('../../services/portfolio/getBalanceService');

const calculateNewBalance = async (userId, unitPrice, shareUnits) => {
    try {
        if(shareUnits < 0) throw new Error('Negative values are not accepted');

        //Get new balance
        const { account_balance } = await getBalanceService.getAccountBalance(userId);
        const newBalance = +parseFloat(account_balance - (unitPrice * shareUnits)).toFixed(2);
        if(newBalance < 0) throw new Error(`Insufficient Funds, you are over by $${Math.abs(newBalance)}`);

        return newBalance;

    } catch (error) {
        throw error;
    }
}

const updateHoldings = async(userId, symbol, shareUnits, newBalance) => {
    try {
        await stocksDB.upsertStocks(userId, symbol, shareUnits);
        await portfolioDB.upsertPortfolio(userId, newBalance);
    } catch (error) {
        throw error;
    }
}

module.exports = { 
    calculateNewBalance,
    updateHoldings
}