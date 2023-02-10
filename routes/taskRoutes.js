const express = require('express');

const router = express.Router();

const {
  createTask,
  findAll,
  findById,
  deleteTask,
  changeState,
} = require('../controllers/taskControllers');

// middlewares
const { getErrors } = require('../middlewares');

// validations
const { createTaskValidator } = require('../validations/tasks');

/* task routes. */
router
  .get('/', findAll)
  .post('/', createTaskValidator, getErrors, createTask)
  .get('/:id', findById)
/* .put('/:id', update) */
  .delete('/:id', deleteTask)
  .get('/change-state/:id', changeState);

module.exports = router;
