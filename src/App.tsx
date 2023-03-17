import Dashboard from "./Dashboard/Dashboard";
import { doc, setDoc } from "firebase/firestore";
import db from "./data/Db";
import React, { useEffect } from "react";
import uuid from 'react-uuid';

const addToDb = async () => {
  // Add a second document with a generated ID.
  // const citiesRef = collection(db, "ngos");
  try {
    const value = "test2";
    const docRef = doc(db, "todo2", uuid());
    await setDoc(docRef, { value });
    alert(`Item ${value} added!`);
  } catch (error) {
    alert(error);
  }
};

export default function App() {
  useEffect(() => {
    // Update the document title using the browser API
    addToDb();
  });
  return <Dashboard></Dashboard>;
}
