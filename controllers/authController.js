const db = require('../db');
const bcrypt = require('bcrypt');
const utils = require('../utils');

exports.register = async (request, response) => {
    const body = request.body;
    try {
        const result = await db.addUser(body.email, body.firstName, body.lastName, body.password, body.termsCheck);
        response.send(result);
    } catch(err) {
        response.status(500).send(`Error occured could not register: ${err.message}`);
    }

};

exports.login = async(request, response) => {
    const data = request.params;
    try {
        const user = await db.getUser(data.email, data.password);
        response.send(user);
    } catch(err) {
        console.log(err.message);
        response.status(500).send(`Error occured could not login: ${err.message}`);
    }
}
