const db = require('../db');
const bcrypt = require('bcrypt');

exports.register = async (request, response) => {
    console.log(request.params);
    const data = request.params;

    try {
        const saltRounds = 10;
        const hashPassword = await bcrypt.hash(data.password, saltRounds);
        
        const query = "INSERT INTO users(email, first_name, last_name, password, terms_and_policies_agreement) VALUES($1, $2, $3, $4, $5)";
        const values = [data.email, data.fName, data.lName, hashPassword, data.terms_and_policies];

        db.query(query, values, (err, res) => {
            let dbData = [];
            if(err) {
                console.log(err); 
                return;
            }

            for(let row of res.rows) {
                dbData.push(row);    
            }
            
            response.send(dbData);
        });

        // db.query('SELECT * FROM users', null, (err, res) => {
        //     let dbData = [];
        //     if(err) return next(err);
    
        //     for (let row of res.rows) {
        //         dbData.push(row);
        //     }
        //     response.send(dbData);
        // });
    } catch {

    }

};
