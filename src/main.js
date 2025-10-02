import "./styles/main.css";
import "./styles/responsive.css";
import {
  fetchHeroMovies,
  fetchMovieGenres,
  fetchPopularMovies,
  fetchTopRatedMovies,
  fetchNewMoviesThisMonth,
} from "./api.js";
import {
  getPopularMovies,
  handleArrowClick,
  updateHero,
  getTopRatedMovies,
  getNewMoviesThisMonth,
} from "./ui.js";

document.addEventListener("DOMContentLoaded", () => {
  init();
});

async function init() {
  try {
    const dataHeroMovies = await fetchHeroMovies();
    const movieGenres = await fetchMovieGenres();
    const popularMovies = await fetchPopularMovies();
    const topRatedMovies = await fetchTopRatedMovies();
    const newMoviesThisMonth = await fetchNewMoviesThisMonth();

    // film di mulai dari index 0
    updateHero(dataHeroMovies, movieGenres);
    handleArrowClick();
    getPopularMovies(popularMovies);
    getTopRatedMovies(topRatedMovies);
    getNewMoviesThisMonth(newMoviesThisMonth);
  } catch (error) {
    console.error("Initialization failed:", error);
  }
}
