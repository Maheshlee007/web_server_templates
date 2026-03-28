import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";

import { Home } from "./pages/Home";
import { ComponentsDemo } from "./pages/ComponentsDemo";
import { NotFound } from "./pages/NotFound";
import { Login } from "./pages/Login";
import { Register } from "./pages/Register";
import { Unauthorized } from "./pages/Unauthorized";
import { AdminPage } from "./pages/Admin";
import { AppLayoutProvider } from "./layout/AppLayout/AppLayoutProvider";
import { AppLayout } from "./layout/AppLayout";
import { ProtectedRoute } from "./components/Auth/ProtectedRoute";
import FeedbackDemo from "./pages/FeedbackDemo";
import { useAuthStore } from "./store/authStore";
import { authApi } from "./services/authService";
import { APP_CONFIG } from "./config/app";

function App() {
  const { isAuthenticated, user, logout } = useAuthStore();

  const handleLogout = async () => {
    await authApi.logout();
    logout();
  };

  return (
    <>
      {/* ============================================
          GRADIENT BACKGROUND
          WHY: Gradient blobs for glass effect visibility
          ============================================ */}
      {/* Animated gradient blobs */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none bg-(--color-bg)">
        <div className="blob blob-primary w-150 h-150 -top-48 -left-48" />
        <div className="blob blob-primary w-75 h-100 -bottom-32 left-1/4 blob-delay-4s" />
      </div>

      <Router>
        <Routes>
          {/* ──── Public Routes (no layout) ──── */}
          <Route path="/login" element={
            isAuthenticated ? <Navigate to="/" replace /> : <Login />
          } />
          <Route path="/register" element={
            isAuthenticated ? <Navigate to="/" replace /> : <Register />
          } />

          {/* ──── Protected Routes (with layout) ──── */}
          <Route path="/*" element={
            <ProtectedRoute>
              <AppLayoutProvider 
                variant="sidebar-persistent"          
                title={APP_CONFIG.name}
                user={{
                  name: user ? `${user.firstName} ${user.lastName}` : 'Guest',
                  email: user?.email ?? '',
                }}
                onLogout={handleLogout}
              >
                <AppLayout>
                  <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/components" element={<ComponentsDemo />} />
                    <Route path="/feedback" element={<FeedbackDemo />} /> 
                    <Route path="/themes" element={<div className="p-6"><h1 className="text-2xl font-bold">Themes Page</h1><p className="text-(--color-text-secondary)">Theme selector coming soon...</p></div>} />
                    <Route path="/admin" element={
                      <ProtectedRoute requiredRoles={['Admin']}>
                        <AdminPage />
                      </ProtectedRoute>
                    } />
                    <Route path="/unauthorized" element={<Unauthorized />} />
                    
                    {/* 404 Catch-all */}
                    <Route path="*" element={<NotFound />} />
                  </Routes>
                </AppLayout>
              </AppLayoutProvider>
            </ProtectedRoute>
          } />
        </Routes>
      </Router>
    </>
  );
}

export default App;
