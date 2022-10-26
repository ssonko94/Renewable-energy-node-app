const errorResponder = (error, req, res, next) => {
  console.error(error);
  res.header("Content-Type", "application/json");
  if (!error.statusCode) {
    error.statusCode = 500;
  }
  res
    .status(error.statusCode)
    .send(JSON.stringify({ message: error.message, code: error.statusCode }));
};

module.exports = errorResponder;
