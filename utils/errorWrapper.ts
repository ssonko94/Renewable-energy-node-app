const errorWrapper = (func) => async (req, res, next) => {
  try {
    await func(req, res, next);
  } catch (error) {
    return next(error);
  }
};

export default errorWrapper;
