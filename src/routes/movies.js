import { Router } from "express";
import getMovies from "../controllers/moviesController.js";
import getGenres from "../controllers/genresController.js";
import getMovieTrailer from "../controllers/movieTrailerController.js";

const router = Router();

router.get("/movies", getMovies);
router.get("/genres", getGenres);
router.get("/movieTrailer/:id", getMovieTrailer);

export default router;
