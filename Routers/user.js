const express = require("express");
const { body, validationResult  } = require("express-validator");
const { getAllUsers, getUser, createUser, deleteUser, updateUser } = require("../Controllers/UserController");

const router = express.Router();
router.get("/users", getAllUsers);
router.get("/users/:id", getUser);
router.post("/users", [
    body('name').isEmail(),

], createUser);
router.put("/users/:id", updateUser);
router.delete("/users/:id", deleteUser);

module.exports = {
    routes: router
};

