const authDB = require('../db/auth');
const StockErrorHandler = require('../error/StockErrorHandler');
const authUserSessionService = require('../services/auth/authUserSessionService');
const getBalanceService = require('../services/portfolio/getBalanceService');

exports.getBalance = async (request, response) => {
    try {
        const sessionId = await authUserSessionService.authUserSession(request, response);
        const user = await authDB.getUserBySessionID(sessionId);
        
        const balance = await getBalanceService.getAccountBalance(user.user_id);
        response.send(balance);
    } catch(err) {
        response.status(500).send(new StockErrorHandler(`Server Error, could not get account balance: ${err.message}`));
    }
};