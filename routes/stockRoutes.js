const express = require('express');
const router = express.Router();

const stockController = require("../controllers/stockController");

router.get('/search/:symbol', stockController.searchBySymbol);
router.get('/search/:symbol/history', stockController.getStockHistory);
router.post('/transaction/buy', stockController.buyShares);
// router.get('/content/tweets/:query/:type/:count', contentSearchRoutes.searchByContent);
// router.get('/content/nextTweets/:nextResultsURL', contentSearchRoutes.searchByContentNextResults);

module.exports = router;




