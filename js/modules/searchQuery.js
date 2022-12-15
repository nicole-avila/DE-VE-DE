/*
In this module you can find everything thta has to do whit the search result.

The btnSearch takes the value from the inputfield and searches in the database collection, `de-ve-de`
The function under showSearchResult, ”searches” through the collection, ”de-ve-de” for the value from the Search Field. 
If the search gets a match from the collection it will display it. 
*/
import { db, collection, getDocs, query, where } from "./firebase.js";

const btnSearch     = document.querySelector(`#btnSearch`);
const searchInput   = document.querySelector(`#search`);
const searchDisplay = document.querySelector(`#searchDisplay`);

btnSearch.addEventListener(`click`, async () => {
  const searchValue = searchInput.value 

  showSearchResult(searchValue)
  searchInput.value = ``;
  searchDisplay.innerText = ``;
});
async function showSearchResult(searchValue) {
  try {
    const searchQuery = query(collection(db, `de-ve-de`), where(`title`, `==`, searchValue));
    const result = await getDocs(searchQuery);
    const movieExist = searchInput.id 
    

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
    // }
  // else (searchValue == ``); { searchDisplay.innerText = `Movie not found`
  //   }

  }catch (error) {
  console.log(`ERROR`); 

  }
}

export { showSearchResult }



// async function showSearchResult(searchValue) {
//   try {
//     const searchQuery = query(collection(db, `de-ve-de`), where(`title`, `==`, searchValue));
//     const result = await getDocs(searchQuery);
//     let title = {};

//       result.forEach((movie) => {
//         title = movie
//         });

//         return title;
//   } catch (error) {
//   console.log(`ERROR`); 
//   }
// }

// async function displaySearchResult() {
//   const searchInput = await showSearchResult()
//   const movieExist = searchInput.id
  
//     if (movieExist) {
//       searchInput.forEach((movie) => {
//         const el= `
//         <li movie-id=${movie.id}>
//           <p>Titel: ${movie.data().title}</p>
//           <p>Genre: ${movie.data().genre}</p>
//           <p>Released: ${movie.data().released}</p>
//         </li>
//         `
//         searchDisplay.insertAdjacentHTML(`beforeend`, el);
//       });
//     }
//     else {
//       searchDisplay.innerText = `Movie not found`
//     }
// }

// displaySearchResult()

