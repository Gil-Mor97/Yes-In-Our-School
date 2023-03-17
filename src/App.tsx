import Dashboard from "./components/pages/Dashboard/Dashboard";
import { doc, setDoc } from "firebase/firestore";
import { db } from "./data/Db";
import React, { useEffect, useContext } from "react";
import uuid from "react-uuid";
import {
  HashRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import { AuthProvider } from "./provider/AuthProvider";
import Login from "./components/auth/Login";
import { AuthContext } from "./context/AuthContext";
import ResponsiveNavbar from "./components/ResponsiveNabvar";

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

function RequireAuth({ children }) {
  const user = useContext(AuthContext);

  return user ? children : <Navigate to="/login" replace />;
}

function AppRouter() {
  const user = useContext(AuthContext);
  useEffect(() => {
    // // addToDb();
  });
  return (
    <Router>
      <AuthProvider>
        <div>
          <ResponsiveNavbar>
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route
                path="/democratic-content"
                element={
                  <RequireAuth>
                    <Dashboard />
                  </RequireAuth>
                }
              />
              <Route
                path="/schools"
                element={
                  <RequireAuth>
                    <Dashboard />
                  </RequireAuth>
                }
              />
              <Route
                path="/report-injustice"
                element={
                  <RequireAuth>
                    <Dashboard />
                  </RequireAuth>
                }
              />
              <Route path="/login" element={<Login />} />
            </Routes>
          </ResponsiveNavbar>
        </div>
      </AuthProvider>
    </Router>
  );
}

export default AppRouter;
