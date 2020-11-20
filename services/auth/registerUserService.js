const UserSession = require('./UserSession');
const db = require('../../db/auth');

const registerUser = async (email, fName, lName, password, termsCheck) => {
    try {
        await db.addUser(email, fName, lName, password, termsCheck);
        const user = await db.getUser(email, password);
        const sessionId = await db.createUserSession(user);
    
        return new UserSession(user.id, user.email, user.first_name, user.last_name, sessionId);
    } catch (error) {
        throw(error);
    }

}

module.exports = { registerUser }