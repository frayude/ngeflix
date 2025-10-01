export async function fetchHeroMovies() {
  try {
    const response = await fetch("http://localhost:3000/movies");
    // const response = await fetch("api/movies");

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
    const response = await fetch("http://localhost:3000/genres");

    // const response = await fetch("api/movies/genres");

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error("Fetch genre error", error);
    return {}; // Jika gagal, kembalikan objek kosong
  }
}

export async function fetchMovieTrailer(movieId) {
  try {
    const response = await fetch(
      `http://localhost:3000/movieTrailer/${movieId}`
    );

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error("Fetch trailer error", error);
    return {};
  }
}

export async function fetchPopularMovies() {
  try {
    const response = await fetch("http://localhost:3000/popularMovies");

    if (!response.ok) {
      throw new Error(`HTTP error! Status : ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error("Fetch trailer error", error);
    return {};
  }
}

export async function fetchTopRatedMovies() {
  try {
    const response = await fetch("http://localhost:3000/topRatedMovies");

    if (!response.ok) {
      throw new Error(`HTTP error! Status : ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error("Fetch trailer error", error);
    return {};
  }
}
