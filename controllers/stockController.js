const axios = require('../axios').instance;
const authDB = require('../db/auth');
const stocksDB = require('../db/stocks');
const utils = require('../utils');
const formatStockDataService = require('../services/stock/formatStockDataService');
const authUserSessionService = require('../services/auth/authUserSessionService');
const buySharesService = require('../services/stock/buySharesService');
const sellSharesService = require('../services/stock/sellSharesService');
const getStocksService = require('../services/stock/getStocksService');

const StockErrorHandler = require('../error/StockErrorHandler');
require('dotenv').config();

exports.searchBySymbol = async (request, response) => {
    try {
        const params = request.params;
        if(!params.symbol) throw new Error('Symbol cannot be empty');

        const res = await axios.get(`stock/${params.symbol}/quote?token=${process.env.API_SECRET_TOKEN}`);
  
        response.send(formatStockDataService.formatSearchResults(res));
    } catch (error) {
        let errorMessage = error.message;
        if(error.response) {
            if(error.response.status === 404) {
                errorMessage = "Company Symbol not found.";
            }
        }

        response.status(500).send(new StockErrorHandler(`Search Failed: ${errorMessage}`));
    }
}

//TODO: Needs unit test
exports.getShareUnits = async (request, response) => {
    try {
        const params = request.params;
        if(!params.symbol) throw new error('Symbol cannot be empty');
        
        //Get user info
        const sessionId = await authUserSessionService.authUserSession(request, response);
        const user = await authDB.getUserBySessionID(sessionId);

        const sharesHeld = await stocksDB.getShareUnits(user.user_id, params.symbol.toUpperCase());

        response.send({ sharesHeld });
    } catch (error) {
        response.status(500).send(new StockErrorHandler(`Could not get share units: ${error.message}`));
    }

}

exports.getStockHistory = async (request, response) => {
    try {
        const params = request.params;
        const interval = 60; //minutes save
    
        const yesterday = new Date();
        yesterday.setDate(yesterday.getDate() - 1);
        const date = utils.getLatestWeekday(yesterday); //save

        const res = await axios.get(`stock/${params.symbol}/chart/dynamic/${date}?token=${process.env.API_SECRET_TOKEN}&chartInterval=${interval}`)
        const stockHistory = formatStockDataService.formatHistoryData(res);

        response.send(stockHistory);
    } catch (error) {
        let errorMessage = error.message;
        if(error.response) {
            if(error.response.status === 404) {
                errorMessage = "Company Symbol not found.";
            }
        }

        response.status(500).send(new StockErrorHandler(errorMessage));
    }
}

exports.buyShares = async (request, response) => {
    try{
        const body = request.body;

        //Get user info
        const sessionId = await authUserSessionService.authUserSession(request, response);
        const user = await authDB.getUserBySessionID(sessionId);

        const newBalance = await buySharesService.calculateNewBalance(user.user_id, body.unitPrice, body.shareUnits);
        await buySharesService.updateHoldings(user.user_id, body.symbol, body.shareUnits, newBalance);

        response.send({ success: true });
    } catch(error) {
        response.status(500).send(new StockErrorHandler(`Could not update your stocks: ${error.message}`));
    }
}

exports.sellShares = async (request, response) => {
    try {
        const body = request.body;
        body.shareUnits = parseInt(body.shareUnits);

        const sessionId = await authUserSessionService.authUserSession(request, response);
        const user = await authDB.getUserBySessionID(sessionId);

        await sellSharesService.calculateSavedShares(user.user_id, body.symbol, body.shareUnits);
        await sellSharesService.updateShareUnits(user.user_id, body.symbol, body.shareUnits);
        await sellSharesService.updateAccountBalance(user.user_id, body.unitPrice, body.shareUnits);

        response.send({ success: true });

    } catch (error) {
        response.status(500).send(new StockErrorHandler(`Could not reduce the shares: ${error.message}`));
    }
}

exports.getStocks = async (request, response) => {
    try {
        const sessionId = await authUserSessionService.authUserSession(request, response);
        const user = await authDB.getUserBySessionID(sessionId);
        const stocksData = await getStocksService.getFormattedStocks(user.user_id);

        response.send(stocksData);
    } catch (error) {
        response.status(500).send(new StockErrorHandler(`Could not retrive saved stocks: ${error.message}`));
    }
}