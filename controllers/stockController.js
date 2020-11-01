const axios = require('../axios').instance;
const StockErrorHandler = require('../error/StockErrorHandler');
require('dotenv').config();

exports.searchBySymbol = (request, response) => {
    const data = request.params;

    axios.get(`stock/${data.symbol}/quote?token=${process.env.API_SECRET_TOKEN}`)
    .then((res) => {
        const data = {
            companyName: res.data.companyName,
            symbol: res.data.symbol,
            currentPrice: res.data.latestPrice,
            percentChange: (res.data.changePercent * 100).toFixed(3),
            dailyGainLoss: res.data.change
        };
        response.send(data);
    })
    .catch((error) => {
        let errorMessage = error.message;
        if(error.response.status === 404) {
            errorMessage = "Company Symbol not found.";
        }

        response.status(500).send(new StockErrorHandler(errorMessage));
    });
}