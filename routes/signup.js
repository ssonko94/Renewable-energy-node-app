const express = require("express");

const signupController = require("../controllers/signup");

const router = express.Router();

router.post("/api/signup", signupController.postSignup);

module.exports = router;
