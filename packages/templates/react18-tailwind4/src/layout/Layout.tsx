import React from "react";
import Header from "./Header";



function Layout({children}: {children: React.ReactNode}) {
  
return (
     <div className="min-h-screen min-w-dvh bg---color-bg) transition-colors duration-300 relative mouse-gradient scrollbar-hide">
      {/* Main Content */}
      <div className="relative z-9999 sticky top-0 md:pb-2 max-w-7xl mx-auto md:min-w-full">
        {/* Header with Glass + Spotlight Effect */}
       <Header />
      </div>
      {children}
    </div>


)}

export default Layout;