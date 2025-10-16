// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyD3TiZ27_bpBOznwXPoOVuXkmBVK8S2QwQ",
  authDomain: "next-things-app-self.firebaseapp.com",
  projectId: "next-things-app-self",
  storageBucket: "next-things-app-self.firebasestorage.app",
  messagingSenderId: "874721359653",
  appId: "1:874721359653:web:5c25bbcf85e20f17b7cccc",
  measurementId: "G-91C0P514DH",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
