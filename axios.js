const axios = require('axios');

const instance = axios.create({
    baseURL: "https://cloud.iexapis.com/stable/"
});

const sandboxInstance = axios.create({
    baseURL: "https://sandbox.iexapis.com/stable/"
});

exports.instance = instance;
exports.sbInstance = sandboxInstance;