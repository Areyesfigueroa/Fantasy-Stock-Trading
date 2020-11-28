const { email, password, text, checkbox } = require('./validationFields');

const loginValidation = () => [
    email('Email'),
    password('Password')
];

const registerValidation = () => [ 
    email('Email', 'email', true), 
    text('First Name', 'firstName'), 
    text('Last Name', 'lastName'),
    password('Password'),
    password('Retype Password', 'retypePassword', 'password'),
    checkbox('Terms', 'termsCheck')
];

module.exports = {
    loginValidation,
    registerValidation
}