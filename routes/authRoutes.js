const express = require('express');
const router = express.Router();

const authController = require("../controllers/authController");

router.post('/register', authController.register);
router.post('/login', authController.login);
router.get('/logout', authController.logout);
// router.get('/content/tweets/:query/:type/:count', contentSearchRoutes.searchByContent);
// router.get('/content/nextTweets/:nextResultsURL', contentSearchRoutes.searchByContentNextResults);

module.exports = router;




