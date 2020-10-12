const db = require('../db');

exports.getUsers = (request, response) => {
    db.query('SELECT * FROM users', null, (err, res) => {
        let dbData = [];
        if(err) return next(err);

        for (let row of res.rows) {
            dbData.push(row);
        }
        response.send(dbData);
    });
};

// const axios = require('../axios').getInstance();

// exports.searchByContentRaw = (request, response) => {
//     const data = request.params;

//     axios.get(`/1.1/search/tweets.json?q=${data.query}&result_type=${data.type}&tweet_mode=extended&count=${data.count}`)
//     .then(res => {
//         response.json(res.data);
//     }).catch((error) => response.json({error, message: "Data fetch failed"}));
// }

// app.get('/:id', (req, res, next) => {
//   db.query('SELECT * FROM users WHERE id = $1', [req.params.id], (err, res) => {
//     if (err) {
//       return next(err)
//     }
//     res.send(res.rows[0])
//   })
// })
