const express = require("express");
const { clientSideErrorHandler } = require("../utils/error");

const User = require("../models/user");

const authController = require("../controllers/auth");

const router = express.Router();

router.post("/api/auth/signup", clientSideErrorHandler, authController.signup);

router.post("/api/auth/login", authController.login);

module.exports = router;
