require("dotenv").config();
const bcrypt = require('bcrypt');

const { Pool } = require('pg');

const connectionString = process.env.DATABASE_URL;
const pool = new Pool({
  connectionString: connectionString,
  ssl: {
    rejectUnauthorized: false
  }
});

const query = (text, params, callback) => {
  return pool.query(text, params, callback)
}

const doPasswordsMatch = async (email, password) => {
  //Find user and get password.
  const { rows } = await query("SELECT password FROM users WHERE email = $1", [email]);
  const hashPassword = rows[0].password;

  //Compare password
  return bcrypt.compare(password, hashPassword);
};

module.exports = {
  getUser: async (email, password) => {
    let response = null;

    const isMatch = await doPasswordsMatch(email, password);

    return new Promise(async (resolve, reject) => {
         if(isMatch) {      
          //Get the user data and store it in a session.
          const { rows } = await query("SELECT * FROM users WHERE email = $1", [email]);
          resolve(rows[0]);
        } else {
          reject({success: false, errMsg: 'Passwords do not match'})
        }
    });
  }
};