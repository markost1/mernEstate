// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "m-estate.firebaseapp.com",
  projectId: "m-estate",
  storageBucket: "m-estate.appspot.com",
  messagingSenderId: "496378913867",
  appId: "1:496378913867:web:dc2543edc37ab8527719ce"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);