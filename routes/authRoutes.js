const express = require('express');
const router = express.Router();

const authController = require("../controllers/authController");

router.get('/register/:email/:firstName/:lastName/:password/:termsCheck', authController.register);
// router.get('/content/tweets/:query/:type/:count', contentSearchRoutes.searchByContent);
// router.get('/content/nextTweets/:nextResultsURL', contentSearchRoutes.searchByContentNextResults);

module.exports = router;




