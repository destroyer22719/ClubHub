const express = require("express");
const { createUser, loginUser, getCurrentUser } = require("../controller/userController");
const isAuth = require("../middlewares/isAuth");

const router = express.Router();

router.post("/register", createUser);

router.post("/login", loginUser);

router.get("/current", isAuth, getCurrentUser)

module.exports = router;
