const db = require('../db');
const bcrypt = require('bcrypt');

exports.register = async (request, response) => {
    const body = request.body;

    try {
        const saltRounds = 10;
        const salt = await bcrypt.genSalt(saltRounds);
        const hashPassword = await bcrypt.hash(body.password, salt);
        
        const query = "INSERT INTO users(email, first_name, last_name, password, terms_and_policies_agreement) VALUES($1, $2, $3, $4, $5)";
        const values = [body.email, body.firstName, body.lastName, hashPassword, body.termsCheck];
        
        await db.query(query, values, (err) => {
            if(err) {
                console.log(err);
                response.status(500).send({success: false, errMsg: 'Error occured, could not register in database.'});
            }

            response.send({success: true});
        });

    } catch(err) {
        //500 internal server error.
        console.log(err);
        response.status(500).send('Error occured could not register. Server error.');
    }

};

exports.login = async(request, response) => {
    const data = request.params;
    try {

        let hashPassword = '';

        const query = "SELECT password FROM users WHERE email = $1";
        const values = [data.email];

        //Find user and get password.
        await db.query(query, values, (err, res) => {
            if(err) {
                console.log(err);
                response.status(500).send({success: false, errMsg: 'Error occured, could not login user from Database'});
            }

            hashPassword = res.rows[0].password;
            console.log(hashPassword);
        });

        //Compare password
        const isMatch = await bcrypt.compare(data.password, hashPassword, (err) => console.log(err));

        if(isMatch) {
            response.send("Passwords Match");
        } else {
            response.send({success: false, errMsg: 'Passwords do not match'});
        }
    } catch(err) {

    }
}
