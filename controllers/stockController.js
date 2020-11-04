const axios = require('../axios').instance;
const stocksDB = require('../db/stocks');
const authDB = require('../db/auth');
const utils = require('../utils');
const StockErrorHandler = require('../error/StockErrorHandler');
require('dotenv').config();

exports.searchBySymbol = (request, response) => {
    const data = request.params;

    axios.get(`stock/${data.symbol}/quote?token=${process.env.API_SECRET_TOKEN}`)
    .then((res) => {
        const data = {
            id: res.data.symbol,
            companyName: res.data.companyName,
            symbol: res.data.symbol,
            currentPrice: res.data.latestPrice,
            percentChange: (res.data.changePercent * 100).toFixed(3),
            dailyGainLoss: res.data.change
        };
        response.send(data);
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

        // if(hasExpired) //Log out user

        //upsert to database.
        //await db.upsertStocks(body.userID, body.symbol, body.shareUnits);
        response.send({ success: true, body, hasExpired});
    } catch(error) {
        console.log(error.message);
        response.status(500).send(new StockErrorHandler(error.message));
    }
}