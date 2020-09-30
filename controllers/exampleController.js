// const axios = require('../axios').getInstance();

// exports.searchByContentRaw = (request, response) => {
//     const data = request.params;

//     axios.get(`/1.1/search/tweets.json?q=${data.query}&result_type=${data.type}&tweet_mode=extended&count=${data.count}`)
//     .then(res => {
//         response.json(res.data);
//     }).catch((error) => response.json({error, message: "Data fetch failed"}));
// }