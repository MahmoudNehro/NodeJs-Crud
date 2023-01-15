const express = require("express");
const { getAllUsers, getUser, createUser, deleteUser, updateUser } = require("../Controllers/UserController");
const router = express.Router();
router.get("/", getAllUsers);
router.get("/:id", getUser);
router.post("/", createUser);
router.put("/:id", updateUser);
router.delete("/:id", deleteUser);
module.exports = {
    routes: router
};

