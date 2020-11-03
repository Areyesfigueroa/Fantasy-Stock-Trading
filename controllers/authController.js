const db = require('../db/auth');
const StockErrorHandler = require('../error/StockErrorHandler');

class UserSession {
    constructor(userId, userEmail, userFirstName, userLastName, sessionId) {
        this.user = { id: userId, email: userEmail, firstName: userFirstName, lastName: userLastName }
        this.sessionId = { sessionId }
    }
}

exports.register = async (request, response) => {
    const body = request.body;
    try {
        await db.addUser(body.email, body.firstName, body.lastName, body.password, body.termsCheck);
        const user = await db.getUser(body.email, body.password);
        const sessionId = await db.createUserSession(user);
        const userSession = new UserSession(user.id, user.email, user.first_name, user.last_name, sessionId);

        response.status(200).send(userSession);
    } catch(err) {
        response.status(500).send(new StockErrorHandler(`Server Error, could not register: ${err.message}`));
    }
};

exports.login = async(request, response) => {
    const body = request.body;
    try {
        const user = await db.getUser(body.email, body.password);
        const sessionId = await db.createUserSession(user);
        const userSession = new UserSession(user.id, user.email, user.first_name, user.last_name, sessionId);

        response.status(200).send(userSession);
    } catch(err) {
        response.status(500).send(new StockErrorHandler(`Server error occured, could not login: ${err.message}`));
    }
}
