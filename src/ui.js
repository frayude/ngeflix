import { createElement } from "react";
import { fetchMovieTrailer } from "./api.js";
const imageUrl = "https://image.tmdb.org/t/p/original/"; // Base URL buat gambar
const heroSection = document.querySelector(".hero");
const heroMovieTitle = document.querySelector(".hero-movie-title");
const heroMovieSummary = document.querySelector(".hero-movie-summary");
const heroMovieGenre = document.querySelector(".hero-movie-genre");
const heroMovieReleaseDate = document.querySelector(".hero-movie-release-date");
const heroArrows = document.querySelector(".hero-arrows");
const heroMovieRating = document.querySelector(".hero-movie-rating");
const paginationBar = document.querySelector(".pagination-bar");
const trailerBtn = document.querySelector(".trailer-btn");
const popularMovies = document.querySelector(".popular-movies");
const popularMovieCard = document.querySelector(".popular-movie-card");
const popularMoviePoster = document.querySelector(".popular-movie-poster");
const popularMovieRating = document.querySelector(".popular-movie-rating");
const popularMovieName = document.querySelector(".popular-movie-name");
const popularMovieReleaseDate = document.querySelector(
  ".popular-movie-release-date"
);

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
  // memanggil moviereleaseadate menggunakan destructuring dari function change releasedate
  const { fullDate } = formatReleaseDate(movie);

  // memanggil function yang berisi data-data genre
  const genreNames = mapGenresToNames(movieGenres, movie.genre_ids);

  const voteAverage = formatRating(movie.vote_average);

  // change bg agar sesuai dengan data nya
  heroSection.style.backgroundImage = `url(${imageUrl}${movie.backdrop_path})`;

  heroMovieTitle.textContent = movie.title;
  heroMovieSummary.textContent = movie.overview;
  heroMovieGenre.innerHTML = genreNames;
  heroMovieReleaseDate.textContent = fullDate;
  heroMovieRating.innerHTML = `<span class="rhero-ating-value">${voteAverage} <i class="fa-solid fa-star"></i></span>
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
function formatReleaseDate(movie) {
  let movieReleaseDate = new Date(movie.release_date);

  // Ambil bagian tanggal, bulan (pakai nama singkatan), dan tahun
  let day = movieReleaseDate.getDate();
  let month = movieReleaseDate.toLocaleString("en-US", { month: "short" });
  let year = movieReleaseDate.getFullYear();

  // Menggabungkan dan mengganti format dari release date
  // Menggunakan return agar data bisa digunakan kembali
  const fullDate = `${day} ${month} ${year}`;

  return { fullDate, day, month, year };
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

export function getPopularMovies(movies) {
  const updatePopularMovieCard = movies
    .map((movie) => {
      const voteAverage = formatRating(movie.vote_average);
      const { year } = formatReleaseDate(movie);

      return `<div class="popular-movie-card">
      <div class="popular-movie-poster-card">
        <div class="popular-movie-poster" style="background-image:url(${imageUrl}${movie.poster_path})"> 
        <span class="popular-movie-rating">${voteAverage} <i class="fa-solid fa-star"></i></span>
        </div>
      </div>

      <div class="popular-movie-info">
        <span class="popular-movie-name">${movie.title}</span>
        <span class="popular-movie-release-date">${year}</span>
      </div>
    </div>`;
    })
    .join("");

  // let variabelKosong = "";
  // movies.forEach((movie) => {
  //   const voteAverage = formatRating(movies.vote_average);
  //   const { movieReleaseDate } = formatReleaseDate(movies);

  //   variabelKosong += `

  //   <div class="popular-movie-card">
  //     <div class="popular-movie-poster-card">
  //       <div class="popular-movie-poster" style="background-image:url(${imageUrl}${movie.poster_path})">
  //       <span class="popular-movie-rating">${voteAverage}</span>
  //       </div>
  //     </div>

  //     <div class="popular-movie-info">
  //       <span class="popular-movie-name">${movie.title}</span>
  //       <span class="popular-movie-release-date">${movieReleaseDate}</span>
  //     </div>
  //   </div>`;
  // });

  popularMovieCard.innerHTML = updatePopularMovieCard;
}
