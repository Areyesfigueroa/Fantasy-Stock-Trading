const db = require('../../db/stocks');
const formatStockDataService = require('./formatStockDataService');
const axios = require('../../axios').instance;
require('dotenv').config();

const getFormattedStocks = async (userId) => {
    try {
        const stocksRes = await db.getAllStocks(userId);
        
        if(!stockRes) return [];

        //Format data.
        let data = [];
        for (let i = 0; i < stocksRes.length; i++) {
            const searchRes = formatStockDataService.formatSearchResults(await axios.get(`stock/${stocksRes[i].company_symbol}/quote?token=${process.env.API_SECRET_TOKEN}`));
            data.push({
                companyName: searchRes.companyName,
                companySymbol: stocksRes[i].company_symbol,
                holdingValue: stocksRes[i].share_units * searchRes.currentPrice,
                prevHoldingValue: stocksRes[i].share_units * searchRes.prevClosedPrice,
                shares: stocksRes[i].share_units,
                lastPrice: searchRes.currentPrice,
                prevClosedPrice: searchRes.prevClosedPrice,
                percentChange: searchRes.percentChange
            });
        } 
        
        return data;
    } catch (error) {
        throw error;
    }
}

module.exports = {
    getFormattedStocks
}