const errorHandler = (err, req, res, next) => {
  const statusCode = err.statusCode || res.statusCode || 500;

  res.status(statusCode).json({
    success: false,
    message: err.message || 'An unexpected error occurred',
    errors: err.details || null,
    stack: process.env.NODE_ENV === 'production' ? undefined : err.stack,
  });

  next(err);
};

module.exports = { errorHandler };
