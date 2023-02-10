const express = require('express');

const router = express.Router();

// controllers
const { uploadFileProject, getFilesProject, uploadAvatar } = require('../controllers/uploadController');

const { multer } = require('../middlewares');

/* Routes */
router.get('/:id', getFilesProject);
router.put('/avatar', multer.single('avatar'), uploadAvatar);
router.put('/:id', multer.single('image'), uploadFileProject);

module.exports = router;
