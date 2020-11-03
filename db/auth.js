const db = require('../db');
const bcrypt = require('bcrypt');

const doPasswordsMatch = async (email, password) => {
    //Find user and get password.
    const { rows } = await db.query("SELECT password FROM users WHERE email = $1", [email]);

    if(!rows[0]) throw new Error("Email not found");

    const hashPassword = rows[0].password;
    return bcrypt.compare(password, hashPassword);
};

module.exports = {
    addUser: async (email, firstName, lastName, password, termsCheck) => {
        const saltRounds = 10;
        const salt = await bcrypt.genSalt(saltRounds);
        const hashPassword = await bcrypt.hash(password, salt);
        
        const queryString = "INSERT INTO users(email, first_name, last_name, password, terms_and_policies_agreement) VALUES($1, $2, $3, $4, $5)";
        const values = [email, firstName, lastName, hashPassword, termsCheck];
        
        await db.query(queryString, values);
    },
    getUser: async (email, password) => {
        const isMatch = await doPasswordsMatch(email, password);

        return new Promise(async (resolve, reject) => {
            if(isMatch) {      
            //Get the user data and store it in a session.
            const { rows } = await db.query("SELECT * FROM users WHERE email = $1", [email]);
            resolve(rows[0]);
            } else {
            reject({message:'Passwords do not match'});
            }
        });
    }, 
    createUserSession: async (user) => {
        const insertSessionQuery = "INSERT INTO user_sessions(user_id, expires_at) VALUES ($1, $2) RETURNING id";
        const today = new Date();
        const tomorrow = new Date(today);
        tomorrow.setDate(tomorrow.getDate() + 1);
        const values = [user.id, tomorrow];

        const { rows } = await db.query(insertSessionQuery, values);
        const userSessionId = rows[0].id;

        return userSessionId;
    }
};