import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";
import "firebase/functions"; // <- needed if using httpsCallable
import "firebase/storage";

const config = {
  apiKey: "AIzaSyCbqzCY7rAETC3kOiqYBYds5vsTD-3FAiw",
  authDomain: "remi-a7e48.firebaseapp.com",
  databaseURL: "https://remi-a7e48.firebaseio.com",
  projectId: "remi-a7e48",
  storageBucket: "remi-a7e48.appspot.com",
  messagingSenderId: "613177526817",
  appId: "1:613177526817:web:0424c65c62e5b46fc77160"
};

try {
  firebase.initializeApp(config);
  firebase.firestore();
  console.log("Firebase Initialized");
} catch (err) {
  console.log("Error Initializing Firebase");
}

export default firebase;
