// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {getFirestore} from 'firebase/firestore'

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyC3XWoEDdimidc6boX8k3Y3v_FOqbFKyPM",
  authDomain: "ai-trip-planner-5906.firebaseapp.com",
  projectId: "ai-trip-planner-5906",
  storageBucket: "ai-trip-planner-5906.firebasestorage.app",
  messagingSenderId: "561767789738",
  appId: "1:561767789738:web:d0f0ead2d9549005c3ccd3",
  measurementId: "G-LM1YZN7FSP"
};

// Initialize Firebase
 export const app = initializeApp(firebaseConfig);
  
 export const db=getFirestore(app)
