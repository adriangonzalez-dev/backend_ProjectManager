const { check } = require('express-validator');

const idValidator = [
  check('id', 'El id no es válido')
    .isMongoId(),
];

module.exports = {
  idValidator,
};
