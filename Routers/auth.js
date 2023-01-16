const express = require("express");
const router = express.Router();
const { login, register } = require('../Controllers/AuthController');
const { registerValidator, validate } = require('../Validators/registerValidator');
router.post('/register', registerValidator(), validate, register);
router.post('/login', login);
module.exports = {
    routes: router
};

