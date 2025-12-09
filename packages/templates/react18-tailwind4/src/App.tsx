import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";


import Referencepage from "./pages/Referencepage";
import TestComp from "./pages/test";
import ComponentTest from "./pages/ComponentTest";
import { AppLayoutProvider } from "./layout/AppLayout/AppLayoutProvider";
import { AppLayout } from "./layout/AppLayout";

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
              <Route path="/" element={<ComponentTest/>} />
              <Route path="/basic" element={<TestComp/>} />
              <Route path="/reference" element={<Referencepage />} />
            </Routes>
          </AppLayout>
        </AppLayoutProvider>
      </Router>
    </>
  );
}

export default App;
