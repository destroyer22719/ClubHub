const express = require("express");
const { createClub, getClubById } = require("../controller/clubController");
const isAuth = require("../middlewares/isAuth");

const router = express.Router();

router.post("/create", isAuth, createClub);

router.get("/:id", getClubById);

// router.put("/:id/join")

module.exports = router;
