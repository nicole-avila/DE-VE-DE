  // Import the functions you need from the SDKs you need
  import { initializeApp } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js";
  import { getFirestore, collection, addDoc , getDocs, deleteDoc,doc, 
    updateDoc, query, where, increment } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-firestore.js";
  // TODO: Add SDKs for Firebase products that you want to use
  // https://firebase.google.com/docs/web/setup#available-libraries

  // Your web app's Firebase configuration
  const firebaseConfig = {
    apiKey: "AIzaSyBDo8IMD8fEuPkCJwDfmIa46AIOaxN5gf0",
    authDomain: "slutexamination-wk.firebaseapp.com",
    projectId: "slutexamination-wk",
    storageBucket: "slutexamination-wk.appspot.com",
    messagingSenderId: "741707634061",
    appId: "1:741707634061:web:e5f91d7df6b361290f59c4"
  };

  // Initialize Firebase
  const app = initializeApp(firebaseConfig);
  const db = getFirestore(app); 
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
            <button class="watchedMovie">Watched Movie</button>
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
// saveAllMovies()

// const searchInput = movieInput.title;
// async function searchInputList() {

 
//   console.log(searchInput);
//   console.log(search);
//     try {
//         const searchQuery = query (collection(db, `de-ve-de`), where(`title`, `==`, `searchInput`)); // movieInput.title ?? 
//         const result = await getDocs(searchQuery);
//         let resultSearch = {}; 

//         result.forEach((title) => {
//           resultSearch = title; 
//     });
//         return resultSearch
//     } catch (error){
//     console.log(error);
//   }
// }

// const btnSearch = document.querySelector(`.btnSearch`)
//   btnSearch.addEventListener(`click`, async () => {
//     const movie = await searchInputList(); 
//     const movieElem = movie.id
//     if(movieElem){
//     showSearchResult(movie);
//     } else {
//       alert(`hittar inte filmen`)
//     }
//     console.log(movieResult);
//     console.log(movieElem);
//     // searchInput.value = ``;
//     // searchResult.innerText = ``;
// })




// async function showSearchResult(movie) {
//     const searchResult = document.querySelector(`#searchResult`);

//     const element = `
//         <li movie-id=${movie.id}>
//     <p id="${movie.id}-title">${movie.data().title}</p>
//     <p id="${movie.id}-genre">${movie.data().genre}</p>
//     <p id="${movie.id}-released">${movie.data().released}</p>
//     </li>
//     `
//     // const id = `${movie.id}`;
//     searchResult.insertAdjacentHTML(`beforeend`, element);
  
//   }

