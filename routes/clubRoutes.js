const express = require("express");
const { createClub, getClubById, getAllClubs } = require("../controller/clubController");
const isAuth = require("../middlewares/isAuth");

const router = express.Router();

router.post("/create", isAuth, createClub);

router.get("/:id", getClubById);

router.get("/", getAllClubs)
// router.put("/:id/join")

module.exports = router;
