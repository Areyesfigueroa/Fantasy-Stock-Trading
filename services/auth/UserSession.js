class UserSession {
    constructor(userId, userEmail, userFirstName, userLastName, sessionId) {
        this.user = { id: userId, email: userEmail, firstName: userFirstName, lastName: userLastName }
        this.sessionId = sessionId;
    }
}

module.exports = UserSession;