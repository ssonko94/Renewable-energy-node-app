const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const { validationResult } = require("express-validator");
const User = require("../models/user");

exports.signup = async (req, res, next) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty) {
      return res.status(422).json({
        message: "Validation, failed entered data is incorrect",
        errors: errors.array(),
      });
    }

    const firstName = req.body.firstName;
    const lastName = req.body.lastName;
    const email = req.body.email;
    const password = req.body.password;
    const rights = req.body.rights;
    const hashedPassword = await bcrypt.hash(password, 12);
    const user = new User({
      firstName: firstName,
      lastName: lastName,
      email: email,
      password: hashedPassword,
      rights: rights,
    });
    const result = await user.save();
    res.status(201).json({
      message: "User signed up successfully",
      userId: result._id.toString(),
    });
  } catch (error) {
    if (!error.statusCode) {
      error.statusCode = 500;
    }
    next(error);
  }
};

exports.login = async (req, res, next) => {
  try {
    const email = req.body.email;
    const password = req.body.password;

    let loadedUser;

    const user = await User.findOne({ email: email });
    if (!user) {
      const error = new Error("No user found with this email");
      error.statusCode = 401;
      throw error;
    }
    loadedUser = user;
    const isEqual = await bcrypt.compare(password, user.password);
    if (!isEqual) {
      const error = new Error("Wrong password provided");
      error.statusCode = 401;
      throw error;
    }

    const token = jwt.sign(
      { email: loadedUser.email, userId: loadedUser._id.toString() },
      "someofthebiggestmostsecuretokensyouwillfindontheinternet",
      { expiresIn: "1hr" }
    );

    res.status(200).json({ token: token, userId: loadedUser._id.toString() });
  } catch (error) {
    if (!error.statusCode) {
      error.statusCode = 500;
    }
    next(error);
  }
};
