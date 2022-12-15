import { db, collection, getDocs, query, where } from "./firebase.js";

const btnSearch = document.querySelector(`#btnSearch`);
const searchInput = document.querySelector(`#search`);
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
      searchDisplay.innerText = ``;
      // const movieExist = searchValue.id 

      // if (searchValue == ``) {
      //     alert (`You need to type a title from a movie`);
      // if (movieExist) { showSearchResult(searchValue)
      // } else 
      //     searchDisplay.innerHTML = `Movie not found`
      // }

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

export { showSearchResult }