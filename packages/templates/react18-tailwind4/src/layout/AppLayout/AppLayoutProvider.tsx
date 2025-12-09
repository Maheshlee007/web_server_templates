import { createContext, useState, useEffect, type ReactNode, useContext } from "react";
import type {
  LayoutContextState,
  LayoutVariant,
  SidebarBehavior,
  NestedNavStyle,
  NavItem,
  MenuItem,
  UserConfig,
} from "@/types/layout";

export const AppLayoutContext = createContext<LayoutContextState | undefined>(
  undefined
);

interface AppLayoutProviderProps {
  // Layout config
  variant: LayoutVariant;
  sidebarDefaultOpen?: boolean;
  nestedNavStyle?: NestedNavStyle;
  sidebarCollapsible?: boolean;
  sidebarBehavior?: SidebarBehavior;
  // App-specific config
  title?: string;
  logo?: ReactNode;
  
  // User config
  user?: UserConfig;
  onLogout?: () => void;

  children: ReactNode;
}

export function AppLayoutProvider({
  variant,
  sidebarDefaultOpen = true,
  nestedNavStyle = 'hybrid',
  sidebarBehavior = 'push',
  sidebarCollapsible = true,
  title,
  logo,
  user,
  onLogout,
  children,
}: AppLayoutProviderProps) {
  const [isSidebarOpen, setIsSidebarOpen] =
    useState<boolean>(sidebarDefaultOpen);
  const [sidebarMini, setSidebarMini] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);
  const toggleSidebarMini = () => setSidebarMini(!sidebarMini);
  const toggleMobileMenu = () => setMobileMenuOpen(!mobileMenuOpen);

  // Handle screen resize: reset states when switching between mobile/desktop
  useEffect(() => {
    const handleResize = () => {
      const isDesktop = window.innerWidth >= 1024;
      
      if (isDesktop) {
        // On desktop: close mobile drawer
        if (mobileMenuOpen) {
          setMobileMenuOpen(false);
        }
      } else {
        // On mobile: close desktop sidebar and reset mini mode
        if (isSidebarOpen && variant !== 'top-only') {
          setIsSidebarOpen(false);
        }
        if (sidebarMini) {
          setSidebarMini(false);
        }
      }
    };

    // Initial check
    handleResize();

    // Add resize listener
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [mobileMenuOpen, isSidebarOpen, sidebarMini, variant]);

  const value: LayoutContextState = {
    isSidebarOpen,
    setIsSidebarOpen,
    sidebarMini,
    setSidebarMini,
    mobileMenuOpen,
    setMobileMenuOpen,
    variant,
    nestedNavStyle,
    sidebarBehavior,
    sidebarCollapsible,
    logo,
    title,
    user,
    onLogout,
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