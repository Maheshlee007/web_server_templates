import { Link, useLocation } from 'react-router-dom';
import { Home, ChevronRight } from 'lucide-react';
import { cn } from '@/utils/utilsCN';
import type { NavItem } from '@/types/layout';
import type { ReactNode } from 'react';
import { useState } from 'react';

export interface BreadcrumbItem {
  label: string;
  path?: string;
  icon?: ReactNode;
  isHidden?: boolean; // Mark items that are hidden in collapsed view
}

export interface BreadcrumbsProps {
  /** Navigation items to match against (for labels and icons) */
  navItems?: NavItem[];
  /** Custom breadcrumb items (overrides auto-generation) */
  items?: BreadcrumbItem[];
  /** Separator between breadcrumb items */
  separator?: ReactNode;
  /** Show home icon for first item */
  showHomeIcon?: boolean;
  /** Show icons from navigation items */
  showIcons?: boolean;
  /** Custom home path */
  homePath?: string;
  /** Custom home label */
  homeLabel?: string;
  /** Additional CSS classes */
  className?: string;
  /** Max items to show before collapsing middle ones */
  maxItems?: number;
}

/**
 * Breadcrumbs Component
 * 
 * Auto-generates breadcrumbs from current URL by matching with navigation items.
 * Only shows valid navigation items - stops at dynamic params (e.g., /posts/123)
 * 
 * Features:
 * - Auto-generation from navigation items only
 * - Icon support from navigation items
 * - Configurable separator
 * - Collapse middle items with hover dropdown
 * - Mobile responsive
 * - Stops at params/invalid routes (no fallback clutter)
 * 
 * @example
 * ```tsx
 * // Auto-generate from current route
 * <Breadcrumbs navItems={sideNavItems} />
 * 
 * // URL: /posts/123/comments
 * // Navigation has: { path: '/posts', label: 'Posts' }
 * // Shows: Home / Posts (stops at /posts, ignores /123/comments)
 * 
 * // Custom separator
 * <Breadcrumbs navItems={sideNavItems} separator="/" />
 * 
 * // Without icons
 * <Breadcrumbs navItems={sideNavItems} showIcons={false} />
 * 
 * // Manual override for custom breadcrumbs
 * <Breadcrumbs items={[
 *   { label: 'Home', path: '/', icon: <Home /> },
 *   { label: 'Products', path: '/products' },
 *   { label: 'Details' }
 * ]} />
 * ```
 */
