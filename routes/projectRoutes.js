const express = require('express');

const router = express.Router();

const {
  create,
  findAll,
  projectDelete,
  findById,
  update,
  addColaborator,
  removeColaborator,
} = require('../controllers/projectControllers');

/* Validations */
const { createProjectsValidator, idValidator } = require('../validations/projects');

/* middlewares */
const { getErrors } = require('../middlewares');

/* Auth routes. */
router
  .get('/', findAll)
  .post('/', createProjectsValidator, getErrors, create)
  .get('/:id', idValidator, getErrors, findById)
  .put('/:id', idValidator, getErrors, update)
  .delete('/:id', projectDelete)
  .put('/colaborator/:id', addColaborator)
  .delete('/colaborator/:id/:userId', removeColaborator);

module.exports = router;
