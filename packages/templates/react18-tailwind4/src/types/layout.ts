import { ReactNode } from "react";

/**
 * Navigation item structure
 */
export interface NavItem {
  id: string;
  label: string;
  icon?: ReactNode;
  path?: string;
  badge?: string | number;
  children?: NavItem[];
  divider?: boolean;
  heading?: string;
  disabled?: boolean;
  permission?: string;
}

/**
 * User menu item
 */
export interface MenuItem {
  id: string;
  label: string;
  icon?: ReactNode;
  onClick?: () => void;
  path?: string;
  type?: 'default' | 'separator' | 'group' | 'custom';
  variant?: 'default' | 'danger';
  badge?: string | number;
  disabled?: boolean;
  children?: MenuItem[];
  render?: () => ReactNode;
  divider?: boolean; // deprecated, use type: 'separator'
}

/**
 * User configuration
 */
export interface UserConfig {
  name: string;
  email?: string;
  avatar?: string;
}

/**
 * Breadcrumb item
 */
export interface BreadcrumbItem {
  label: string;
  path?: string;
  icon?: ReactNode;
}

/**
 * Layout variant types
 */
export type LayoutVariant =
  | "top-only"
  | "sidebar-hidden"
  | "sidebar-persistent";

/**
 * Sidebar behavior on desktop
 */
export type SidebarBehavior = "push" | "overlay";

/**
 * Nested navigation style
 */
export type NestedNavStyle = "accordion" | "popover";

/**
 * Main AppLayout props
 */
export interface AppLayoutProps {
  // Layout configuration
  variant: LayoutVariant;

  // Navigation
  navItems: NavItem[];
  topNavItems?: NavItem[];

  // Sidebar configuration
  sidebarDefaultOpen?: boolean;
  sidebarCollapsible?: boolean;
  sidebarBehavior?: SidebarBehavior;
  nestedNavStyle?: NestedNavStyle;

  // Top navigation
  logo?: ReactNode;
  showTopNavMenu?: boolean;
  showSearch?: boolean;

  // User section
  user?: UserConfig;
  userMenuItems?: MenuItem[];
  onLogout?: () => void;

  // Content
  children: ReactNode;

  // Additional options
  className?: string;
}

/**
 * Layout context state
 */
export interface LayoutContextState {
  // Sidebar state
  isSidebarOpen: boolean;
  setIsSidebarOpen: (open: boolean) => void;
  sidebarMini: boolean;
  setSidebarMini: (mini: boolean) => void;

  // Mobile state
  mobileMenuOpen: boolean;
  setMobileMenuOpen: (open: boolean) => void;

  //togglestate
  toggleSidebar: () => void;
  toggleSidebarMini: () => void;
  toggleMobileMenu: () => void;

  // Variant
  variant: LayoutVariant;

  // Sidebar config
  sidebarBehavior: SidebarBehavior;
  nestedNavStyle: NestedNavStyle;
}
