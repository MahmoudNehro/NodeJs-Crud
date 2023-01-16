const express = require("express");
const router = express.Router();
const { login, register } = require('../Controllers/AuthController');
const { userValidator, validate } = require('../Validators/userValidator')
router.post('/register', userValidator(), validate, register);
router.post('/login', login);
module.exports = {
    routes: router
};

