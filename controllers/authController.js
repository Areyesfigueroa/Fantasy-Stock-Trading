const db = require('../db');
const bcrypt = require('bcrypt');

exports.register = async (request, response) => {
    console.log(request.params);
    const data = request.params;

    try {
        const saltRounds = 10;

        const hashPassword = await bcrypt.hash(data.password, saltRounds);
    
        console.log(hashPassword);
    
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
