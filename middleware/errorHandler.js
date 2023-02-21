const errorHandler = (err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  const message = err.message || "Internal server error";

  const customError = {
    success: false,
    statusCode,
    message,
  };

  res.status(statusCode).json(customError);
};

module.exports = errorHandler;
