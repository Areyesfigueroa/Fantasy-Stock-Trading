const UserSession = require('./UserSession');
const db = require('../../db/auth');

const loginUser = async (email, password) => {
    try {
        const user = await db.getUser(email, password);
        const sessionId = await db.createUserSession(user);
        return new UserSession(user.id, user.email, user.first_name, user.last_name, sessionId);
    } catch (error) {
        throw(error);
    }
}

module.exports = { loginUser }