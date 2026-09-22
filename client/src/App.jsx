import { BrowserRouter, Routes, Route } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import { AuthProvider } from "./context/AuthContext";
import ProtectedRoute from "./components/admin/ProtectedRoute";
import Home from "./pages/Home";
import NotFound from "./pages/NotFound";
import Login from "./pages/admin/Login";
import Dashboard from "./pages/admin/Dashboard";

function App() {
  return (
    <BrowserRouter>
      <HelmetProvider>
        <AuthProvider>
          <Routes>
            {/* Public */}
            <Route path="/" element={<Home />} />

            {/* Admin Auth */}
            <Route path="/admin/login" element={<Login />} />

            {/* Admin Protected */}
            <Route
              path="/admin"
              element={
                <ProtectedRoute>
                  <Dashboard />
                </ProtectedRoute>
              }
            />

            {/* 404 */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </AuthProvider>
      </HelmetProvider>
    </BrowserRouter>
  );
}

export default App;
