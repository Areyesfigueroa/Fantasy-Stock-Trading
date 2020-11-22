const UserSession = require('../../services/auth/UserSession');

const getMockedUserSession = (userId="userId", email="test@gmail.com", fName="John", lName="Doe", sessionId="sessionId") => {
    return new UserSession(userId, email, fName, lName, sessionId);
}

module.exports = {
    getMockedUserSession
}