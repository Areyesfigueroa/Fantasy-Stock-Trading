const db = require('../db');
const utils = require('../utils');

exports.register = async (request, response) => {
    const body = request.body;
    try {
        await db.addUser(body.email, body.firstName, body.lastName, body.password, body.termsCheck);
        response.status(200).send({successMessage: "User registered successfully"});
    } catch(err) {
        response.status(500).send({error: err, errorMessage: `Server Error, could not register: ${err.message}`});
    }

};

exports.login = async(request, response) => {
    const body = request.body;
    try {
        const user = await db.getUser(body.email, body.password);
        const sessionId = await db.createUserSession(user);
        response.send({
            user: {
                id: user.id,
                email: user.email
            },
            sessionId
        });
    } catch(err) {
        response.status(500).send(`Server error occured, could not login: ${err.message}`);
    }
}
