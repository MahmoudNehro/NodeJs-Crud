const express = require("express");
const { getAllUsers, getUser, createUser, deleteUser, updateUser } = require("../Controllers/UserController");
const { userValidator, validate } = require('../Validators/userValidator')
const router = express.Router();
router.get("/", getAllUsers);
router.get("/:id", getUser);
router.post("/", userValidator(), validate, createUser);
router.put("/:id", userValidator(), validate, updateUser);
router.delete("/:id", deleteUser);
module.exports = {
    routes: router
};

