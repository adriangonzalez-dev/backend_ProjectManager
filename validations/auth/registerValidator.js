const { check } = require('express-validator');

const registerValidator = [
  check('name', 'El nombre es requerido').notEmpty().isString().trim(),
  check('email', 'Debe ser un email valido').notEmpty().isEmail().trim(),
  check('password', 'La contraseña es requerida').notEmpty().trim(),
];

module.exports = {
  registerValidator,
};
