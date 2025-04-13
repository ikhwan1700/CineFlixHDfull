
document.addEventListener("DOMContentLoaded", function () {
  const movieList = document.getElementById("movieList");
  const searchInput = document.getElementById("searchInput");
  const genreFilter = document.getElementById("genreFilter");

  fetch("embed.json")
    .then((res) => res.json())
    .then((data) => {
      function renderMovies(filterText = "", genre = "all") {
        movieList.innerHTML = "";
        data.forEach((movie) => {
          const lowerTitle = movie.title.toLowerCase();
          if (
            lowerTitle.includes(filterText.toLowerCase()) &&
            (genre === "all" || movie.genre === genre)
          ) {
            const card = document.createElement("div");
            card.className = "movie-card";
            card.innerHTML = `
              <iframe src="${movie.embed}" frameborder="0" allowfullscreen></iframe>
              <h2>${movie.title}</h2>
              <p>${movie.genre}</p>
            `;
            movieList.appendChild(card);
          }
        });
      }

      renderMovies();

      searchInput.addEventListener("input", () => {
        renderMovies(searchInput.value, genreFilter.value);
      });

      genreFilter.addEventListener("change", () => {
        renderMovies(searchInput.value, genreFilter.value);
      });
    });
});
