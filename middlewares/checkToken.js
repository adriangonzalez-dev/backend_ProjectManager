/* eslint-disable no-unused-vars */
/* eslint-disable default-param-last */
const { request, response } = require('express');
const { verify } = require('jsonwebtoken');
const User = require('../models/User');

// eslint-disable-next-line consistent-return
const checkToken = async (req = request, res = response, next) => {
  try {
    if (!req.headers.authorization) {
      return res.status(401).json({
        ok: false,
        msg: 'Token inexistente',
      });
    }

    const token = req.headers.authorization;
    const { id } = verify(token, process.env.JWT_SECRET);

    req.user = await User.findById(id).select('name email avatar');

    next();
  } catch (error) {
    // eslint-disable-next-line no-console
    console.log(error);
    return res.status(403).json({
      ok: false,
      msg: 'Acceso no autorizado',
    });
  }
};

module.exports = { checkToken };
