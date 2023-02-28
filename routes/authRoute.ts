const express = require("express");

const authController = require("../controllers/authController");

const router = express.Router();

router.post("/signup", authController.signup);

router.post("/login", authController.login);

router.get("/confirm/:confirmationCode", authController.confirmUser);

module.exports = router;
