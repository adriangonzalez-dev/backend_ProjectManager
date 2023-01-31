const {check} = require('express-validator');

const emailValidator = [
    check('email', 'Debe ser un email valido').notEmpty().isEmail().trim(),
]

module.exports = {
    emailValidator
}