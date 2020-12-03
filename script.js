const cardContainer = document.getElementById("card-container");

const getGifs = (event) => {
  let query = event.currentTarget.value;
  axios
    .get(
      `http://api.giphy.com/v1/gifs/search?api_key=TZMzIVU9PeU9S5uUXXBSKZrBfRv9woGI&q=${query}&limit=12`
    )
    .then((res) => {
      const gifs = res.data.data;

      gifs.map((gif) => {
        let gifContainer = document.getElementById(`${query}-gif-container`);
        let newImg = document.createElement("img");
        newImg.src = gif.images.downsized.url;
        gifContainer.appendChild(newImg);
      });
    })
    .catch((err) => {
      console.error(err);
    });
};

const getMovies = (event) => {
  let query = event.currentTarget.value;
  axios
    .get(`http://www.omdbapi.com/?i=tt3896198&apikey=d6786469&s=${query}`)
    .then((res) => {
      const movies = res.data["Search"];
      movies.map((movie) => {
        let movieContainer = document.getElementById(
          `${query}-movie-container`
        );
        console.log(movie);
        let newImg = document.createElement("img");
        newImg.src = movie.Poster;
        movieContainer.appendChild(newImg);
      });
    })
    .catch((err) => {
      console.error(err);
    });
};

const getCard = (query) => {
  let card = document.createElement("div");

  let cardHtml = `
        <h1>${query}</h1>
        <div class="card-buttons">
            <button onclick="getGifs(event)" value=${query}>GIFS</button>
            <button onclick="getMovies(event)" value=${query}>MOVIES</button>
        </div>
        <div id="${query}-gif-container"></div>
        <div id="${query}-movie-container"></div>
    `;
  card.innerHTML = cardHtml;
  return card;
};

const createKeyword = (event) => {
  event.preventDefault();
  let query = document.getElementById("search").value;
  let card = getCard(query);
  cardContainer.appendChild(card);
  document.getElementById("search").value = "";
};