export function Breadcrumbs({
  navItems,
  items: customItems,
  separator = <ChevronRight className="w-4 h-4" />,
  showHomeIcon = true,
  showIcons = true,
  homePath = '/',
  homeLabel = 'Home',
  className,
  maxItems = 3,
}: BreadcrumbsProps) {
  const location = useLocation();
  const [showDropdown, setShowDropdown] = useState(false);

  // Helper: Find nav item by path (recursive search through nested items)
  const findNavItemByPath = (items: NavItem[] | undefined, targetPath: string): NavItem | null => {
    if (!items) return null;

    for (const item of items) {
      // Exact match
      if (item.path === targetPath) {
        return item;
      }

      // Check children recursively
      if (item.children) {
        const found = findNavItemByPath(item.children, targetPath);
        if (found) return found;
      }
    }

    return null;
  };

  // Generate breadcrumb items from current URL
  const generateBreadcrumbs = (): BreadcrumbItem[] => {
    const pathSegments = location.pathname.split('/').filter(Boolean);
    
    // Start with home
    const breadcrumbs: BreadcrumbItem[] = [
      {
        label: homeLabel,
        path: homePath,
        icon: showHomeIcon ? <Home className="w-4 h-4" /> : undefined,
      },
    ];

    // If we're on home page, return just home
    if (pathSegments.length === 0) {
      return breadcrumbs;
    }

    // Build breadcrumbs - ONLY show valid nav items, stop at params
    let currentPath = '';
    for (let i = 0; i < pathSegments.length; i++) {
      currentPath += `/${pathSegments[i]}`;
      
      // Try to find matching nav item
      const navItem = findNavItemByPath(navItems, currentPath);

      if (navItem) {
        // Found in navigation - add it
        const isLast = i === pathSegments.length - 1;
        breadcrumbs.push({
          label: navItem.label,
          path: isLast ? undefined : currentPath, // Last item not clickable
          icon: showIcons ? navItem.icon : undefined,
        });
      } else {
        // Not found in navigation - STOP here (likely params or invalid route)
        // Don't add it to breadcrumbs
        break;
      }
    }

    return breadcrumbs;
  };

  // Use custom items or auto-generate
  const breadcrumbItems = customItems || generateBreadcrumbs();

  // Handle collapsing if maxItems is set
  const { displayItems, hiddenItems } = (() => {
    if (!maxItems || breadcrumbItems.length <= maxItems) {
      return { displayItems: breadcrumbItems, hiddenItems: [] };
    }

    // Keep first, last, and collapse middle
    const first = breadcrumbItems[0];
    const last = breadcrumbItems[breadcrumbItems.length - 1];
    const middle = breadcrumbItems.slice(1, -1);
    const visibleMiddle = middle.slice(-(maxItems - 2));
    const hidden = middle.slice(0, middle.length - (maxItems - 2));

    // Mark hidden items
    const hiddenWithFlag = hidden.map(item => ({ ...item, isHidden: true }));

    const display = [
      first,
      ...(hidden.length > 0 ? [{ label: '...', path: undefined, isEllipsis: true } as BreadcrumbItem & { isEllipsis?: boolean }] : []),
      ...visibleMiddle,
      last,
    ];

    return { displayItems: display, hiddenItems: hiddenWithFlag };
  })();

  return (
    <nav
      aria-label="Breadcrumb"
      className={cn(
        'flex items-center gap-2 text-sm',
        'px-4 py-3 bg-(--color-bg) border-b border-(--color-border)',
        className
      )}
    >
      <ol className="flex items-center gap-2 flex-wrap">
        {displayItems.map((item, index) => {
          const isLast = index === displayItems.length - 1;
          const isEllipsis = item.label === '...' && 'isEllipsis' in item;

          return (
            <li key={`${item.path}-${index}`} className="flex items-center gap-2">
              {/* Breadcrumb Item */}
              {isEllipsis ? (
                <div 
                  className="relative"
                  onClick={() => setShowDropdown(!showDropdown)}
                //   onMouseLeave={() => setShowDropdown(false)}
                >
                  <button
                    className={cn(
                      'text-(--color-text-secondary) px-2 py-1 rounded',
                      'hover:bg-(--color-bg-secondary) hover:text-(--color-text)',
                      'transition-colors cursor-pointer',
                      'flex items-center gap-1'
                    )}
                    aria-label="Show hidden breadcrumbs"
                  >
                    <span>•••</span>
                  </button>

                  {/* Dropdown */}
                  {showDropdown && hiddenItems.length > 0 && (
                    <div 
                      className={cn(
                        'absolute top-full left-0 mt-1 z-50',
                        'bg-(--color-bg) border border-(--color-border)',
                        'rounded-lg shadow-lg min-w-[200px]',
                        'py-2'
                      )}
                    >
                      {hiddenItems.map((hiddenItem, hiddenIndex) => (
                        <div key={`hidden-${hiddenIndex}`}>
                          {hiddenItem.path ? (
                            <Link
                              to={hiddenItem.path}
                              className={cn(
                                'flex items-center gap-2 px-4 py-2',
                                'text-(--color-text-secondary) hover:text-(--color-text)',
                                'hover:bg-(--color-bg-secondary)',
                                'transition-colors text-sm'
                              )}
                            >
                              {hiddenItem.icon && <span className="shrink-0">{hiddenItem.icon}</span>}
                              <span>{hiddenItem.label}</span>
                            </Link>
                          ) : (
                            <div
                              className={cn(
                                'flex items-center gap-2 px-4 py-2',
                                'text-(--color-text-secondary) text-sm'
                              )}
                            >
                              {hiddenItem.icon && <span className="shrink-0">{hiddenItem.icon}</span>}
                              <span>{hiddenItem.label}</span>
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              ) : item.path ? (
                <Link
                  to={item.path}
                  className={cn(
                    'flex items-center gap-1.5 transition-colors',
                    'text-(--color-text-secondary) hover:text-(--color-text)',
                    'hover:underline'
                  )}
                >
                  {item.icon && <span className="shrink-0">{item.icon}</span>}
                  <span>{item.label}</span>
                </Link>
              ) : (
                <span
                  className={cn(
                    'flex items-center gap-1.5',
                    isLast
                      ? 'text-(--color-text) font-medium'
                      : 'text-(--color-text-secondary)'
                  )}
                  aria-current={isLast ? 'page' : undefined}
                >
                  {item.icon && <span className="shrink-0">{item.icon}</span>}
                  <span>{item.label}</span>
                </span>
              )}

              {/* Separator */}
              {!isLast && (
                <span className="text-(--color-text-secondary) shrink-0" aria-hidden="true">
                  {separator}
                </span>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
