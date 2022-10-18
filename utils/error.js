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

const errorWrapper = (func) => async (req, res, next) => {
  try {
    await func(req, res);
  } catch (error) {
    return next(error);
  }
};

const createError = ({ error, message, code, type }) => {
  const err = new Error(error);
  err.type = type;
  err.statusCode = code;
  err.message = message;
  return err;
};

module.exports = {
  errorResponder,
  errorWrapper,
  createError,
};
