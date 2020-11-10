const axios = require('../axios').instance;
const stocksDB = require('../db/stocks');
const authDB = require('../db/auth');
const utils = require('../utils');
const StockErrorHandler = require('../error/StockErrorHandler');
require('dotenv').config();

const formatStockData = (res) => {
    const data = {
        id: res.data.symbol,
        companyName: res.data.companyName,
        symbol: res.data.symbol,
        currentPrice: res.data.latestPrice,
        percentChange: (res.data.changePercent * 100).toFixed(3),
        dailyGainLoss: res.data.change
    };
    return data;
}

exports.searchBySymbol = async (request, response) => {

    axios.get(`stock/${data.symbol}/quote?token=${process.env.API_SECRET_TOKEN}`)
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

    const date = utils.getLatestWeekday(); //YYYYMMDD

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
        
        //upsert to database.
        await stocksDB.upsertStocks(user.user_id, body.symbol, body.shareUnits);
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
        await stocksDB.reduceShareUnits(user.user_id, body.symbol, body.shareUnits);
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
                shares: stocksRes[i].share_units,
                lastPrice: searchRes.currentPrice,
                percentChange: searchRes.percentChange
            });
        }

        response.send(data);
    } catch (error) {
        response.status(500).send(new StockErrorHandler(`Could not retrive saved stocks: ${error.message}`));
    }
}