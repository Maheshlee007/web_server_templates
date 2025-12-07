import { createContext, useState, useEffect, type ReactNode, useContext } from "react";
import {
  LayoutContextState,
  LayoutVariant,
  SidebarBehavior,
  NestedNavStyle,
} from "@/types/layout";

export const AppLayoutContext = createContext<LayoutContextState | undefined>(
  undefined
);

interface AppLayoutProviderProps {
  variant: LayoutVariant;
  sidebarDefaultOpen?: boolean;
  sidebarBehavior: SidebarBehavior;
  nestedNavStyle: NestedNavStyle;
  children: ReactNode;
}

export function AppLayoutProvider({
  variant,
  sidebarDefaultOpen = false,
  sidebarBehavior,
  nestedNavStyle,
  children,
}: AppLayoutProviderProps) {
  const [isSidebarOpen, setIsSidebarOpen] =
    useState<boolean>(sidebarDefaultOpen);
  const [sidebarMini, setSidebarMini] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Close mobile menu on route change
  // useEffect(() => {
  // const handleRouteChange = () => setMobileMenuOpen(false);
  // window.addEventListener('popstate', handleRouteChange);
  // return () => window.removeEventListener('popstate', handleRouteChange);
  // }, []);

  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);
  const toggleSidebarMini = () => setSidebarMini(!sidebarMini);
  const toggleMobileMenu = () => setMobileMenuOpen(!mobileMenuOpen);

  const value: LayoutContextState = {
    isSidebarOpen,
    setIsSidebarOpen,
    sidebarMini,
    setSidebarMini,
    mobileMenuOpen,
    setMobileMenuOpen,
    variant,
    sidebarBehavior,
    nestedNavStyle,
    toggleSidebar,
    toggleSidebarMini,
    toggleMobileMenu,
  };
  return (
    <AppLayoutContext.Provider value={value}>
      {children}
    </AppLayoutContext.Provider>
  );
}

export function useLayout() {
  const context = useContext(AppLayoutContext);
 /**
 * Hook to access layout state and controls
 * 
 * @example
 * const { sidebarOpen, setSidebarOpen, toggleSidebar } = useLayout();
 */
  
  if (!context) {
    throw new Error('useLayout must be used within AppLayoutProvider');
  }

  return context;
}