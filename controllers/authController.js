const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const errorWrapper = require("../utils/errorWrapper");
const AppError = require("../utils/baseError");
const signUpValidator = require("../utils/signupSchema");

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
    next(new AppError(error.message, 422));
  }

  if (!hashedPassword) {
    next(new AppError("Failed to encrypt password", 500));
  }

  const user = User.create({
    firstName: firstName,
    lastName: lastName,
    email: email,
    password: hashedPassword,
    rights: rights,
  });

  if (!user) {
    next(new AppError("Failed to create user", 401));
  }
  const result = await user.save();

  if (!result) {
    next(new AppError("Failed to save user", 401));
  }

  res.status(201).json({
    message: "User signed up successfully",
    userId: result._id.toString(),
  });
};

const loginFunc = async (req, res, next) => {
  const email = req.body.email;
  const password = req.body.password;

  let loadedUser;

  const user = await User.findOne({ email: email });
  if (!user) {
    next(new AppError("No user found with this email", 401));
  }
  loadedUser = user;
  const isEqual = await bcrypt.compare(password, user.password);
  if (!isEqual) {
    next(new AppError("Wrong password provided", 401));
  }

  const token = jwt.sign(
    { email: loadedUser.email, userId: loadedUser._id.toString() },
    "someofthebiggestmostsecuretokensyouwillfindontheinternet",
    { expiresIn: "1hr" }
  );

  res.status(200).json({ token: token, userId: loadedUser._id.toString() });
};

exports.signup = errorWrapper(signupFunc);

exports.login = errorWrapper(loginFunc);
