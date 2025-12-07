import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useTheme } from "@/context/themeContext";

import { useMousePosition } from "@/hooks/useMousePosition";
import { Moon, Sun, Monitor } from "lucide-react";

import Layout from "./layout/Layout";
import Referencepage from "./pages/Referencepage";
import TestComp from "./pages/test";
import ComponentTest from "./pages/ComponentTest";
import { AppLayoutProvider } from "./layout/AppLayout/AppLayoutProvider";

function App() {
  // const { theme, resolvedTheme, setTheme } = useTheme();

  const themeIcons = {
    light: <Sun size={18} />,
    dark: <Moon size={18} />,
    system: <Monitor size={18} />,
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
      <AppLayoutProvider variant="top-only" sidebarBehavior="push" nestedNavStyle="accordion">
        {/* <TopNavBar/> */}
        <Layout>
          <Routes>
            <Route path="/" element={<ComponentTest/>} />
            <Route path="/basic" element={<TestComp/>} />
            <Route path="/reference" element={<Referencepage />} />
          </Routes>
        </Layout>
        </AppLayoutProvider>
      </Router>
    </>
  );
}

export default App;
