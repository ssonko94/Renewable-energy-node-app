require("dotenv").config();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const errorWrapper = require("../utils/errorWrapper");
const AppError = require("../utils/baseError");
const signUpValidator = require("../utils/signupSchema");
const { sendConfirmationEmail } = require("../nodemailer.config");

const User = require("../models/user");

const signupFunc = async (req, res, next) => {
  const firstName = req.body.firstName;
  const lastName = req.body.lastName;
  const email = req.body.email;
  const password = req.body.password;
  const rights = req.body.rights;
  const hashedPassword = await bcrypt.hash(password, 12);

  const { error } = await signUpValidator(req.body);

  if (error) {
    return next(new AppError(error.message, 422));
  }

  if (!hashedPassword) {
    return next(new AppError("Failed to encrypt password", 500));
  }

  const token = jwt.sign({ email: req.body.email }, process.env.JWT_SECRET);

  const user = await User.create({
    firstName: firstName,
    lastName: lastName,
    email: email,
    password: hashedPassword,
    rights: rights,
    confirmationCode: token,
  });

  if (!user) {
    return next(new AppError("Failed to create user", 401));
  }
  const result = await user.save();

  if (!result) {
    return next(new AppError("Failed to save user", 401));
  }

  res.status(201).json({
    message: "User signed up successfully",
    userId: result._id.toString(),
  });

  sendConfirmationEmail(user.firstName, user.email, user.confirmationCode);
};

const loginFunc = async (req, res, next) => {
  const email = req.body.email;
  const password = req.body.password;

  let loadedUser;

  const user = await User.findOne({ email: email });
  if (!user) {
    return next(new AppError("No user found with this email", 401));
  }
  loadedUser = user;
  if (user.status !== "Active") {
    return next(new Error("Pending Account. Please Verify Your Email!", 401));
  }
  const isEqual = await bcrypt.compare(password, user.password);
  if (!isEqual) {
    return next(new AppError("Wrong password provided", 401));
  }

  const token = jwt.sign(
    { userId: loadedUser._id.toString() },
    process.env.JWT_SECRET,
    { expiresIn: "1hr" }
  );

  res.status(200).json({
    token: token,
    userId: loadedUser._id.toString(),
    expiresIn: new Date().setMilliseconds(3600000),
  });
};

const confirmUserFunc = async (req, res, next) => {
  const user = await User.findOne({
    confirmationCode: req.params.confirmationCode,
  });

  if (!user) {
    return next(new AppError("User Not found.", 401));
  }

  user.status = "Active";

  const result = await user.save();

  if (!result) {
    return next(new AppError(result.message, 401));
  } else {
    return res
      .status(200)
      .set("Content-Type", "text/html")
      .send(
        `<h1>${user.firstName}, you have successfully been signed up. You can now go back and login</h1>`
      );
  }
};

exports.signup = errorWrapper(signupFunc);

exports.login = errorWrapper(loginFunc);

exports.confirmUser = errorWrapper(confirmUserFunc);
