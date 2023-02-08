const express = require('express');

const router = express.Router();

const {
  login, register, checked, sendToken, verifyToken, changePassword,
} = require('../controllers/authControllers');

// validations
const {
  registerValidator, loginValidator, tokenValidator, emailValidator, passValidator,
} = require('../validations/auth');

// middlewares
const { getErrors } = require('../middlewares');
/* Auth routes. */
router
  .post('/register', registerValidator, getErrors, register)
  .post('/login', loginValidator, getErrors, login)
  .get('/checked', tokenValidator, getErrors, checked)
  .post('/send-token', emailValidator, getErrors, sendToken)
  .get('/change-password', tokenValidator, getErrors, verifyToken)
  .post('/change-password', passValidator, tokenValidator, getErrors, changePassword);

module.exports = router;
