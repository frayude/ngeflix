import "./styles/main.css";
import "./styles/responsive.css";

import { fetchMovieGenres, fetchSearch } from "./api.js";
import { getSearch } from "./search-ui.js";

document.addEventListener("DOMContentLoaded", () => {
  init();
});

async function init() {
  try {
    const movieGenres = await fetchMovieGenres();
    const search = await fetchSearch();

    getSearch(search);
  } catch (error) {
    console.error("Initialization failed:", error);
  }
}
