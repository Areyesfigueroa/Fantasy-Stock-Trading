const express = require('express');
const router = express.Router();

const portfolioController = require("../controllers/portfolioController");

router.get('/balance', portfolioController.getBalance);

module.exports = router;