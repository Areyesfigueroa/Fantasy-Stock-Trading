const { check } = require('express-validator');
const utils = require('../utils');
const authDB = require('../db/auth');

const email = (customName, fieldName='email', checkForDuplicatesInDB=false) => {
    const validatorChainObj = (
        check(fieldName)
            .isEmail().normalizeEmail().withMessage(`${customName} must be a valid email`)
            .isLength({ min: 3 }).withMessage(`${customName} must be at least 3 characters`)
            .isLength({ max: 320 })
    )

    if(checkForDuplicatesInDB) {
        validatorChainObj.custom(async (value) => {
            const result = await authDB.doesUserExist(value);
            if(result) return Promise.reject('User Email already exists');
        });
    }

    return validatorChainObj;
};

const password = (customName, fieldName='password', compareFieldName='') => {
    const validatorChainObj = check(fieldName)
        .isLength({ min: 8 }).withMessage(`${customName} must be at least 8 characters`)
        .isLength({ max: 128 }).withMessage(`${customName} must be less than 128 characters`)
        .custom((value) => utils.hasSpecialCharacters(value)).withMessage(`${customName} must have special characters`)
        .custom((value) => utils.hasNumber(value)).withMessage(`${customName} must have at least one number`);

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