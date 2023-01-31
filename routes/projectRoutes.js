const express = require('express');
const router = express.Router();

const { create, 
        findAll, 
        projectDelete, 
        findById, 
        update, 
        addColaborator, 
        removeColaborator } = require('../controllers/projectControllers');

/* Auth routes. */
router
    .get('/',findAll)
    .post('/',create)
    .get('/:id',findById)
    .put('/:id', update)
    .delete('/:id',projectDelete)
    .get('/colaborator/add', addColaborator)
    .delete('/colaborator/delete', removeColaborator)

module.exports = router;
