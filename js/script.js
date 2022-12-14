import { db, collection, addDoc , getDocs, deleteDoc, doc, updateDoc, query, where } from "./Modules/firebase.js"

  const btn = document.querySelector(`#btnSubmit`);
  const title = document.querySelector(`#title`);
  const genre = document.querySelector(`#genre`);
  const released = document.querySelector(`#released`);
  const toSeeMovie = document.querySelector(`#toSee`);
  const watched = document.querySelector(`#watched`);
  // const searchInput = document.querySelector(`#search`);
  // const collapsible = document.getElementsByClassName(`.collapsible`);
  // let i;


const header = document.querySelector(`.header-text h1`);
header.innerHTML = header.innerText.split("").map(
  (char, i) =>
  `<span style="transform:rotate(${i* 20}deg)">${char}</span>`
).join("")

// function showCollDisplay () {
//   for(i = 0; i < collapsible.length; i++) {
//     collapsible[i].addEventListener(`click`, () => {
//       console.log(click);
  
//       this.classList.toggle(`active`);
//       let content = this.nextElementSibling;
//       if (content.style.display === `show`) {
//         content.style.display = `none`
//       } else {
//         content.style.display = `show`;
//       }
//     })
//   }
// }
  // showCollDisplay ()

let movieInput = {
  title: ``,
  genre: ``,
  released: ``
}
function addClickEvent() {
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
}
addClickEvent()
  
async function saveToDatabase(movieInput) {
    try {
      await addDoc(collection(db, `de-ve-de`), movieInput);

    } catch (error) {
      console.log(`ERROR`); 
    }
  }

async function getMovieInput() {
    const movieList = await getDocs(collection(db, `de-ve-de`));
    toSeeMovie.innerText = ``;

    movieList.forEach((list) => {
    console.log(list.data())
      const el = `
            <li movie-id=${list.id}>
            <p id="title-${list.id}">Titel: ${list.data().title}</p>
            <p id="genre-${list.id}">Genre: ${list.data().genre}</p>
            <p id="released-${list.id}">Released: ${list.data().released}</p>
            <button class="watchedBtn">Watched Movie</button>
            </li>
      `

      toSeeMovie.insertAdjacentHTML(`beforeend`, el);
 
  });
    removeMovieInput()
}

function removeMovieInput() {
  const movie = document.querySelectorAll(`li`);

  movie.forEach((movieElem) => {
    movieElem.addEventListener(`click`, (event) => {
    
      const deleteMovieId = event.currentTarget.getAttribute(`movie-id`);
      const movieText = {}
      const elem = document.querySelector(`#title-${deleteMovieId}`);
      const elem1 = document.querySelector(`#genre-${deleteMovieId}`);
      const elem2 = document.querySelector(`#released-${deleteMovieId}`);
      console.log(elem);

      movieText.title = elem.innerText;
      movieText.genre = elem1.innerText;
      movieText.released = elem2.innerText;
      console.log(deleteMovieId, movieText);
 
      removeFromDatabase(deleteMovieId, movieText) 
    })
  });

}

async function removeFromDatabase(deleteMovieId, movieText) {
  try {
      await deleteDoc(doc(db, `de-ve-de`, deleteMovieId));
      await addDoc(collection(db,`completedMovies`),movieText);

      getMovieInput();
      getCompletedMovies();
  } catch(error) {
      console.log(`ERROR`, error);
  }
  // location.reload()
}

async function getCompletedMovies() {
  const completedMovies = await getDocs(collection(db, `completedMovies`));
  // console.log(completedMovies);
  watched.innerText = ``;

  completedMovies.forEach((list) => {
    console.log(list.data())

    const elem = ` 
          <li movie-id=${list.id}>
          <p id="${list.id}-title">${list.data().title}</p>
          <p id="${list.id}-genre">${list.data().genre}</p>
          <p id="${list.id}-released">${list.data().released}</p>
          </li>
    `
    watched.insertAdjacentHTML(`beforeend`, elem)
  });

}

const searchInput = document.querySelector(`#search`);
const btnSearch = document.querySelector(`#btnSearch`);


btnSearch.addEventListener(`click`, async () => {
  const searchValue = searchInput.value 
  const movieExist = searchValue.id 

if (searchValue == ``) {
    alert (`You need to type a title from a movie`);
if (movieExist) { showSearchResult(searchValue)
} else 
    searchDisplay.innerText = `Movie not found`
}
  showSearchResult(searchValue)
  searchInput.value = ``;
  searchDisplay.innerText = ``;
});


async function showSearchResult(searchValue) {
const searchDisplay = document.querySelector(`#searchDisplay`);

    try {
      const searchQuery = query(collection(db, `de-ve-de`), where(`title`, `==`, searchValue));
      const result = await getDocs(searchQuery);
      searchDisplay.innerText = ``;

      result.forEach((movie) => {
      const el= `
      <li movie-id=${movie.id}>
      <p>Titel: ${movie.data().title}</p>
      <p>Genre: ${movie.data().genre}</p>
      <p>Released: ${movie.data().released}</p>
      </li>
        `
      searchDisplay.insertAdjacentHTML(`beforeend`, el);
    });
  }catch (error) {
    console.log(`ERROR`);
  }
}