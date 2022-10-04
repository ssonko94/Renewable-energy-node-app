const { validationResult } = require("express-validator");

exports.postSignup = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).json({
      message: "Validation, failed entered data is incorrect",
      errors: errors.array(),
    });
  }
  const body = req.body;
  console.log(body);
  res.status(201).json({ message: "Succefully created an account" });
  next();
};
