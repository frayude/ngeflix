// Buat Production
const API_BASE_URL = import.meta.env.VITE_API_URL;

export async function fetchHeroMovies() {
  try {
    const response = await fetch("api/movies");

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    return await response.json(); // Melempar ke main.js
  } catch (error) {
    console.error("Error fetching movies:", error);
    throw error;
  }
}

export async function fetchMovieGenres() {
  try {
    const response = await fetch("api/movies/genres");

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error("Fetch genre error", error);
    return {}; // Jika gagal, kembalikan objek kosong
  }
}
