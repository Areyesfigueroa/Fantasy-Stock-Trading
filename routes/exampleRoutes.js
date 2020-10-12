const express = require('express');
const router = express.Router();

const exampleController = require("../controllers/exampleController");

router.get('/users', exampleController.getUsers);
// router.get('/content/tweets/:query/:type/:count', contentSearchRoutes.searchByContent);
// router.get('/content/nextTweets/:nextResultsURL', contentSearchRoutes.searchByContentNextResults);

module.exports = router;




