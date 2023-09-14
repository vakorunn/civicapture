import { getFirestore } from "firebase/firestore"

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBcuEx41LE-P-4-mGcIRgi5LtgcIJHx_SA",
  authDomain: "civicapture.firebaseapp.com",
  projectId: "civicapture",
  storageBucket: "civicapture.appspot.com",
  messagingSenderId: "7380933476",
  appId: "1:7380933476:web:ffdd1a2cd2b1e63e447871"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export default db ;