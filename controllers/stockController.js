const axios = require('../axios').instance;
const stocksDB = require('../db/stocks');
const authDB = require('../db/auth');
const portfolioDB = require('../db/porftolio');
const utils = require('../utils');
const StockErrorHandler = require('../error/StockErrorHandler');
require('dotenv').config();

const formatStockData = (res) => {
    const data = {
        id: res.data.symbol,
        companyName: res.data.companyName,
        symbol: res.data.symbol,
        currentPrice: res.data.latestPrice,
        prevClosedPrice: res.data.previousClose,
        percentChange: (res.data.changePercent * 100).toFixed(3),
        dailyGainLoss: res.data.change
    };
    return data;
}

exports.searchBySymbol = async (request, response) => {
    const params = request.params;
    axios.get(`stock/${params.symbol}/quote?token=${process.env.API_SECRET_TOKEN}`)
    .then((res) => {
        response.send(formatStockData(res));
    })
    .catch(error => {
        let errorMessage = error.message;
        if(error.response.status === 404) {
            errorMessage = "Company Symbol not found.";
        }

        response.status(500).send(new StockErrorHandler(errorMessage));
    });
}

exports.getStockHistory = (request, response) => {
    const params = request.params;
    const interval = 60; //minutes

    const today = new Date();
    const yesterday = new Date();
    yesterday.setDate(today.getDate() - 1);
    const date = utils.getLatestWeekday(yesterday);

    axios.get(`stock/${params.symbol}/chart/dynamic/${date}?token=${process.env.API_SECRET_TOKEN}&chartInterval=${interval}`)
    .then(res => {

        const data = res.data.map((el) => {
            return {
                date: el.date,
                time: el.label,
                price: el.average
            }
        });

        response.send(data);
    })
    .catch(error => {
        let errorMessage = error.message;
        if(error.response.status === 404) {
            errorMessage = "Company Symbol not found.";
        }

        response.status(500).send(new StockErrorHandler(errorMessage));
    })
}

exports.buyShares = async (request, response) => {
    try{
        const body = request.body;

        // check for basic auth header
        if (!request.headers.authorization) throw new Error('Missing Authorization Header');

        const sessionId = request.headers.authorization.split(' ')[1];
        const hasExpired = await authDB.hasUserSessionExpired(sessionId);
        const user = await authDB.getUserBySessionID(sessionId);

        if(hasExpired) response.send({ hasExpired });

        const { account_balance } = await portfolioDB.getAccountBalance(user.user_id);
        const newBalance = parseFloat(account_balance - (body.unitPrice * body.shareUnits)).toFixed(2);
        
        await stocksDB.upsertStocks(user.user_id, body.symbol, body.shareUnits);
        await portfolioDB.upsertPortfolio(user.user_id, newBalance);

        response.send({ success: true, hasExpired});
    } catch(error) {
        response.status(500).send(new StockErrorHandler(`Could not update/insert the stocks table: ${error.message}`));
    }
}

exports.sellShares = async (request, response) => {
    try {
        const body = request.body;

        // check for basic auth header
        if (!request.headers.authorization) throw new Error('Missing Authorization Header');

        const sessionId = request.headers.authorization.split(' ')[1];
        const hasExpired = await authDB.hasUserSessionExpired(sessionId);
        if(hasExpired) response.send({ hasExpired });
        const user = await authDB.getUserBySessionID(sessionId);

        //Update share units.
        const newShareUnits = await stocksDB.reduceShareUnits(user.user_id, body.symbol, body.shareUnits);
        if(newShareUnits === 0) {
            await stocksDB.deleteStock(user.user_id, body.symbol);
            throw new Error("Insufficient Shares");
        }

        //Update account balance.
        const { account_balance } = await portfolioDB.getAccountBalance(user.user_id);
        const newBalance = parseFloat(account_balance + (body.unitPrice * body.shareUnits)).toFixed(2);
        await portfolioDB.upsertPortfolio(user.user_id, newBalance);

        response.send({ success: true, hasExpired });

    } catch (error) {
        response.status(500).send(new StockErrorHandler(`Could not reduce the shares on the stocks table: ${error.message}`));
    }
}

exports.getStocks = async (request, response) => {
    try {
        // check for basic auth header
        if (!request.headers.authorization) throw new Error('Missing Authorization Header');

        const sessionId = request.headers.authorization.split(' ')[1];
        const hasExpired = await authDB.hasUserSessionExpired(sessionId);
        
        if(hasExpired) response.send({ hasExpired });
        
        const user = await authDB.getUserBySessionID(sessionId);
        const stocksRes = await stocksDB.getAllStocks(user.user_id);
        
        //Format data.
        let data = [];
        for (let i = 0; i < stocksRes.length; i++) {
            const searchRes = formatStockData(await axios.get(`stock/${stocksRes[i].company_symbol}/quote?token=${process.env.API_SECRET_TOKEN}`));
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

        response.send(data);
    } catch (error) {
        response.status(500).send(new StockErrorHandler(`Could not retrive saved stocks: ${error.message}`));
    }
}