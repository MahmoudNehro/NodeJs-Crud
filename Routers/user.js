const express = require("express");
const { getAllUsers, getUser, createUser, deleteUser, updateUser } = require("../Controllers/UserController");
const { userValidator, validate } = require('../Validators/userValidator')
const router = express.Router();
const { authenticateJWT } = require("../Middlewares/auth");
const { admin } = require("../Middlewares/admin");
const { sameUser } = require("../Middlewares/sameUser");
const { deleteApility } = require("../Middlewares/deleteApility");
router.get("/", authenticateJWT, admin, getAllUsers);
router.get("/:id", authenticateJWT, sameUser, getUser);
router.post("/", authenticateJWT, admin, userValidator(), validate, createUser);
router.put("/:id", authenticateJWT, sameUser, userValidator(), validate, updateUser);
router.delete("/:id", authenticateJWT, admin, deleteApility, deleteUser);
module.exports = {
    routes: router
};

