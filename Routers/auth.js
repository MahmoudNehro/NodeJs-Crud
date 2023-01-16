const express = require("express");
const router = express.Router();
const { login, register } = require('../Controllers/AuthController');
const { userValidator, validate } = require('../Validators/userValidator');
const { loginValidator, validateLogin } = require("../Validators/loginValidator");
router.post('/register', userValidator(), validate, register);
router.post('/login',loginValidator(),validateLogin, login);
module.exports = {
    routes: router
};

