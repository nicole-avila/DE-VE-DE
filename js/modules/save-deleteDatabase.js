/* 
Here can you find two different database functions. One for saving all input-Value to the database and 
the other removing doc/object from the database, and adding in 
another collection, "completedMovies" 
The btn adds and saves the input-value from the user to the database, collection. 

I decided to put everything that has to do with database in one module, for ex, saving (addDoc), 
adding a new collection or delete Docs from database in one module. 
*/
import { collection, db, addDoc, deleteDoc, doc } from "./firebase.js"
import { getMovieInput, getCompletedMovies } from "../script.js";
const btn             = document.querySelector(`.btnAddMovie`);
const title           = document.querySelector(`.titleInput`);
const genre           = document.querySelector(`.genre`);
const released        = document.querySelector(`.released`);

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

async function saveToDatabase(movieInput) {
  try {
    await addDoc(collection(db, `de-ve-de`), movieInput);

  } catch (error) {
    console.log(error); 
  }
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

export { saveToDatabase, removeFromDatabase }