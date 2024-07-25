const express = require('express');
const authMiddleware = require('../middlewares/auth-middleware');
const authControllers = require("../controllers/auth_controllers");
const { signupSchema, loginSchema } = require("../validators/auth-validator");
const validate = require("../middlewares/validate-middlewares");

const router = express.Router();

router.route("/register")
      .post(validate(signupSchema), authControllers.register);

router.route("/login")
      .post(validate(loginSchema), authControllers.login);

router.route("/user")
      .get(authMiddleware, authControllers.user);

module.exports = router;
