import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth"
 
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
export const auth = getAuth(app);
const analytics = getAnalytics(app);  
export const db = getFirestore(app);
