const express = require("express");
const { body } = require("express-validator");

const signupController = require("../controllers/signup");

const router = express.Router();

router.post(
  "/api/signup",
  [body("username").trim().isLength({ min: 5 })],
  signupController.postSignup
);

module.exports = router;
