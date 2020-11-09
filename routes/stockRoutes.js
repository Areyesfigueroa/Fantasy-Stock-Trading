const express = require('express');
const router = express.Router();

const stockController = require("../controllers/stockController");

router.get('/search/:symbol', stockController.searchBySymbol);
router.get('/search/:symbol/history', stockController.getStockHistory);

router.get('/all', stockController.getStocks);

router.post('/transaction/buy', stockController.buyShares);
router.post('/transaction/sell', stockController.sellShares);


module.exports = router;




