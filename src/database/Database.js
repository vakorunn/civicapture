import { getFirestore } from "firebase/firestore"

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBHIST7hjigpd98ey4d0-Iyk7e0ye5KSEA",
  authDomain: "civicapture-e5ecc.firebaseapp.com",
  projectId: "civicapture-e5ecc",
  storageBucket: "civicapture-e5ecc.appspot.com",
  messagingSenderId: "762988954900",
  appId: "1:762988954900:web:342e13e01db60653a66e01"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export default db ;