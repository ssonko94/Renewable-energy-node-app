const { body } = require("express-validator");

const errorLogger = (error, req, res, next) => {
  console.error("\x1b[31m", err);
  next(error);
};

const clientSideErrorHandler = (error, req, res, next) => {
  body("firstName").trim().isLength({ min: 3 }).not().isEmpty(),
    body("lastName").trim().isLength({ min: 3 }).not().isEmpty(),
    body("email")
      .isEmail()
      .withMessage("Please enter a valid email address")
      .custom((value, { req }) => {
        return User.findOne({ email: value }).then((userDoc) => {
          if (userDoc) {
            return Promise.reject("E-mail already exists");
          }
        });
      })
      .normalizeEmail(),
    body("password").trim().isLength({ min: 5 }),
    body("rights").trim().isLength({ min: 3 }).not().isEmpty(),
    next();
};

const errorResponder = (error, req, res, next) => {
  res.header("Content-Type", "application/json");
  res.status(error.statusCode).send(JSON.stringify(error, null, 4));
};

module.exports = { errorLogger, clientSideErrorHandler, errorResponder };
