// Import the functions you need from the SDKs you need
// import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
import firebase from "firebase/app";
import { getFirestore } from "firebase/firestore";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBMXFzEpBPoeab0334pKSiPMG_qCFf-UZI",
  authDomain: "yes-in-our-school.firebaseapp.com",
  projectId: "yes-in-our-school",
  storageBucket: "yes-in-our-school.appspot.com",
  messagingSenderId: "1047792886701",
  appId: "1:1047792886701:web:d40d490818f9b9294c7724",
  measurementId: "G-T7PZQHZPKL"
};

// Initialize Firebase
// const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);

const app = firebase.initializeApp(firebaseConfig);
const firestore = getFirestore(app);
const db = firestore.ref();
export default db;