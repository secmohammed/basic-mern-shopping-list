const express = require("express");
const router = express.Router();
const AuthController = require("../../controllers/AuthController");
const auth = require('../../middleware/auth')

router.post("/login", AuthController.login);
router.post("/register", AuthController.register);
router.get("/user", auth, AuthController.me);

module.exports = router;
