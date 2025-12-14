import { ChevronLeft, ChevronRight } from 'lucide-react';
import { cn } from '@/utils/utilsCN';
import { useLayout } from '../AppLayout/AppLayoutProvider';
import { SideNavItem } from './SideNavItem';
import { SidebarFooter } from './SidebarFooter';
import type { NavItem } from '@/types/layout';

interface SideNavBarProps {
  items: NavItem[];
  isOpen?: boolean;
  isMini?: boolean;
  nestedNavStyle?: 'hybrid' | 'popover' | 'accordion';
  position?: 'left' | 'right';
  collapsible?: boolean;
  onCollapse?: () => void;
  className?: string;
}

/**
 * SideNavBar - Vertical navigation sidebar
 * 
 * Features:
 * - 3 nested navigation styles: hybrid, popover, accordion
 * - Mini mode (icons only)
 * - Collapsible with chevron toggle in header
 * - Built-in footer with settings/logout
 * - Hidden scrollbar for accordion overflow
 */
export function SideNavBar({
  items,
  isOpen = true,
  isMini = false,
  nestedNavStyle = 'hybrid',
  position = 'left',
  collapsible = false,
  onCollapse,
  className,
}: SideNavBarProps) {
  const { variant } = useLayout();
  
  if (!isOpen) return null;

  const width = isMini ? 'w-16' : 'w-60';
  const positionClass = position === 'left' ? 'left-0' : 'right-0';
  
  // Chevron logic:
  // - sidebar-persistent: Show chevron in header (collapsible mini mode)
  // - sidebar-hidden: No chevron (controlled by menu toggle, always full width)
  const showChevron = collapsible && variant === 'sidebar-persistent';

  return (
    <aside
      className={cn(
        'hidden  fixed top-16 z-40',
        'h-[calc(100vh-4rem)] max-h-[calc(100vh-4rem)]',
        'border-(--color-border) bg-(--color-bg)',
        'transition-all duration-300 ease-in-out',
        'flex flex-col',
        'overflow-hidden', // Hide overflow for scrollbar
        width,
        positionClass,
        position === 'left' ? 'border-r' : 'border-l',
        className
      )}
    >
      {/* Collapsible Toggle Button in Header (only for sidebar-persistent) */}
      {showChevron && (
        <div className="shrink-0 px-3 py-2 border-b border-(--color-border) flex justify-end">
          <button
            onClick={onCollapse}
            className={cn(
              'inline-flex items-center justify-center rounded-lg p-2',
              'text-(--color-text-secondary) hover:text-(--color-text)',
              'hover:bg-(--color-bg-secondary) transition-colors',
              'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-(--color-brand)'
            )}
            aria-label={isMini ? 'Expand sidebar' : 'Collapse sidebar'}
          >
             
            {isMini ? (
              position === 'left' ? <ChevronRight className="h-4 w-4" /> : <ChevronLeft className="h-4 w-4" />
            ) : (
              position === 'left' ? <ChevronLeft className="h-4 w-4" /> : <ChevronRight className="h-4 w-4" />
            )}
          </button>
        </div>
      )}

      {/* Navigation Items - Scrollable with hidden scrollbar */}
      <nav
        className={cn(
          'flex-1 min-h-0 overflow-y-auto overflow-x-hidden',
          'scrollbar-thin scrollbar-hide',
          'py-4 px-2 space-y-1'
        )}
      >
        {items.map(item => (
          <SideNavItem
            key={item.id}
            item={item}
            level={0}
            nestedNavStyle={nestedNavStyle}
            isMini={isMini}
          />
        ))}
      </nav>

      {/* Footer Section - Always at bottom */}
      <div
        className={cn(
          'shrink-0 px-3 py-4 border-t border-(--color-border)',
          isMini && 'px-2'
        )}
      >
        <SidebarFooter />
      </div>
    </aside>
  );
}
