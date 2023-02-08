const { check } = require('express-validator');

const passValidator = [
  check('password', 'La contraseña es requerida').notEmpty().trim(),
];

module.exports = {
  passValidator,
};
