const {check} = require('express-validator');

const tokenValidator = [
    check('token', 'El token es necesario').notEmpty().trim(),
]

module.exports = {
    tokenValidator
}