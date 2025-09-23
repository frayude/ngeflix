const imageUrl = "https://image.tmdb.org/t/p/original/"; // Base URL buat gambar
const heroSection = document.querySelector(".hero");
const movieTitle = document.querySelector(".movie-title");
const movieSummary = document.querySelector(".movie-summary");
const movieGenre = document.querySelector(".movie-genre");
const releaseDate = document.querySelector(".movie-release-date");
const heroArrows = document.querySelector(".hero-arrows");
const movieRating = document.querySelector(".movie-rating");
const paginationBar = document.querySelector(".pagination-bar");
const trailerBtn = document.querySelector(".trailer-btn");
import { fetchMovieTrailer } from "./api.js";

let currentIndex = 0; // Buat nyimpen index sekarang
let moviesData = [];
let movieGenres = [];

export function updateHero(movies, genres) {
  moviesData = movies;
  movieGenres = genres;

  const currentMovie = moviesData[currentIndex];

  updateMovieDetail(currentMovie);
  totalDataMethod(movies);
  getTrailerMovieKey(currentMovie);
}

// Update Detail Movie
function updateMovieDetail(movie) {
  // memanggil moviereleaseadate menggunakan destructuring dari function changereleasedate
  const { movieReleaseDate } = formatReleaseDate(movie);

  // memanggil function yang berisi data-data genre
  const genreNames = mapGenresToNames(movieGenres, movie.genre_ids);

  const voteAverage = formatRating(movie.vote_average);

  // change bg agar sesuai dengan data nya
  heroSection.style.backgroundImage = `url(${imageUrl}${movie.backdrop_path})`;

  movieTitle.textContent = movie.title;
  movieSummary.textContent = movie.overview;
  movieGenre.innerHTML = genreNames;
  releaseDate.textContent = movieReleaseDate;
  movieRating.innerHTML = `<span class="rating-value">${voteAverage} <i class="fa-solid fa-star"></i></span>
  `;
}

function totalDataMethod(params) {
  paginationBar.innerHTML = "";

  params.forEach((_, i) => {
    const paginationStep = document.createElement("div");
    paginationStep.className = `pagination-step`;

    if (i === 0) {
      paginationStep.classList.add("active");
    }

    paginationBar.appendChild(paginationStep);
  });
}

// data kosong dibuat null agar bisa digunakan ditempat lain atau line 72
let currentTrailerMovieKey = null;

// ambil trailer movie key dari id
async function getTrailerMovieKey(movie) {
  // ambil trailer movie key dari id
  const movieTrailers = await fetchMovieTrailer(movie.id);

  // data hasil dari filter movie
  currentTrailerMovieKey = filterMovieTrailer(movieTrailers);
}

function filterMovieTrailer(movieTrailers) {
  const found = movieTrailers
    .filter((item) => item.site === "YouTube")
    .filter((item) => item.type === "Trailer")
    .find((item) => item.key);

  // Ketika tidak ditemukan maka kembalikan null/data tidak ada
  return found ? found.key : null;
}

trailerBtn.addEventListener("click", () => {
  if (!currentTrailerMovieKey) {
    alert("Trailer belum ada🥺");
    return;
  }

  // ketika button di klik maka akan menampilkan sesuai dengan yg sedang ditampilkan
  window.open(
    `https://www.youtube.com/watch?v=${currentTrailerMovieKey}`,
    "_blank"
  );
});

// Ratings
function formatRating(voteAverage) {
  // Membulatkan data menjadi bulat
  const formattedRatings = Number(voteAverage).toFixed(1);
  return formattedRatings;
}

// Get year rn
function formatReleaseDate(data) {
  let movieReleaseDate = new Date(data.release_date);

  // Ambil bagian tanggal, bulan (pakai nama singkatan), dan tahun
  let day = movieReleaseDate.getDate();
  let month = movieReleaseDate.toLocaleString("en-US", { month: "short" });
  let year = movieReleaseDate.getFullYear();

  // Menggabungkan dan mengganti format dari release date
  // Menggunakan return agar data bisa digunakan kembali
  return { movieReleaseDate: `${day} ${month} ${year}` };
}

// Event listener buat arrow click
export function handleArrowClick() {
  heroArrows.addEventListener("click", (e) => {
    if (e.target.classList.contains("fa-chevron-right")) {
      currentIndex = (currentIndex + 1) % moviesData.length;
    } else if (e.target.classList.contains("fa-chevron-left")) {
      currentIndex = (currentIndex - 1 + moviesData.length) % moviesData.length;
    }

    updateHero(moviesData, movieGenres); // Update pagination-step aktif

    const steps = document.querySelectorAll(".pagination-step");
    steps.forEach((step) => step.classList.remove("active")); // reset semua

    steps[currentIndex].classList.add("active"); // set step baru aktif
  });
}

// Function buat mapping genre id ke nama genre
function mapGenresToNames(genresData, genreIds) {
  // Data menjadi berpasangan, key & value
  const genreMap = Object.fromEntries(
    genresData.map(({ id, name }) => [id, name])
  );

  // Data menjadi berpasangan, key & value
  // const genreMap = genresData.reduce((acc, genre) => {
  //   if (genre.id && genre.name) {
  //     acc[genre.id] = genre.name;
  //   }
  //   return acc;
  // }, {});

  // Mapping, agar genreIds menyesuaikan dengan id genreMap
  return genreIds
    .map(
      (id) => `<span class="genre-badge">${genreMap[id] || "Unknown"}</span>`
    )
    .join(", ");
}
