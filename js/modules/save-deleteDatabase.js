/* 
Here can you find two function. One for saving all input-Value to the database and 
the other function removing doc/object from the database, and adding in 
another collection, "completedMovies"

I decide to put everything that have to do with saving (addDoc), 
adding a new collection or delete Docs from database in one module. 
*/
import { collection, db, addDoc, deleteDoc, doc } from "./firebase.js"
import { getMovieInput, getCompletedMovies } from "../script.js";

async function saveToDatabase(movieInput) {
  try {
    await addDoc(collection(db, `de-ve-de`), movieInput);

  } catch (error) {
    console.log(`ERROR`); 
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