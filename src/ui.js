const imageUrl = "https://image.tmdb.org/t/p/original/"; // Base URL buat gambar
const heroSection = document.querySelector(".hero");
const movieTitle = document.querySelector(".movie-title");
const movieSummary = document.querySelector(".movie-summary");
const movieGenre = document.querySelector(".movie-genre");
const releaseDate = document.querySelector(".movie-release-date");
const heroArrows = document.querySelector(".hero-arrows");
const movieRating = document.querySelector(".movie-rating");
const paginationBar = document.querySelector(".pagination-bar");

let currentIndex = 0; // Buat nyimpen index sekarang
let moviesData = [];
let movieGenres = [];

export function updateHero(movies, genres) {
  moviesData = movies;
  movieGenres = genres;

  const movieIndex = moviesData[currentIndex];

  updateMovieDetail(movieIndex);
  totalDataMethod(movies);
}

// Update Detail Movie
function updateMovieDetail(movieIndex) {
  // memanggil moviereleaseadate menggunakan destructuring dari function changereleasedate
  const { movieReleaseDate } = formatReleaseDate(movieIndex);

  // memanggil function yang berisi data-data genre
  const genreNames = mapGenresToNames(movieGenres, movieIndex.genre_ids);

  const voteAverage = formatRating(movieIndex.vote_average);

  // change bg agar sesuai dengan data nya
  heroSection.style.backgroundImage = `url(${imageUrl}${movieIndex.backdrop_path})`;

  movieTitle.textContent = movieIndex.title;
  movieSummary.textContent = movieIndex.overview;
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
