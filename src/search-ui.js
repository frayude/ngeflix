const searchInput = document.querySelector(".search-input");
const searchIcon = document.querySelector(".search-icon");

export function getSearch(movies) {
  // Ambil input dari user ketika ia search
  const query = searchInput.value.trim();

  searchIcon.addEventListener("click", (e) => {
    e.preventDefault();
    window.location.href = "/search.html";

    const updateNewMoviesThisMonthCard = movies
      .map((movie) => {
        const voteAverage = formatRating(movie.vote_average);
        const { fullDate } = formatReleaseDate(movie);

        return `
          <div class="new-movies-this-month-cards-wrapper">
          <div class="new-movies-this-month-card">
            <div class="new-movies-this-month-poster-card">
              <div class="new-movies-this-month-poster" style="background-image:url(${imageUrl}${movie.poster_path}")>
                <span class="new-movies-this-month-rating">${voteAverage} <i class="fa-solid fa-star"></i></span>
              </div>
            </div>

            <div class="new-movies-this-month-info">
              <span class="new-movies-this-month-name">${movie.title}</span>
              <span class="new-movies-this-month-release-date">${fullDate}</span>
            </div>
          </div>
        </div>
      `;
      })
      .join("");
  });
}
