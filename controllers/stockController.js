const axios = require('../axios').sbInstance;
require('dotenv').config();

exports.searchBySymbol = (request, response) => {
    const data = request.params;

    axios.get(`stock/${data.symbol}/quote?token=${process.env.API_SECRET_TOKEN}`)
    .then((res) => {
        response.send(res.data);
    })
    .catch((error) => {
        console.log(error)
    });
}