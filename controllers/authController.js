const db = require('../db/auth');
const registerUserService = require('../services/auth/registerUserService');
const loginUserService = require('../services/auth/loginUserService');
const authUserSessionService = require('../services/auth/authUserSessionService');
const StockErrorHandler = require('../error/StockErrorHandler');

exports.register = async (request, response) => {
    const body = request.body;
    try {
        const userSession = await registerUserService.registerUser(body.email, body.firstName, body.lastName, body.password, body.termsCheck);
        response.send(userSession);
    } catch(err) {
        response.status(500).send(new StockErrorHandler(`Server Error, could not register: ${err.message}`));
    }
};

exports.login = async(request, response) => {
    const body = request.body;
    try {
        const userSession = await loginUserService.loginUser(body.email, body.password);
        response.status(200).send(userSession);
    } catch(err) {
        response.status(500).send(new StockErrorHandler(`Server Error, could not login: ${err.message}`));
    }
}

exports.logout = async(request, response) => {
    try {        
        const sessionId = await authUserSessionService.authUserSession(request, response);
        await db.destroyUserSession(sessionId);
    
        response.send({success: true});
    } catch (error) {
        response.status(500).send(new StockErrorHandler(`Server error, could not logout: ${error.message}`));
    }

}