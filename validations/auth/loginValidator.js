const {check} = require('express-validator');

const loginValidator = [
    check('email', 'Debe ser un email valido').notEmpty().isEmail().trim(),
    check('password', 'La contraseña es requerida').notEmpty().trim()
]

module.exports = {
    loginValidator
}