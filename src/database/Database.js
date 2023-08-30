import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore"

const firebaseConfig = {
  apiKey: "AIzaSyBcuEx41LE-P-4-mGcIRgi5LtgcIJHx_SA",
  authDomain: "civicapture.firebaseapp.com",
  projectId: "civicapture",
  storageBucket: "civicapture.appspot.com",
  messagingSenderId: "7380933476",
  appId: "1:7380933476:web:ffdd1a2cd2b1e63e447871",
  experimentalForceLongPolling: true
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export default db ;