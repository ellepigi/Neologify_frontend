// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyB2ckOSWjfmw-xVL7AcMQLGJ30NOPjn-Ho",
  authDomain: "neologify.firebaseapp.com",
  projectId: "neologify",
  storageBucket: "neologify.appspot.com",
  messagingSenderId: "122161957155",
  appId: "1:122161957155:web:9cec63ec33ed6a1c04a496",
  measurementId: "G-6571FSK2M3"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const db = getFirestore(app);
