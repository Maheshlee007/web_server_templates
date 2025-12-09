import { TopNavBar } from './TopNav/TopNavBar';
import { SideNavBar } from './SideNav/SideNavBar';
import { SideNavMobile } from './SideNav/SideNavMobile';
import { useLayout } from './AppLayout/AppLayoutProvider';
import { cn } from '@/utils/utilsCN';
import type { AppLayoutProps } from '@/types/layout';
import { topNavItems, sideNavItems, userMenuItems } from './navigation';

/**
 * AppLayout - Main layout orchestrator
 * 
 * Integrates TopNav, SideNav (desktop & mobile), and main content
 * Navigation items are imported directly from './navigation'
 * Only essential app-specific props come from context (title, user, logo)
 * 
 * Usage:
 * ```tsx
 * <AppLayoutProvider variant="sidebar-persistent" title="My App" user={user}>
 *   <AppLayout>
 *     <YourContent />
 *   </AppLayout>
 * </AppLayoutProvider>
 * ```
 */
export function AppLayout({ children }: Pick<AppLayoutProps, 'children'>) {
  const {
    variant,
    isSidebarOpen,
    sidebarMini,
    nestedNavStyle,
    sidebarCollapsible,
    logo,
    title,
    user,
    onLogout,
    toggleSidebarMini,
    mobileMenuOpen
  } = useLayout();

  // Determine if we should show sidebar
  const showSidebar = variant !== 'top-only';
  const showTopNavMenu = variant === 'top-only';
  
  // For sidebar-hidden, disable mini mode
  const effectiveMini = variant === 'sidebar-hidden' ? false : sidebarMini;
  const effectiveCollapsible = variant === 'sidebar-persistent';

  return (
    <div className="min-h-screen min-w-screen bg-(--color-bg) transition-colors duration-300 relative">
      {/* Top Navigation */}
      <TopNavBar
        logo={logo}
        title={title}
        topNavItems={topNavItems}
        showTopNavMenu={showTopNavMenu}
        user={user}
        userMenuItems={userMenuItems}
        onLogout={onLogout}
      />

      {/* Desktop Side Navigation - Only for sidebar variants */}
      {showSidebar && (
        <SideNavBar
          items={sideNavItems}
          isOpen={isSidebarOpen}
          isMini={effectiveMini}
          nestedNavStyle={nestedNavStyle}
          collapsible={effectiveCollapsible}
          onCollapse={toggleSidebarMini}
        />
      )}

      {/* Mobile Side Navigation Drawer - Works for ALL variants including top-only */}
      {mobileMenuOpen && <SideNavMobile items={showSidebar ? sideNavItems : topNavItems} />}

      {/* Main Content */}
      <main
        className={cn(
          'transition-all duration-300',
          // sidebar-hidden and sidebar-persistent: full width sidebar
          showSidebar && isSidebarOpen && !effectiveMini && 'lg:pl-60',
          // sidebar-persistent only: mini mode
          showSidebar && isSidebarOpen && effectiveMini && 'lg:pl-16'
        )}
      >
        <div className="pt-16">{children}</div>
      </main>
    </div>
  );
}
