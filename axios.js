const axios = require('axios');

const instance = axios.create({
    baseURL: "https://cloud.iexapis.com/stable/"
});

const sandboxInstance = axios.create({
    baseURL: "https://sandbox.iexapis.com/stable/"
});

exports.instance = instance;
exports.sbInstance = sandboxInstance;

// const qs = require('qs');
// require('dotenv').config();

// const API_KEY = process.env.API_KEY;
// const API_SECRET_KEY = process.env.API_SECRET_KEY;

// const data = {
//     "grant_type": "client_credentials",
//     "scope": "public"    
// };

// const authOptions = {
//     method: "post",
//     auth: {
//       username: API_KEY,
//       password: API_SECRET_KEY
//     },
//     data: qs.stringify(data)
// };


// if(instance.defaults.headers.common['Authorization']) {
//     console.log("We already have a token");
// } else {
//     instance.request("/oauth2/token", authOptions).then((res) => {
//         console.log("Grabbed Token");
//         instance.defaults.headers.common['Authorization'] = `Bearer ${res.data.access_token}`;
//     });
// }

// const getInstance = () => {
//     return instance;
// }


