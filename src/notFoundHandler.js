const createError = require('http-errors');

function notFoundHandler(req, res, next) {
  const error = createError(404, 'Route not found');
  next(error);
}

module.exports = notFoundHandler;
