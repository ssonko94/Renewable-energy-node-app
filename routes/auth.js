const express = require("express");
const { body } = require("express-validator");

const User = require("../models/user");

const authController = require("../controllers/auth");

const router = express.Router();

router.post(
  "/api/auth/signup",
  [
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
  ],
  authController.signup
);

router.post("/api/auth/login", authController.login);

module.exports = router;
