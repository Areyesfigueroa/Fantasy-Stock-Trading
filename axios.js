const axios = require('axios')

const instance = axios.create({
  baseURL: 'https://cloud.iexapis.com/stable/'
})

instance.defaults.baseURL

exports.instance = instance
