import React from "react";
import Header from "./Header";
import { TopNavBar } from "./TopNav/TopNavBar";
import { Home, FileText, Settings, User, Bell, HelpCircle, LogOut, BookOpen, Code, Layers, Package, Zap, Database } from 'lucide-react';
import type { NavItem, MenuItem } from "@/types/layout";

function Layout({children}: {children: React.ReactNode}) {
  
  // Sample navigation items with deep nesting for testing
  const topNavItems: NavItem[] = [
    { id: 'home', label: 'Home', icon: <Home className="w-4 h-4" />, path: '/' },
    { 
      id: 'basic', 
      label: 'Basic', 
      icon: <FileText className="w-4 h-4" />, 
      path: '/basic',
      children: [
        { id: 'basic-docs', label: 'Documentation', icon: <BookOpen className="w-4 h-4" />, path: '/basic/docs' },
        { 
          id: 'basic-examples', 
          label: 'Examples', 
          icon: <Code className="w-4 h-4" />, 
          path: '/basic/examples',
          children: [
            { id: 'basic-examples-react', label: 'React Examples', icon: <Zap className="w-4 h-4" />, path: '/basic/examples/react' },
            { id: 'basic-examples-vue', label: 'Vue Examples', icon: <Package className="w-4 h-4" />, path: '/basic/examples/vue' },
            { 
              id: 'basic-examples-advanced', 
              label: 'Advanced', 
              icon: <Database className="w-4 h-4" />, 
              path: '/basic/examples/advanced',
              badge: 'Pro',
              children: [
                { id: 'adv-patterns', label: 'Design Patterns', path: '/basic/examples/advanced/patterns' },
                { id: 'adv-performance', label: 'Performance', path: '/basic/examples/advanced/performance', badge: '5' },
              ]
            },
          ]
        },
        { id: 'basic-components', label: 'Components', icon: <Layers className="w-4 h-4" />, path: '/basic/components', badge: '12' },
      ]
    },
    { id: 'reference', label: 'Reference', icon: <FileText className="w-4 h-4" />, path: '/reference', badge: '3' },
  ];

  // Sample user menu items for testing
  const userMenuItems: MenuItem[] = [
    { id: 'profile', label: 'Profile', icon: <User className="w-4 h-4" />, path: '/profile' },
    { id: 'settings', label: 'Settings', icon: <Settings className="w-4 h-4" />, path: '/settings' },
    { id: 'notifications', label: 'Notifications', icon: <Bell className="w-4 h-4" />, path: '/notifications', badge: 5 },
    { id: 'separator-1', type: 'separator', label: '' },
    { id: 'help', label: 'Help & Support', icon: <HelpCircle className="w-4 h-4" />, path: '/help' },
  ];

  const handleLogout = () => {
    console.log('Logging out...');
    // Add your logout logic here
  };

return (
     <div className="min-h-screen min-w-dvh bg---color-bg) transition-colors duration-300 relative mouse-gradient scrollbar-hide">
      {/* Main Content */}
      <div className="z-9999 sticky top-0 md:pb-2 max-w-7xl mx-auto md:min-w-full">
        {/* Header with Glass + Spotlight Effect */}
       {/* <Header /> */}
       <TopNavBar 
         title="My Project" 
         description="Testing Layout System"
         topNavItems={topNavItems}
         showTopNavMenu={true}
         userMenuItems={userMenuItems}
         onLogout={handleLogout}
       />

      </div>
      {children}
    </div>


)}

export default Layout;