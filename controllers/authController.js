const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { createError } = require("../utils/error");
const { signUpValidator } = require("../utils/signupSchema");

const User = require("../models/user");

exports.signup = async (req, res) => {
  const value = await signupSchema.validateAsync(req.body);
  console.log(value);

  const firstName = req.body.firstName;
  const lastName = req.body.lastName;
  const email = req.body.email;
  const password = req.body.password;
  const rights = req.body.rights;
  const hashedPassword = await bcrypt.hash(password, 12);

  const { error } = await signUpValidator(req.body);

  if (error) {
    console.log(error);
  }

  if (!hashedPassword) {
    const error = createError({
      error: "Failed to encrypt password",
      message: "Failed to encrypt password",
      code: 500,
      type: "application error",
    });
    throw error;
  }

  const user = User.create({
    firstName: firstName,
    lastName: lastName,
    email: email,
    password: hashedPassword,

    rights: rights,
  });

  if (!user) {
    const error = createError({
      error: "Failed to create user",
      message: "Failed to create user",
      code: 401,
      type: "database error",
    });
    throw error;
  }
  const result = await user.save();

  if (!result) {
    const error = createError({
      error: "Failed to save user",
      message: "Failed to save user",
      code: 401,
      type: "database error",
    });
    throw error;
  }

  res.status(201).json({
    message: "User signed up successfully",
    userId: result._id.toString(),
  });
};

exports.login = async (req, res) => {
  const email = req.body.email;
  const password = req.body.password;

  let loadedUser;

  const user = await User.findOne({ email: email });
  if (!user) {
    const error = createError({
      error: "No user found with this email",
      message: "No user found with this email",
      code: 401,
      type: "database error",
    });
    throw error;
  }
  loadedUser = user;
  const isEqual = await bcrypt.compare(password, user.password);
  if (!isEqual) {
    const error = createError({
      error: "Wrong password provided",
      message: "Wrong password provided",
      code: 401,
      type: "application error",
    });
    throw error;
  }

  const token = jwt.sign(
    { email: loadedUser.email, userId: loadedUser._id.toString() },
    "someofthebiggestmostsecuretokensyouwillfindontheinternet",
    { expiresIn: "1hr" }
  );

  res.status(200).json({ token: token, userId: loadedUser._id.toString() });
};
