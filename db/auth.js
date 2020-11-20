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
        console.log('WARNING: Adding user to DB');
        
        const saltRounds = 10;
        const salt = await bcrypt.genSalt(saltRounds);
        const hashPassword = await bcrypt.hash(password, salt);
        
        const queryString = "INSERT INTO users(email, first_name, last_name, password, terms_and_policies_agreement) VALUES($1, $2, $3, $4, $5)";
        const values = [email, firstName, lastName, hashPassword, termsCheck];
        await db.query(queryString, values);
    },
    getUser: async (email, password) => {
        console.log('WARNING: Getting User from DB');

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
        console.log('WARNING: Creating User Session DB');

        const insertSessionQuery = "INSERT INTO user_sessions(user_id, expires_at) VALUES ($1, $2) RETURNING id";
        const today = new Date();
        const tomorrow = new Date(today);
        tomorrow.setDate(tomorrow.getDate() + 1);
        const values = [user.id, tomorrow];

        const { rows } = await db.query(insertSessionQuery, values);
        const userSessionId = rows[0].id;

        return userSessionId;
    },

    hasUserSessionExpired: async (sessionID) => {
        const { rows } = await db.query("SELECT expires_at FROM user_sessions WHERE id=$1", [sessionID]);
        if(!rows[0]) throw new Error("Session not found");

        const expirationDate = new Date(rows[0].expires_at);
        const today = new Date();
        // console.log(expirationDate, today);
        return (expirationDate.getTime() < today.getTime());
    },

    getUserBySessionID: async(sessionID) => {
        const query = `SELECT user_id, email, first_name, last_name FROM user_sessions
        JOIN users ON users.id = user_sessions.user_id
        WHERE user_sessions.id = $1`;

        const { rows } = await db.query(query, [sessionID]);
        if(!rows[0]) throw new Error("Session not found");

        return rows[0];
    },

    destroyUserSession: async(sessionID) => {
        console.log('WARNING: Deleting from DB');
        await db.query("DELETE FROM user_sessions WHERE id=$1", [sessionID]);
    }
};