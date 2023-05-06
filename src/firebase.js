// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBxNoRJX0A5HpHP7JKiybxIHMUesuinN2s",
  authDomain: "meet-app-f0815.firebaseapp.com",
  projectId: "meet-app-f0815",
  storageBucket: "meet-app-f0815.appspot.com",
  messagingSenderId: "1013567589595",
  appId: "1:1013567589595:web:5bceed6d694eb844cd90fe",
  measurementId: "G-Y85K26PTPP",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);
export const provider = new GoogleAuthProvider();
