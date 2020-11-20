const portfolioDB = require('../../db/portfolio');

const getAccountBalance = async (userId) => {
    try {
        let balance = await portfolioDB.getAccountBalance(userId);
        if(!balance) balance = await portfolioDB.upsertPortfolio(userId, 100000);
    
        return balance;
    } catch (error) {
        throw error;
    }
}

module.exports = {
    getAccountBalance
}