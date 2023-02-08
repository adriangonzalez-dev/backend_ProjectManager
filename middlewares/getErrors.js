/* eslint-disable consistent-return */
const { validationResult } = require('express-validator');

const getErrors = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      errors: errors.mapped(),
    });
  }
  next();
};

module.exports = {
  getErrors,
};
