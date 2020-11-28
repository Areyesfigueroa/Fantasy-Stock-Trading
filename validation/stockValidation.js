const { number } = require('./validationFields');

const sharesFormValidation = () => [
    number('Share Units', "shareUnits", true)
];

module.exports = {
    sharesFormValidation
}