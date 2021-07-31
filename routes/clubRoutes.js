const express = require("express");
const { createClub, getClubById, getAllClubs, joinClub } = require("../controller/clubController");
const isAuth = require("../middlewares/isAuth");

const router = express.Router();

router.post("/create", isAuth, createClub);

router.get("/:id", getClubById);

router.put("/:id/join", isAuth, joinClub)

router.get("/", getAllClubs);

module.exports = router;
