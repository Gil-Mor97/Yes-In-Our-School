import Dashboard from "./Dashboard/Dashboard";
import { doc, setDoc } from "firebase/firestore";
import db from "./data/Db";
import React, { useEffect } from "react";
import uuid from "react-uuid";
import { HashRouter as Router, Route, Link, Routes } from "react-router-dom";
import ReportInjustice from "./Dashboard/components/ReportInjustice";

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


function AppRouter() {
  useEffect(() => {
    // // addToDb();
  });
  return (
    <Router>
      <div>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/democratic-content" element={<Dashboard />} />
          <Route path="/schools" element={<Dashboard />} />
          <Route path="/report-injustice" element={<ReportInjustice />} />
        </Routes>
      </div>
    </Router>
  );
}

export default AppRouter;
