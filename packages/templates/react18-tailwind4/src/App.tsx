import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import { Home } from "./pages/Home";
import { ComponentsDemo } from "./pages/ComponentsDemo";
import { NotFound } from "./pages/NotFound";
import { AppLayoutProvider } from "./layout/AppLayout/AppLayoutProvider";
import { AppLayout } from "./layout/AppLayout";
import FeedbackDemo from "./pages/FeedbackDemo";

function App() {
  const handleLogout = () => {
    console.log('Logging out...');
    // Add your logout logic here
  };

  return (
    <>
      {/* ============================================
          GRADIENT BACKGROUND
          WHY: Gradient blobs for glass effect visibility
          ============================================ */}
      {/* Animated gradient blobs */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none bg-(--color-bg)">
        <div className="blob blob-primary w-[600px] h-[600px] -top-48 -left-48" />
        {/* <div className="blob blob-accent w-[300px] h-[500px] top-2/3 -right-32 blob-delay-2s" /> */}
        <div className="blob blob-primary w-[300px] h-[400px] -bottom-32 left-1/4 blob-delay-4s" />
      </div>

      <Router>
        <AppLayoutProvider 
          variant="sidebar-persistent"          
          title="My Project"
          user={{ name: 'Mahesh Lee', email: 'ML@info.com' }}
          onLogout={handleLogout}
        >
          {/* 
            Variant options:
            - "top-only": Only top navigation (center nav items)
            - "sidebar-hidden": Sidebar toggleable with menu icon  
            - "sidebar-persistent": Sidebar always visible with mini mode
          */}
          <AppLayout>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/components" element={<ComponentsDemo />} />
              <Route path="/feedback" element={<FeedbackDemo />} /> 
              <Route path="/themes" element={<div className="p-6"><h1 className="text-2xl font-bold">Themes Page</h1><p className="text-(--color-text-secondary)">Theme selector coming soon...</p></div>} />
              
              {/* 404 Catch-all */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </AppLayout>
        </AppLayoutProvider>
      </Router>
    </>
  );
}

export default App;
