const express = require("express");
const router = express.Router();
const { getMovies } = require("../controllers/moviesController");
const { getGenres } = require("../controllers/genresController");

router.get("/", getMovies);
router.get("/genres", getGenres);

module.exports = router;
