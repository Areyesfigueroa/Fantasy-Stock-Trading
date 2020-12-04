const axios = require('axios');

const instance = axios.create({
    baseURL: "https://cloud.iexapis.com/stable/"
});

exports.instance = instance;