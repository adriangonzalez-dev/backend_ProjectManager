/* eslint-disable no-console */
/* eslint-disable no-unused-vars */
const { request, response } = require('express');

module.exports = {
  profile: (req = request, res = response) => {
    try {
      return res.status(201).json({
        ok: true,
        msg: 'user profile',
        user: req.user,
      });
    } catch (error) {
      console.log(error);
      return res.status(error.status || 500).json({
        ok: false,
        msg: error.message || 'user profile error',
      });
    }
  },
};
