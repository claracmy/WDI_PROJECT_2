const { env } = require('../config/environment');

function errorHandler(err, req, res, next) {
  err.status = err.status || 500;
  err.message = err.message || 'Internal Server Error';

  if(env === 'production') delete err.stack;

  res.status(err.status);
  res.locals.err = err;
  res.notFound = function notFound() {
    const err = new Error('Not Found');
    err.status = 404;

    throw err;
  };

  res.render(`statics/${err.status}`);
  next(err);
}

module.exports = errorHandler;
