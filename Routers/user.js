const express = require("express");
const { getAllUsers, getUser, createUser, deleteUser, updateUser } = require("../Controllers/UserController");
const { userValidator, validate } = require('../Validators/userValidator')
const router = express.Router();
const { authenticateJWT } = require("../Middlewares/auth");
router.get("/", authenticateJWT, getAllUsers);
router.get("/:id", authenticateJWT, getUser);
router.post("/", authenticateJWT, userValidator(), validate, createUser);
router.put("/:id", authenticateJWT, userValidator(), validate, updateUser);
router.delete("/:id", authenticateJWT, deleteUser);
module.exports = {
    routes: router
};

