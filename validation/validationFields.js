const { check } = require('express-validator');

const email = (customName, fieldName='email') => {
    return (
        check(fieldName)
            .isEmail().normalizeEmail().withMessage(`${customName} must be a valid email`)
            .isLength({ min: 3 }).withMessage(`${customName} must be at least 3 characters`)
            .isLength({ max: 320 })
    )
};

const password = (customName, fieldName='password', compareFieldName='') => {
    const validatorChainObj = check(fieldName)
        .isLength({ min: 8 }).withMessage(`${customName} must be at least 8 characters`)
        .isLength({ max: 128 }).withMessage(`${customName} must be less than 128 characters`);

    if(!compareFieldName) return validatorChainObj;

    return validatorChainObj
        .custom((value, { req }) => value === req.body[compareFieldName]).withMessage('passwords must match');   
}

const text = (customName, fieldName='text') => {
    return(
        check(fieldName)
            .isLength({ min: 1 }).withMessage(`${customName} must be at least 1 character`)
            .isLength({ max: 35 }).withMessage(`${customName} must be less than 36 characters`)
    )
}

const checkbox = (customName, fieldName='checkbox') => {
    return (
        check(fieldName)
            .custom((value) => value === true).withMessage(`${customName} must be checked`)
    )
}

module.exports = {
    email, 
    password,
    text,
    checkbox
}