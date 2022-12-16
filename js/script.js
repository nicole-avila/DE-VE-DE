/* Here I decided to have the two getDoc's functions who even displays the value from
the input-fields, included the function who visibly removes the "object"/docs. 
*/
import { db, collection, getDocs } from "./modules/firebase.js";
import { removeFromDatabase } from "./modules/save-deleteDatabase.js";
import { fetchMovieCollection } from "./modules/searchQuery.js";

const header = document.querySelector(`.header-text h1`);
const favoriteDisplay = document.querySelector(`.favorite`);
const watchedDisplay  = document.querySelector(`.watched`);

//De-VE-DE logo rotation
header.innerHTML = header.innerText.split("").map(
  (char, i) =>
  `<span style="transform:rotate(${i * 20}deg)">${char}</span>`).join("")

async function getMovieInput() {
  try {
    const movieList = await getDocs(collection(db, `de-ve-de`));
    favoriteDisplay.innerText = ``;
  
    movieList.forEach((list) => {
      const el = `
          <li movie-id=${list.id}>
            <p id="title-${list.id}">Titel: ${list.data().title}</p>
            <p id="genre-${list.id}">Genre: ${list.data().genre}</p>
            <p id="released-${list.id}">Released: ${list.data().released}</p>
            <button class="watchedBtn">Watched</button>
          </li>
        `
    favoriteDisplay.insertAdjacentHTML(`beforeend`, el);
    });
    removeMovieInput()
  }catch (error) {
  console.log(error);
  }
}

function removeMovieInput() {
  const movie = document.querySelectorAll(`li`);

  movie.forEach((movieElem) => {
    movieElem.addEventListener(`click`, (event) => {
    
      const deleteMovieId = event.currentTarget.getAttribute(`movie-id`);
      const movieText = {}
      const delTitle = document.querySelector(`#title-${deleteMovieId}`);
      const delGenre = document.querySelector(`#genre-${deleteMovieId}`);
      const delRelesed = document.querySelector(`#released-${deleteMovieId}`);

      movieText.title = delTitle.innerText;
      movieText.genre = delGenre.innerText;
      movieText.released = delRelesed.innerText;

      removeFromDatabase(deleteMovieId, movieText) 
    });
  });
}

async function getCompletedMovies() {
  try {
    const completedMovies = await getDocs(collection(db, `completedMovies`));
    watchedDisplay.innerText = ``;

    completedMovies.forEach((list) => {
      const elem = ` 
        <li movie-id=${list.id}>
          <p id="${list.id}-title">${list.data().title}</p>
          <p id="${list.id}-genre">${list.data().genre}</p>
          <p id="${list.id}-released">${list.data().released}</p>
        </li>
      `
    watchedDisplay.insertAdjacentHTML(`beforeend`, elem)
    });
  }catch (error) {
    console.log(error);
  }
}

export { getMovieInput, getCompletedMovies, fetchMovieCollection }