const { validationResult } = require('express-validator');
const StockErrorHandler = require('../../error/StockErrorHandler');

const validateRequest = (req, res) => {
    const errors = validationResult(req);

    if(!errors.isEmpty()) {
        res.status(400).send(new StockErrorHandler(`${errors.array()[0].msg}`));
    }
}

module.exports = {
    validateRequest
}