const express = require("express");

const authController = require("../controllers/authController");

const router = express.Router();

router.post("/api/auth/signup", authController.signup);

router.post("/api/auth/login", authController.login);

router.get("/api/auth/confirm/:confirmationCode", authController.confirmUser);

module.exports = router;
