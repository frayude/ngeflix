import { Router } from "express";
import getMovies from "../controllers/moviesController.js";
import getGenres from "../controllers/genresController.js";
import getMovieTrailer from "../controllers/movieTrailerController.js";
import getPopularMovies from "../controllers/popularMoviesController.js";
import getTopRatedMovies from "../controllers/topRatedMoviesController.js";

const router = Router();

router.get("/movies", getMovies);
router.get("/genres", getGenres);
router.get("/movieTrailer/:id", getMovieTrailer);
router.get("/popularMovies", getPopularMovies);
router.get("/topRatedMovies", getTopRatedMovies);

export default router;
