let clicked = false;
let movie;
let searchKey;
document.querySelector(".form__img").addEventListener("click", e => {
  clicked = true;
  renderMovie(e);
});
document.addEventListener("keypress", e => renderMovie(e));
let movieId;
String.prototype.trunc = function (n) {
  return this.substr(0, n - 1) + (this.length > n ? "&hellip;" : "");
};


let renderMovie = e => {
  let key = e.which || e.keyCode;
  if (key === 13 || clicked === true) {
    e.preventDefault();
    const movieName = document.querySelector("#getName").value;
    searchKey = "95024015";
    axios
      .get(`http://www.omdbapi.com/?s=${movieName}&apikey=${searchKey}`)
      .then(res => {
        console.log(res);
        movie = res.data.Search;
        let markup = "";

        movie.forEach(el => {
          markup += `<!-- box -->
                <div class="box">
                <img src="${el.Poster}) onclick='movieSel("${el.imdbID}")'"
                }}" alt="${el.Title}">
                <h2>${el.Title.trunc(15)}</h2>
                <div class="box__info-small">
                    <p>${el.Year}</p>
                    <a href="https://www.imdb.com/title/${
                      el.imdbID
                    }"><img src="img/IMDB_Logo_2016.svg" alt="imdb logo"></a>
                    <button onclick='movieSel("${el.imdbID}")' class="Btn-more">More</button>
                </div>
                </div>`;
        });

        document.querySelector(".main").innerHTML = markup;
        clicked = false;
        return res;
      })
      .catch(err => {
        alert("Not found, please try again");
      });
  }
};

function movieSel(id) {
  sessionStorage.setItem("movieId", id);
  window.location = "movie.html";
  displayMovie(id);
  return false;
};