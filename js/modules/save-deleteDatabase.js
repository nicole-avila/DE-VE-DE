import { db, collection, addDoc, deleteDoc, doc } from "./firebase.js"
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