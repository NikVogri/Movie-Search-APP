let searchKey = "95024015";
document.addEventListener('DOMContentLoaded', function () {
    displayMovie();
}, false);



function displayMovie() {
    let id = sessionStorage.getItem("movieId");
    axios
        .get(`http://www.omdbapi.com/?i=${id}&apikey=${searchKey}`)
        .then(res => {
            let data = res.data;
            let markup = "";
            markup = `<div class="movie__wrapper"> 
  <img src="${data.Poster}" alt="main image" class="header__image">
  <div class="about-movie">
          <h1 class="main__name">
                  ${data.Title}</h1>
      <p><span>Genre:</span>${data.Genre}</p>
      <p><span>Release:</span>${data.Released}</p>
      <p><span>Rated:</span>${data.Rated}</p>
      <p><span>Director:</span>${data.Director}</p>
      <p><span>Writer:</span>${data.Writer}</p>
      <p><span>Actors:</span>${data.Actors}</p>
      <p class="plot__text"><span class="plot__span">Plot:</span>${data.Plot}</p>
      <div class="imdb__rating">
              <p class="imdb__rating-text">${data.Ratings[0].Value}</p>
                  <a href="http://www.imdb.com/title/${data.imdbID}"><img src="img/IMDB_Logo_2016.svg" alt="imdb logo" class="imdb__rating-logo"></a>
          </div>
  </div>
</div>`
            document.querySelector(".main").innerHTML = markup;
        }).catch(err => {
            alert(err);
        });
};