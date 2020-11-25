const stocksDB = require('../../db/stocks');
const portfolioDB = require('../../db/portfolio');

const calculateSavedShares = async (userId, symbol, shareUnits) => {
    try {
        if(shareUnits < 0) throw new Error('Negative values are not accepted');

        //Check how many shares we have left
        const savedShareUnits = await stocksDB.getShareUnits(userId, symbol);
        if((savedShareUnits - shareUnits) < 0) throw new Error("Insufficient Share Units");

    } catch (error) {
        throw error;
    }
}

const updateShareUnits = async (userId, symbol, shareUnits) => {
    try {
        const newShareUnits = await stocksDB.reduceShareUnits(userId, symbol, shareUnits);
        if(newShareUnits === 0) await stocksDB.deleteStock(userId, symbol);
    } catch (error) {
        throw error;
    }
}

const updateAccountBalance = async (userId, unitPrice, shareUnits) => {
    try {
        const { account_balance } = await portfolioDB.getAccountBalance(userId);
        const newBalance = (+account_balance + (unitPrice * shareUnits)).toFixed(2);
        
        await portfolioDB.upsertPortfolio(userId, +newBalance);
    } catch (error) {
        throw error;
    }

}

module.exports = {
    calculateSavedShares,
    updateShareUnits,
    updateAccountBalance
}