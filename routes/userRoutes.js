const express = require("express");
const { createUser, loginUser, getCurrentUser, deleteUser, updateUser, getUserById } = require("../controller/userController");
const isAuth = require("../middlewares/isAuth");

const router = express.Router();

router.post("/register", createUser);

router.post("/login", loginUser);

router.get("/profile", isAuth, getCurrentUser);

router.delete("/", isAuth, deleteUser);

router.put("/", isAuth, updateUser);

router.get("/:id", getUserById)

module.exports = router;
