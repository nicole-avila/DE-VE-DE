/*
In this module you can find everything thta has to do whit the search result.

The btnSearch takes the value from the inputfield and searches in the database collection, `de-ve-de`
The function under fetchMovieCollection, ”searches”/"checks" through the collection, ”de-ve-de” for the value from the Search Field. 
If the search gets a match from the collection it will display it. 
*/
import { db, collection, getDocs, query, where } from "./firebase.js";

const btnSearch     = document.querySelector(`.btnSearch`);
const searchInput   = document.querySelector(`.search`);
const searchDisplay = document.querySelector(`#searchDisplay`);


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

      result.forEach((movie) => {
        // console.log(movie.data());
        const el= `
        <li movie-id=${movie.id}>
          <p>Titel: ${movie.data().title}</p>
          <p>Genre: ${movie.data().genre}</p>
          <p>Released: ${movie.data().released}</p>
        </li>
        `
        searchDisplay.insertAdjacentHTML(`beforeend`, el)
      });


    } catch (error) {
      console.log(error);
    }
  }
//// Edit: Trying to display IF movie-title exsist in db then show/display result, IF NOT exsist in db display `movie not found`.
// async function displayMovieCollection(movie) { 
//   let movieTitle = data.id
  
//   if (movieTitle) {
//     const el = `
//     <li>
//       <p>Titel: ${movie.data().title}</p>
//       <p>Genre: ${movie.data().genre}</p>
//       <p>Released: ${movie.data().released}</p>
//     </li>
//     `
//     searchDisplay.insertAdjacentHTML(`beforeend`, el)

//   }else {
//     searchDisplay.innerText = `Movie NOT found`
//   }
// };

export { fetchMovieCollection }


