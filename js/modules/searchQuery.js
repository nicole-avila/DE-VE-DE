/*
In this module you can find everything that has to do whit the search-input and result-value.
I decided to put all "search functions" in one module so it will be easer to locate it if 
I want to add some changes. 

The btnSearch takes the value from the inputfield and searches in the database collection, `de-ve-de`
The function under fetchMovieCollection, ”searches” through the database, collection, ”de-ve-de” for the value/object from the Search Field. 
If the search gets a movieTitle who dosent exist in db, collection it will show the user "Movie do not exist..." 
but if it gives a match from the collection it will display it in searsDisplay. 
*/
import { db, collection, getDocs, query, where } from "./firebase.js";

const btnSearch     = document.querySelector(`.btnSearch`);
const searchInput   = document.querySelector(`.search`);
const searchDisplay = document.querySelector(`.searchDisplay`);


btnSearch.addEventListener(`click`, async () => {
  const searchValue = searchInput.value

  fetchMovieCollection(searchValue)
  searchInput.value = ``;
  searchDisplay.innerText = ``;
});

async function fetchMovieCollection(searchValue) {
    try {
      const searchQuery = query(collection(db, `de-ve-de`), where(`title`, `==`, searchValue));
      const result = await getDocs(searchQuery);
      searchDisplay.innerText = ``;

      if (result.empty) {
        // console.log(`No result`);
        searchDisplay.innerHTML = `<h3>Movie do not exist in favorites list</h3>`;
      }
      result.forEach((movie) => {
        // console.log(movie.data());
        const el= `
        <li movie-id=${movie.id}>
          <p>Titel: ${movie.data().title}</p>
          <p>Genre: ${movie.data().genre}</p>
          <p>Released: ${movie.data().released}</p>
        </li>
        `;
        searchDisplay.insertAdjacentHTML(`beforeend`, el);
      });
    } catch (error) {
      console.log(error);
    }
  }

export { fetchMovieCollection }