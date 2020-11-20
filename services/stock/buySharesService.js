const db = require('../../db/portfolio');

const calculateNewBalance = async (userId, unitPrice, shareUnits) => {
    try {
        if(shareUnits < 0) throw new Error('Negative values are not accepted');

        //Get new balance
        const { account_balance } = await db.getAccountBalance(userId);
        const newBalance = parseFloat(account_balance - (unitPrice * shareUnits)).toFixed(2);
        if(newBalance < 0) throw new Error(`Insufficient Funds, you are over by $${Math.abs(newBalance)}`);

        return newBalance;
    } catch (error) {
        throw error;
    }
}

const updateHoldings = async(userId, shareUnits, newBalance) => {
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