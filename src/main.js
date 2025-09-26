import "./style.css";
import {
  fetchHeroMovies,
  fetchMovieGenres,
  fetchPopularMovies,
} from "./api.js";
import { getPopularMovies, handleArrowClick, updateHero } from "./ui.js";

document.addEventListener("DOMContentLoaded", () => {
  init();
});

async function init() {
  try {
    const dataHeroMovies = await fetchHeroMovies();
    const movieGenres = await fetchMovieGenres();
    const popularMovies = await fetchPopularMovies();

    // film di mulai dari index 0
    updateHero(dataHeroMovies, movieGenres);
    handleArrowClick();
    getPopularMovies(popularMovies);
  } catch (error) {
    console.error("Initialization failed:", error);
  }
}
