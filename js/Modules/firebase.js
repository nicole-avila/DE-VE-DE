  // Import the functions you need from the SDKs you need
  import { initializeApp } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js";
  import { getFirestore, collection, addDoc , getDocs, deleteDoc, doc, updateDoc, query, where } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-firestore.js";
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

  export { getFirestore, db, collection, addDoc , getDocs, deleteDoc, doc, updateDoc, query, where }