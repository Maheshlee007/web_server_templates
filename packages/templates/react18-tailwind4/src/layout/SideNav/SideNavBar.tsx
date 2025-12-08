import { ChevronLeft, ChevronRight } from 'lucide-react';
import { cn } from '@/utils/utilsCN';
import { SideNavItem } from './SideNavItem';
import type { NavItem } from '@/types/layout';

interface SideNavBarProps {
  items: NavItem[];
  isOpen?: boolean;
  isMini?: boolean;
  nestedNavStyle?: 'hybrid' | 'popover' | 'accordion';
  position?: 'left' | 'right';
  collapsible?: boolean;
  onCollapse?: () => void;
  header?: React.ReactNode;
  footer?: React.ReactNode;
  className?: string;
}

/**
 * SideNavBar - Vertical navigation sidebar
 * 
 * Features:
 * - 3 nested navigation styles: hybrid, popover, accordion
 * - Mini mode (icons only)
 * - Collapsible
 * - Custom header/footer
 * - Hidden scrollbar for accordion overflow
 */
export function SideNavBar({
  items,
  isOpen = true,
  isMini = false,
  nestedNavStyle = 'hybrid',
  position = 'left',
  collapsible = true,
  onCollapse,
  header,
  footer,
  className,
}: SideNavBarProps) {
  if (!isOpen) return null;

  const width = isMini ? 'w-16' : 'w-60';
  const positionClass = position === 'left' ? 'left-0' : 'right-0';

  return (
    <aside
      className={cn(
        'fixed top-16 h-[calc(100vh-4rem)] z-40',
        'border-(--color-border) bg-(--color-bg)',
        'transition-all duration-300 ease-in-out',
        'flex flex-col',
        width,
        positionClass,
        position === 'left' ? 'border-r' : 'border-l',
        className
      )}
    >
      {/* Header Section */}
      {header && (
        <div
          className={cn(
            'flex-shrink-0 px-3 py-4 border-b border-(--color-border)',
            isMini && 'px-2'
          )}
        >
          {header}
        </div>
      )}

      {/* Navigation Items - Scrollable with hidden scrollbar */}
      <nav
        className={cn(
          'flex-1 overflow-y-auto overflow-x-hidden',
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

      {/* Footer Section */}
      {footer && (
        <div
          className={cn(
            'flex-shrink-0 px-3 py-4 border-t border-(--color-border)',
            isMini && 'px-2'
          )}
        >
          {footer}
        </div>
      )}

      {/* Collapse Toggle Button */}
      {collapsible && onCollapse && (
        <button
          onClick={onCollapse}
          className={cn(
            'absolute -right-3 top-20 z-50',
            'w-6 h-6 rounded-full',
            'bg-(--color-bg) border border-(--color-border)',
            'flex items-center justify-center',
            'hover:bg-(--color-bg-secondary)',
            'shadow-md transition-colors',
            position === 'right' && '-left-3'
          )}
          aria-label={isMini ? 'Expand sidebar' : 'Collapse sidebar'}
        >
          {position === 'left' ? (
            isMini ? (
              <ChevronRight className="w-4 h-4 text-(--color-text-secondary)" />
            ) : (
              <ChevronLeft className="w-4 h-4 text-(--color-text-secondary)" />
            )
          ) : isMini ? (
            <ChevronLeft className="w-4 h-4 text-(--color-text-secondary)" />
          ) : (
            <ChevronRight className="w-4 h-4 text-(--color-text-secondary)" />
          )}
        </button>
      )}
    </aside>
  );
}
