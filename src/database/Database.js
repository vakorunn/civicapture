import { getFirestore } from "firebase/firestore"

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCviWvMnwSJKpSxE6whZi0-xAiB1jQzmgs",
  authDomain: "civicap-46385.firebaseapp.com",
  projectId: "civicap-46385",
  storageBucket: "civicap-46385.appspot.com",
  messagingSenderId: "852936771570",
  appId: "1:852936771570:web:09b83716dd1ad5f3dbcd6b"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export default db ;