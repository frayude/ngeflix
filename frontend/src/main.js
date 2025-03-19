import "./style.css";
import { fetchHeroMovies, fetchMovieGenres } from "./api.js";
import { handleArrowClick, updateHero } from "./ui.js";

document.addEventListener("DOMContentLoaded", () => {
  init();
});

async function init() {
  try {
    const dataHeroMovies = await fetchHeroMovies();
    const movieGenres = await fetchMovieGenres();

    // film di mulai dari index 0
    updateHero(dataHeroMovies, movieGenres);
    handleArrowClick();
  } catch (error) {
    console.error("Initialization failed:", error);
  }
}
