import { Router } from "express";
const router = Router();
import getMovies from "../controllers/moviesController.js";
import getGenres from "../controllers/genresController.js";

router.get("/movies", getMovies);
router.get("/genres", getGenres);

export default router;
