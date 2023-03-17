import * as React from 'react';
import Dashboard from './Dashboard/Dashboard'
import { collection, addDoc } from "firebase/firestore"; 
import db from './data/Firebase';


const addToDb = async () => {
  // Add a second document with a generated ID.
  db.app.collection("users").add({
    first: "Alan",
    middle: "Mathison",
    last: "Turing",
    born: 1912
  })
  .then((docRef: any) => {
    console.log("Document written with ID: ", docRef.id);
  })
  .catch((error: any) => {
    console.error("Error adding document: ", error);
  });
}

export default function App() {

  return (
    <Dashboard></Dashboard>
  );
}
