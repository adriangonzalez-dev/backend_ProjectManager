/* eslint-disable no-unused-vars */
// eslint-disable-next-line import/no-extraneous-dependencies
const multer = require('multer');
const fs = require('fs');
const path = require('path');

const storage = multer.diskStorage({
/*   destination(req, file, cb) {
    cb(null, path.join(__dirname, '../public/static/user'));
  }, */
  filename(req, file, cb) {
    cb(null, `${Date.now()}_avatar_${path.extname(file.originalname)}`);
  },
});

// eslint-disable-next-line consistent-return
const filterMimetype = (req, file, cb) => {
  const mimetypeRegex = /^image\/(jpg|jpeg|png|svg|webp)$/;
  if (file && !mimetypeRegex.test(file.mimetype)) {
    return cb(new Error('invalid image'));
  }
  cb(null, true);
};

const uploadImage = multer({ storage, fileFilter: filterMimetype });

module.exports = uploadImage;
