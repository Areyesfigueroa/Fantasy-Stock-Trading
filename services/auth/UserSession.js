class UserSession {
    constructor(userId, userEmail, userFirstName, userLastName, sessionId) {
        this.user = { id: userId, email: userEmail, first_name: userFirstName, last_name: userLastName }
        this.sessionId = sessionId;
    }
}

module.exports = UserSession;