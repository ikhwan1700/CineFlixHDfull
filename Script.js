fetch('data.json')
  .then(res => res.json())
  .then(data => {
    const list = document.getElementById('movie-list');
    const search = document.getElementById('search');

    const renderMovies = (movies) => {
      list.innerHTML = '';
      movies.forEach(movie => {
        list.innerHTML += `
          <div class="movie">
            <img src="${movie.thumbnail}" alt="${movie.title}" />
            <h4>${movie.title}</h4>
            <p>${movie.year}</p>
            <a href="${movie.link}" target="_blank">Tonton</a>
          </div>
        `;
      });
    };

    renderMovies(data);

    search.addEventListener('input', () => {
      const filtered = data.filter(m => m.title.toLowerCase().includes(search.value.toLowerCase()));
      renderMovies(filtered);
    });
  });
