const express = require('express');

const router = express.Router();

// controllers
const { profile } = require('../controllers/userControllers');
const { checkToken } = require('../middlewares/checkToken');

/* GET users listing. */
router.get('/', checkToken, profile);

module.exports = router;
