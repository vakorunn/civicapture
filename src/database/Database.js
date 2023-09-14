import { getFirestore } from "firebase/firestore"

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDzUMcYP-OT35OVG6xqH0EOXewSqRT8mK4",
  authDomain: "civicapture-f45ec.firebaseapp.com",
  projectId: "civicapture-f45ec",
  storageBucket: "civicapture-f45ec.appspot.com",
  messagingSenderId: "1053121893799",
  appId: "1:1053121893799:web:5314c0909d4053e059d282"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export default db ;