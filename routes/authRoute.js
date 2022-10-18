const express = require("express");

const authController = require("../controllers/authController");

const { errorWrapper } = require("../utils/error");

const router = express.Router();

router.post("/api/auth/signup", errorWrapper(authController.signup));

router.post("/api/auth/login", errorWrapper(authController.login));

module.exports = router;
