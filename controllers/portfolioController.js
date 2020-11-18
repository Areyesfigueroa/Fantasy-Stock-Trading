const portfolioDB = require('../db/portfolio');
const authDB = require('../db/auth');
const StockErrorHandler = require('../error/StockErrorHandler');

exports.getBalance = async (request, response) => {
    try {
        // check for basic auth header
        if (!request.headers.authorization) throw new Error('Missing Authorization Header');

        const sessionId = request.headers.authorization.split(' ')[1];
        const hasExpired = await authDB.hasUserSessionExpired(sessionId);
        if(hasExpired) response.send({ hasExpired });
        const user = await authDB.getUserBySessionID(sessionId);
        
        let balance = await portfolioDB.getAccountBalance(user.user_id);
        if(!balance) balance = await portfolioDB.upsertPortfolio(user.user_id, 1);

        response.send(balance);
    } catch(err) {
        response.status(500).send(new StockErrorHandler(`Server Error, could not get account balance: ${err.message}`));
    }
};