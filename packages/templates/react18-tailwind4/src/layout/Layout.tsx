import React from "react";
import Header from "./Header";
import { TopNavBar } from "./TopNav/TopNavBar";
import { SideNavBar } from "./SideNav/SideNavBar";
import { SideNavMobile } from "./SideNav/SideNavMobile";
import { Home, FileText, Settings, User, Bell, HelpCircle, LogOut, BookOpen, Code, Layers, Package, Zap, Database, Palette, Shield } from 'lucide-react';
import { useLayout } from './AppLayout/AppLayoutProvider';
import { cn } from '@/utils/utilsCN';
import type { NavItem, MenuItem } from "@/types/layout";

function Layout({children}: {children: React.ReactNode}) {
  const { variant, isSidebarOpen, sidebarMini, mobileMenuOpen,sidebarBehavior,nestedNavStyle, toggleSidebar, toggleSidebarMini, toggleMobileMenu } = useLayout();
  
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

  // Side navigation items (can be different from top nav or same)
  const sideNavItems: NavItem[] = [
    { id: 'dashboard', label: 'Dashboard', icon: <Home className="w-5 h-5" />, path: '/' },
    { 
      id: 'projects', 
      label: 'Projects', 
      icon: <FileText className="w-5 h-5" />, 
      path: '/basic',
      badge: '8',
      children: [
        { id: 'active', label: 'Active Projects', icon: <Zap className="w-4 h-4" />, path: '/basic/docs' },
        { id: 'archived', label: 'Archived', icon: <Package className="w-4 h-4" />, path: '/basic/examples' },
        { 
          id: 'templates', 
          label: 'Templates', 
          icon: <Layers className="w-4 h-4" />, 
          path: '/basic/components',
          children: [
            { id: 'react-templates', label: 'React Templates', path: '/basic/examples/react', badge: '12' },
            { id: 'vue-templates', label: 'Vue Templates', path: '/basic/examples/vue' },
            { 
              id: 'advanced-templates', 
              label: 'Advanced', 
              path: '/basic/examples/advanced',
              children: [
                { id: 'design-systems', label: 'Design Systems', path: '/basic/examples/advanced/patterns' },
                { id: 'performance', label: 'Performance', path: '/basic/examples/advanced/performance' },
              ]
            },
          ]
        },
      ]
    },
    { id: 'components', label: 'Components', icon: <Code className="w-5 h-5" />, path: '/reference' },
    { id: 'themes', label: 'Themes', icon: <Palette className="w-5 h-5" />, path: '/themes', badge: '6' },
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

  // Determine if we should show sidebar
  const showSidebar = variant !== 'top-only';

return (
     <div className="min-h-screen min-w-dvh bg---color-bg) transition-colors duration-300 relative mouse-gradient scrollbar-hide">
      {/* Top Navigation */}
      <TopNavBar 
         title="My Project" 
         description="Testing Layout System"
         topNavItems={topNavItems}
         showTopNavMenu={variant === 'top-only'}
         userMenuItems={userMenuItems}
         onLogout={handleLogout}
         showMenuToggle={showSidebar}
       />

      {/* Desktop Side Navigation */}
      {showSidebar && (
        <SideNavBar
          items={sideNavItems}
          isOpen={isSidebarOpen}
          isMini={sidebarMini}
          nestedNavStyle={nestedNavStyle} // Try: "hybrid" | "popover" | "accordion"
          collapsible={true}
          onCollapse={toggleSidebarMini}
          footer={
            <div className="space-y-1">
              <button className="flex items-center w-full gap-2 px-3 py-2 rounded-lg text-sm text-(--color-text-secondary) hover:bg-(--color-bg-secondary) transition-colors">
                <Settings className="w-4 h-4" />
                {!sidebarMini && <span>Settings</span>}
              </button>
              <button className="flex items-center w-full gap-2 px-3 py-2 rounded-lg text-sm text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-950 transition-colors">
                <LogOut className="w-4 h-4" />
                {!sidebarMini && <span>Logout</span>}
              </button>
            </div>
          }
        />
      )}

      {/* Mobile Side Navigation Drawer */}
      {showSidebar && (
        <SideNavMobile
          items={sideNavItems}
          isOpen={mobileMenuOpen}
          onClose={toggleMobileMenu}
          footer={
            <div className="space-y-1">
              <button className="flex items-center w-full gap-2 px-3 py-2 rounded-lg text-sm text-(--color-text-secondary) hover:bg-(--color-bg-secondary) transition-colors">
                <Settings className="w-5 h-5" />
                <span>Settings</span>
              </button>
              <button className="flex items-center w-full gap-2 px-3 py-2 rounded-lg text-sm text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-950 transition-colors">
                <LogOut className="w-5 h-5" />
                <span>Logout</span>
              </button>
            </div>
          }
        />
      )}

      {/* Main Content */}
      <main 
        className={cn(
          'transition-all duration-300',
          showSidebar && isSidebarOpen && !sidebarMini && 'lg:pl-60',
          showSidebar && isSidebarOpen && sidebarMini && 'lg:pl-16'
        )}
      >
        <div className="pt-16">
          {children}
        </div>
      </main>
    </div>


)}

export default Layout;