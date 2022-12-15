import { db, collection, getDocs } from "./modules/firebase.js";
import { saveToDatabase, removeFromDatabase } from "./modules/save-deleteDatabase.js";
import { showSearchResult } from "./modules/searchQuery.js";

const header          = document.querySelector(`.header-text h1`);

const btn             = document.querySelector(`#btnAddMovie`);
const title           = document.querySelector(`#title`);
const genre           = document.querySelector(`#genre`);
const released        = document.querySelector(`#released`);

const favoriteDisplay = document.querySelector(`#favorite`);
const watchedDisplay  = document.querySelector(`#watched`);


header.innerHTML = header.innerText.split("").map((char, i) =>
  `<span style="transform:rotate(${i* 20}deg)">${char}</span>`).join("")


// const coll = document.querySelector(`.collapsible`);
// let i;

//   for(i = 0; i < coll.length; i++) {
//     coll[i].addEventListener(`click`, function() {
//       console.log(`click`);
  
//       this.classList.toggle(`active`);
//       toSeeMovie = this.nextElementSibling;

//       if (content.style.display === `block`) {
//         content.style.display = `none`
//       } else {
//         content.style.display = `block`;
//       }
//     });
//   }

let movieInput = {
  title: ``,
  genre: ``,
  released: ``
}

btn.addEventListener(`click`, () => {
  movieInput.title = title.value;
  movieInput.genre = genre.value;
  movieInput.released = released.value;

  saveToDatabase(movieInput)
  getMovieInput()
  title.value = ``;
  genre.value = ``;
  released.value = ``;
})

async function getMovieInput() {
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
  console.log(movieList)
});
  removeMovieInput()
}

async function getCompletedMovies() {
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
      // console.log(elem);

      movieText.title = delTitle.innerText;
      movieText.genre = delGenre.innerText;
      movieText.released = delRelesed.innerText;
      // console.log(deleteMovieId);
      removeFromDatabase(deleteMovieId, movieText) 
    })
  });

}

export { getMovieInput, getCompletedMovies, showSearchResult } 