const express = require('express');
const router = express.Router();

const stockController = require("../controllers/stockController");

router.get('/search/:symbol', stockController.searchBySymbol);
// router.get('/content/tweets/:query/:type/:count', contentSearchRoutes.searchByContent);
// router.get('/content/nextTweets/:nextResultsURL', contentSearchRoutes.searchByContentNextResults);

module.exports = router;




