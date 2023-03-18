import Dashboard from "./components/pages/Dashboard/Dashboard";
import React, { useEffect, useContext } from "react";
import {
  HashRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import { AuthProvider } from "./provider/AuthProvider";
import Login from "./components/auth/Login";
import Signup from "./components/auth/Signup";
import { AuthContext } from "./context/AuthContext";
import ResponsiveNavbar from "./components/ResponsiveNabvar";
import ReportInjustice from "./Dashboard/components/ReportInjustice";
import "./App.css";

function RequireAuth({ children }) {
  const user = useContext(AuthContext);

  return user ? children : <Navigate to="/login" replace />;
}

function RequireNoAuth({ children }) {
  const user = useContext(AuthContext);

  return !user ? children : <Navigate to="/home" replace />;
}

function AppRouter() {
  return (
    <Router>
      <AuthProvider>
        <div>
          <ResponsiveNavbar>
            <Routes>
              <Route
                path="/"
                element={
                  <RequireNoAuth>
                    <Dashboard />
                  </RequireNoAuth>
                }
              />
              <Route
                path="/home"
                element={
                  <RequireAuth>
                    <Dashboard />
                  </RequireAuth>
                }
              />
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
                    <ReportInjustice />
                  </RequireAuth>
                }
              />
              <Route
                path="/login"
                element={
                  <RequireNoAuth>
                    <Login />
                  </RequireNoAuth>
                }
              />
              <Route
                path="/signup"
                element={
                  <RequireNoAuth>
                    <Signup />
                  </RequireNoAuth>
                }
              />
            </Routes>
          </ResponsiveNavbar>
        </div>
      </AuthProvider>
    </Router>
  );
}

export default AppRouter;
