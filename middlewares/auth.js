const jwt = require('jsonwebtoken');
const NotAuthError = require('../errors/NotAuthError');

// eslint-disable-next-line consistent-return
module.exports = (req, res, next) => {
  const token = req.cookies.jwt;

  const { NODE_ENV, JWT_SECRET } = process.env;

  if (!token) {
    throw new NotAuthError('Авторизуйтесь, пожалуйста');
  }

  let payload;

  try {
    payload = jwt.verify(token, NODE_ENV === 'production' ? JWT_SECRET : 'super-strong-secret');
    req.user = payload;
    next();
  } catch (err) {
    throw new NotAuthError('Авторизуйтесь, пожалуйста');
  }
};
