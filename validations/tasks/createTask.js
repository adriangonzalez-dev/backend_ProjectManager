const { check } = require('express-validator');

const createTaskValidator = [
  check('name', 'el nombre es requerido').isString().notEmpty(),
  check('description', 'la descripción es requerida').isString().notEmpty(),
  check('dateExpire', 'no es una fecha válida').isDate().notEmpty(),
  check('priority', 'la prioridad es requerida').isString().notEmpty(),
  check('idProject', 'el id no es válido').isMongoId().notEmpty(),
];

module.exports = {
  createTaskValidator,
};
