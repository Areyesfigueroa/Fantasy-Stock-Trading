const db = require('../../db/auth');

const authUserSession = async(request, response) => {
    try {
        if (!request.headers.authorization) throw new Error('Missing Authorization Header');

        const sessionId = request.headers.authorization.split(' ')[1];
        const hasExpired = await db.hasUserSessionExpired(sessionId);
        if(hasExpired) response.send({ hasExpired });

        return sessionId;
    } catch (error) {
        throw error;
    }
}

module.exports = { authUserSession }