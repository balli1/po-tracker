import { useState } from "react";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { AppLayout } from "../layouts/AppLayout";
import { DashboardPage } from "../pages/DashboardPage";
import { DispatchedPOsPage } from "../pages/DispatchedPOsPage";
import { LoginPage } from "../pages/LoginPage";

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/login"
          element={
            isAuthenticated ? (
              <Navigate to="/dispatched" replace />
            ) : (
              <LoginPage onLogin={() => setIsAuthenticated(true)} />
            )
          }
        />

        <Route
          element={
            isAuthenticated ? (
              <AppLayout onLogout={() => setIsAuthenticated(false)} />
            ) : (
              <Navigate to="/login" replace />
            )
          }
        >
          <Route path="/" element={<Navigate to="/dispatched" replace />} />
          <Route path="/dashboard" element={<DashboardPage />} />
          <Route path="/dispatched" element={<DispatchedPOsPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;