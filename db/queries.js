require('../db');
const bcrypt = require('bcrypt');

exports.authUser = async (email, password) => {
    //Find user and get password.
    const { rows } = await query("SELECT password FROM users WHERE email = $1", [email]);
    const hashPassword = rows[0].password;

    //Compare password
    const isMatch = await bcrypt.compare(password, hashPassword);

    return new Promise((resolve, reject) => {
        if(isMatch) {
            resolve(getUserData());
        } else {
            reject({success: false, errMsg: 'Passwords do not match'})
        }
    });
}

exports.getUserData = async (email) => {
    //Get the user data and store it in a session.
    const { rows } = await db.query("SELECT * FROM users WHERE email = $1", [email]);
    const userData = results.rows[0];

    return new Promise((resolve, reject) => resolve(userData));
}