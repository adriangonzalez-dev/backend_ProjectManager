const express = require('express');
const router = express.Router();

const {login,register, checked, sendToken, verify, changePassword} = require('../controllers/authControllers')

//validations
const {registerValidator, loginValidator} = require('../validations/auth')

//middlewares
const {getErrors} = require('../middlewares')
/* Auth routes. */
router
.post('/register', registerValidator, getErrors, register)
.post('/login', loginValidator, getErrors, login)
.get('/checked',  checked)
.post('/send', sendToken)
.get('/change-password', verify)
.post('/change-password', changePassword)

module.exports = router;
