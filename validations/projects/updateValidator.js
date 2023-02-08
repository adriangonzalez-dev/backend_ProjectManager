const { check } = require('express-validator');

const createProjectsValidator = [
  check('name', 'El nombre es necesario').notEmpty().isString().trim(),
  check('description', 'Es necesaria una descripción').notEmpty().isString().trim(),
  check('client', 'El cliente es necesario').notEmpty().isString().trim(),
];

module.exports = {
  createProjectsValidator,
};
