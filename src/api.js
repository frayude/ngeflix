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

// export async function fetchMoviesTrailer(movieId) {
//   try {
//     const response = await fetch(`api/movies/${movieId}/trailer`);

//     if (!response.ok) {
//       throw new Error(`HTTP error! Status: ${response.status}`);
//     }

//     return await response.json();
//   } catch (error) {
//     console.error("Fetch trailer error,", error);
//     return {};
//   }
// }
