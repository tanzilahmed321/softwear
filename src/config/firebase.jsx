// src/config/firebase.js
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBSuOoCcT3lMUgesCPv7toTjtWlQkM6NtA",
  authDomain: "signup-form-b46b8.firebaseapp.com",
  projectId: "signup-form-b46b8",
  storageBucket: "signup-form-b46b8.appspot.com",
  messagingSenderId: "428252044078",
  appId: "1:428252044078:web:7a17c0fea3c06339cbb8bf"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication and Firestore
const auth = getAuth(app);
const database = getFirestore(app);

export { auth, database };