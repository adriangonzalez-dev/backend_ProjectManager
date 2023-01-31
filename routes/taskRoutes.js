const express = require('express');
const router = express.Router();

const { findAll,create, findById, update, projectDelete, changeState } = require('../controllers/taskControllers');

/* Auth routes. */
router
    .get('/',findAll)
    .post('/',create)
    .get('/:id',findById)
    .put('/:id', update)
    .delete('/:id',projectDelete)
    .get('/change-state/:id', changeState)
    

module.exports = router;
