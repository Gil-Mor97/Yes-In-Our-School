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
import { AuthContext } from "./context/AuthContext";
import ResponsiveNavbar from "./components/ResponsiveNabvar";
import ReportInjustice from "./components/pages/ReportInjustice/ReportInjustice";

function RequireAuth({ children }) {
  const user = useContext(AuthContext);

  return user ? children : <Navigate to="/login" replace />;
}

function AppRouter() {
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
                    <ReportInjustice />
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
