const express = require('express');
const router = express.Router();
const stockValidation = require('../validation/stockValidation');
const stockController = require("../controllers/stockController");

router.get('/search/:symbol?', stockController.searchBySymbol);
router.get('/search/:symbol/history', stockController.getStockHistory);

router.get('/all', stockController.getStocks);
router.get('/:symbol', stockController.getShareUnits);

router.post('/transaction/buy', stockValidation.sharesFormValidation(), stockController.buyShares);
router.post('/transaction/sell', stockValidation.sharesFormValidation(), stockController.sellShares);

module.exports = router;
