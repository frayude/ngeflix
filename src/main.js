import "./styles/main.css";
import "./styles/responsive.css";

import {
  fetchHeroMovies,
  fetchMovieGenres,
  fetchPopularMovies,
  fetchTopRatedMovies,
  fetchNewMoviesThisMonth,
  fetchSearch,
} from "./api.js";
import {
  getPopularMovies,
  handleArrowClick,
  updateHero,
  getTopRatedMovies,
  getNewMoviesThisMonth,
  getSearch,
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
    const search = await fetchSearch();

    // film di mulai dari index 0
    updateHero(dataHeroMovies, movieGenres);
    handleArrowClick();
    getPopularMovies(popularMovies);
    getTopRatedMovies(topRatedMovies);
    getNewMoviesThisMonth(newMoviesThisMonth);
    getSearch(search);
  } catch (error) {
    console.error("Initialization failed:", error);
  }
}
