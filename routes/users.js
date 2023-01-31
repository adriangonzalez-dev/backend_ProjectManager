const express = require('express');
const router = express.Router();

//controllers
const {profile} = require('../controllers/userControllers')

/* GET users listing. */
router.get('/', profile);

module.exports = router;
