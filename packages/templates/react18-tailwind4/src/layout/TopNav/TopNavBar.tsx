import { Menu, Search, MoonStar, Sun } from 'lucide-react';
import { Link } from 'react-router-dom';
import { cn } from '@/utils/utilsCN';
import { useLayout } from '../AppLayout/AppLayoutProvider';
import { useTheme } from '@/context/themeContext';
import { UserContextMenu } from './UserContextMenu';
import { NavDropdown } from './NavDropdown';
import type { NavItem, UserConfig, MenuItem } from '@/types/layout';

interface TopNavBarProps {
  // Top nav config
  logo?: React.ReactNode;
  topNavItems?: NavItem[];
  showTopNavMenu?: boolean;
  title?: string;
  description?: string;
  
  // User config
  user?: UserConfig;
  userMenuItems?: MenuItem[];
  onLogout?: () => void;
  
  // Features
  showSearch?: boolean;
  
  // Mobile menu toggle
  showMenuToggle?: boolean;
}

export function TopNavBar({
  logo,
  title,
  description,
  topNavItems = [],
  showTopNavMenu = false,
  user={name:'Mahesh Lee', email:'ML@info.com'},
  userMenuItems = [],
  onLogout,
  showSearch = true,
  showMenuToggle = false,
}: TopNavBarProps) {
  const { variant, toggleMobileMenu, toggleSidebar, isSidebarOpen } = useLayout();
  const { setTheme, isDarkMode } = useTheme();
  const handleMenuToggle = () => {
    // Mobile: toggle mobile menu
    if (window.innerWidth < 1024) {
      toggleMobileMenu();
    } else {
      // Desktop: toggle sidebar
      toggleSidebar();
    }
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b border-(--color-border) bg-(--color-bg) backdrop-blur supports-[backdrop-filter]:bg-(--color-bg)/95">
      <div className="flex h-16 justify-between items-center gap-4 px-4 lg:px-6">
        {/* Left Section: Menu Toggle + Logo */}
        <div className="flex items-center gap-3">
          {/* Menu Toggle (only show if sidebar exists) */}
          {showMenuToggle && (
            <button
              onClick={handleMenuToggle}
              className={cn(
                "inline-flex items-center justify-center rounded-lg p-2",
                "text-(--color-text-secondary) hover:text-(--color-text)",
                "hover:bg-(--color-bg-secondary) transition-colors",
                "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-(--color-brand)"
              )}
              aria-label="Toggle menu"
            >
              <Menu className="h-5 w-5" />
            </button>
          )}

          {/* Logo & Title */}
          {logo ? (
            <Link 
              to="/" 
              className="flex items-center gap-3 font-semibold text-(--color-text) hover:text-(--color-brand) transition-colors"
            >
              {logo}
              
            </Link>
          ) : <div className="h-8 w-8 rounded-full bg-(--color-brand) flex items-center justify-center text-white text-sm font-medium bg-gradient-to-br from-purple-500 to-indigo-600">
          {title?.charAt(0).toUpperCase()}
        </div>}
        {title && (
                <div className="flex flex-col">
                  <span className="text-base font-semibold">{title}</span>
                  {description && (
                    <span className="text-xs text-(--color-text-tertiary) font-normal">
                      {description}
                    </span>
                  )}
                </div>
              )}
        </div>

        {/* Center Section: Top Nav Items (only for top-only variant) */}
        {showTopNavMenu && variant === 'top-only' && topNavItems.length > 0 && (
          <nav className="hidden lg:flex items-center gap-1 mx-auto rounded-full px-2 py-1 bg-(--color-bg-secondary)/50 backdrop-blur-sm">
            {topNavItems.map((item) => {
              // If item has children, render with NavDropdown (split behavior)
              if (item.children && item.children.length > 0) {
                return <NavDropdown key={item.id} item={item} />;
              }

              // Regular nav item without children
              return (
                <Link
                  key={item.id}
                  to={item.path || '#'}
                  className={cn(
                    'inline-flex items-center gap-2 px-4 py-2 rounded-lg',
                    'text-sm font-medium text-(--color-text-secondary)',
                    'hover:text-(--color-text) hover:bg-(--color-bg-secondary)',
                    'transition-colors'
                  )}
                >
                  {item.icon && <span className="w-4 h-4">{item.icon}</span>}
                  <span>{item.label}</span>
                  {item.badge && (
                    <span className="ml-auto min-w-5 h-5 px-1.5 flex items-center justify-center rounded-full bg-(--color-brand) text-white text-xs font-semibold">
                      {item.badge}
                    </span>
                  )}
                </Link>
              );
            })}
          </nav>
        )}

        {/* Right Section: Search + Theme + User */}
        <div className="ml-auto flex items-center gap-2">
          {/* Search Button */}
          {showSearch && (
            <button
              className={cn(
                "inline-flex items-center justify-center rounded-lg p-2",
                "text-(--color-text-secondary) hover:text-(--color-text)",
                "hover:bg-(--color-bg-secondary) transition-colors",
                "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-(--color-brand)"
              )}
              aria-label="Search"
            >
              <Search className="h-5 w-5" />
            </button>
          )}

          {/* Dark/Light Mode Toggle */}
          <button
            onClick={() => setTheme(isDarkMode ? 'light' : 'dark')}
            className={cn(
              "inline-flex items-center justify-center rounded-lg p-2",
              "text-(--color-text-secondary) hover:text-(--color-text)",
              "hover:bg-(--color-bg-secondary) transition-colors",
              "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-(--color-brand)"
            )}
            aria-label={isDarkMode ? 'Switch to light mode' : 'Switch to dark mode'}
          >
            {isDarkMode ? (
              <Sun className="h-5 w-5 text-yellow-500" />
            ) : (
              <MoonStar className="h-5 w-5" />
            )}
          </button>

          {/* User Menu */}
          {user && (
            <UserContextMenu
              user={user}
              menuItems={userMenuItems}
              onLogout={onLogout}
            />
          )}
        </div>
      </div>
    </header>
  );
}