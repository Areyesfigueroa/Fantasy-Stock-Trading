const db = require('../db');

exports.register = (request, response) => {
    console.log(request.params);
    // db.query('SELECT * FROM users', null, (err, res) => {
    //     let dbData = [];
    //     if(err) return next(err);

    //     for (let row of res.rows) {
    //         dbData.push(row);
    //     }
    //     response.send(dbData);
    // });
};
