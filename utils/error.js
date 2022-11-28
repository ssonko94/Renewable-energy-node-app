const handleValidationErrors = (error) => {
  error.statusCode = 422;
  error.message = `Validation failed due to ${error.message}`;
  return error;
};

const errorResponder = (error, req, res, next) => {
  console.error(error);
  res.header("Content-Type", "application/json");
  if (!error.statusCode) {
    error.statusCode = 500;
  }
  if (error.code === 11000) {
    err = handleValidationErrors(error);
    res
      .status(err.statusCode)
      .send(JSON.stringify({ message: err.message, code: err.statusCode }));
    return;
  }
  res
    .status(error.statusCode)
    .send(JSON.stringify({ message: error.message, code: error.statusCode }));
};

module.exports = errorResponder;
