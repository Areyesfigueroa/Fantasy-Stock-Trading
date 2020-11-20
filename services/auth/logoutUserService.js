const db = require('../../db/auth');

const logoutUser = async (sessionId) => {
    try {
        await db.destroyUserSession(sessionId);
    } catch (error) {
        throw(error);
    }
}

module.exports = { logoutUser }