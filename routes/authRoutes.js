const express = require('express');
const router = express.Router();
const authValidation = require('../validation/authValidation');
const authController = require("../controllers/authController");

router.post('/register', authValidation.registerValidation(), authController.register);
router.post('/login', authValidation.loginValidation(), authController.login);
router.get('/logout', authController.logout);

module.exports = router;




