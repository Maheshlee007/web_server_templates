import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ChevronDown, ChevronRight } from 'lucide-react';
import * as DropdownMenu from '@radix-ui/react-dropdown-menu';
import { cn } from '@/utils/utilsCN';
import type { NavItem, MenuItem } from '@/types/layout';

interface SideNavItemProps {
  item: NavItem;
  level?: number;
  nestedNavStyle: 'hybrid' | 'popover' | 'accordion';
  isMini?: boolean;
  onItemClick?: () => void;
}

/**
 * Recursive SideNavItem component
 * Supports 3 styles: hybrid, popover, accordion
 */
export function SideNavItem({
  item,
  level = 0,
  nestedNavStyle,
  isMini = false,
  onItemClick,
}: SideNavItemProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const location = useLocation();
  const isActive = item.path === location.pathname;
  const hasChildren = item.children && item.children.length > 0;

  // Determine if we should use popover for this level
  const usePopover =
    isMini || // Always popover in mini mode
    nestedNavStyle === 'popover' || // Pure popover mode
    (nestedNavStyle === 'hybrid' && level > 0); // Hybrid: Level 2+ uses popover

  // Convert NavItem children to MenuItem for popover
  const convertToMenuItems = (items: NavItem[]): MenuItem[] => {
    return items.map(child => ({
      id: child.id,
      label: child.label,
      icon: child.icon,
      path: child.path,
      badge: child.badge,
      disabled: child.disabled,
      type: child.children && child.children.length > 0 ? 'group' : 'default',
      children: child.children ? convertToMenuItems(child.children) : undefined,
    }));
  };

  // Recursive menu item renderer for nested popovers
  const renderMenuItem = (menuItem: MenuItem): React.ReactNode => {
    if (menuItem.type === 'group' && menuItem.children && menuItem.children.length > 0) {
      return (
        <DropdownMenu.Sub key={menuItem.id}>
          <DropdownMenu.SubTrigger
            className={cn(
              'relative flex cursor-pointer select-none items-center w-full',
              'rounded-md px-3 py-2 text-sm outline-none',
              'text-(--color-text-secondary)',
              'hover:bg-(--color-surface-hover) hover:text-(--color-text)',
              'focus:bg-(--color-surface-hover) focus:text-(--color-text)',
              'transition-colors'
            )}
          >
            {menuItem.icon && (
              <span className="mr-2 h-4 w-4 flex items-center justify-center">
                {menuItem.icon}
              </span>
            )}
            <span className="flex-1">{menuItem.label}</span>
            {menuItem.badge && (
              <span className="mr-1 text-xs px-1.5 py-0.5 rounded-full bg-(--color-brand) text-white font-medium">
                {menuItem.badge}
              </span>
            )}
            <ChevronRight className="ml-auto h-4 w-4" />
          </DropdownMenu.SubTrigger>
          <DropdownMenu.Portal>
            <DropdownMenu.SubContent
              className={cn(
                'z-9999 min-w-48 overflow-hidden rounded-lg',
                'bg-(--color-surface) backdrop-blur-xl p-1',
                'shadow-lg border border-(--color-border)',
                'data-[state=open]:animate-in data-[state=closed]:animate-out',
                'data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0',
                'data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95'
              )}
              sideOffset={4}
            >
              {menuItem.children.map(renderMenuItem)}
            </DropdownMenu.SubContent>
          </DropdownMenu.Portal>
        </DropdownMenu.Sub>
      );
    }

    return (
      <DropdownMenu.Item
        key={menuItem.id}
        disabled={menuItem.disabled}
        asChild={!!menuItem.path}
        className={cn(
          'relative flex cursor-pointer select-none items-center w-full',
          'rounded-md px-3 py-2 text-sm outline-none',
          'text-(--color-text-secondary)',
          'hover:bg-(--color-surface-hover) hover:text-(--color-text)',
          'focus:bg-(--color-surface-hover) focus:text-(--color-text)',
          'transition-colors'
        )}
      >
        {menuItem.path ? (
          <Link to={menuItem.path} className="flex items-center w-full" onClick={onItemClick}>
            {menuItem.icon && (
              <span className="mr-2 h-4 w-4 flex items-center justify-center">
                {menuItem.icon}
              </span>
            )}
            <span className="flex-1">{menuItem.label}</span>
            {menuItem.badge && (
              <span className="ml-auto text-xs px-1.5 py-0.5 rounded-full bg-(--color-brand) text-white font-medium">
                {menuItem.badge}
              </span>
            )}
          </Link>
        ) : (
          <>
            {menuItem.icon && (
              <span className="mr-2 h-4 w-4 flex items-center justify-center">
                {menuItem.icon}
              </span>
            )}
            <span className="flex-1">{menuItem.label}</span>
            {menuItem.badge && (
              <span className="ml-auto text-xs px-1.5 py-0.5 rounded-full bg-(--color-brand) text-white font-medium">
                {menuItem.badge}
              </span>
            )}
          </>
        )}
      </DropdownMenu.Item>
    );
  };

  // POPOVER MODE (Mini mode, Pure popover, or Hybrid Level 2+)
  if (usePopover && hasChildren) {
    const menuItems = convertToMenuItems(item.children!);

    return (
      <DropdownMenu.Root>
        <DropdownMenu.Trigger asChild>
          <button
            className={cn(
              'flex items-center w-full gap-2 px-3 py-2 rounded-lg',
              'text-sm font-medium text-(--color-text-secondary)',
              'hover:text-(--color-text) hover:bg-(--color-bg-secondary)',
              'transition-colors group',
              isActive && 'bg-(--color-brand) text-white hover:bg-(--color-brand-hover)',
              isMini && 'justify-center px-2'
            )}
          >
            {item.icon && (
              <span className={cn('w-5 h-5 flex items-center justify-center', isMini && 'w-6 h-6')}>
                {item.icon}
              </span>
            )}
            {!isMini && (
              <>
                <span className="flex-1 text-left truncate">{item.label}</span>
                {item.badge && (
                  <span className="text-xs px-1.5 py-0.5 rounded-full bg-(--color-brand) text-white font-medium">
                    {item.badge}
                  </span>
                )}
                <ChevronRight className="w-4 h-4 ml-auto opacity-50 group-hover:opacity-100" />
              </>
            )}
          </button>
        </DropdownMenu.Trigger>

        <DropdownMenu.Portal>
          <DropdownMenu.Content
            className={cn(
              'z-9999 min-w-48 overflow-hidden rounded-lg',
              'bg-(--color-surface) backdrop-blur-xl p-1',
              'shadow-lg border border-(--color-border)',
              'data-[state=open]:animate-in data-[state=closed]:animate-out',
              'data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0',
              'data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95'
            )}
            side="right"
            align="start"
            sideOffset={8}
          >
            {menuItems.map(renderMenuItem)}
          </DropdownMenu.Content>
        </DropdownMenu.Portal>
      </DropdownMenu.Root>
    );
  }

  // ACCORDION MODE (Pure accordion or Hybrid Level 1)
  const handleClick = () => {
    if (hasChildren) {
      setIsExpanded(!isExpanded);
    } else if (item.path) {
      onItemClick?.();
    }
  };

  return (
    <div>
      {/* Item Button/Link */}
      {item.path && !hasChildren ? (
        <Link
          to={item.path}
          onClick={onItemClick}
          className={cn(
            'flex items-center w-full gap-2 px-3 py-2 rounded-lg',
            'text-sm font-medium text-(--color-text-secondary)',
            'hover:text-(--color-text) hover:bg-(--color-bg-secondary)',
            'transition-colors',
            isActive && 'bg-(--color-brand) text-white hover:bg-(--color-brand-hover)',
            isMini && 'justify-center px-2'
          )}
          style={{ paddingLeft: isMini ? undefined : `${0.75 + level * 0.75}rem` }}
        >
          {item.icon && (
            <span className={cn('w-5 h-5 flex items-center justify-center', isMini && 'w-6 h-6')}>
              {item.icon}
            </span>
          )}
          {!isMini && (
            <>
              <span className="flex-1 text-left truncate">{item.label}</span>
              {item.badge && (
                <span className="text-xs px-1.5 py-0.5 rounded-full bg-(--color-brand) text-white font-medium">
                  {item.badge}
                </span>
              )}
            </>
          )}
        </Link>
      ) : (
        <button
          onClick={handleClick}
          className={cn(
            'flex items-center w-full gap-2 px-3 py-2 rounded-lg',
            'text-sm font-medium text-(--color-text-secondary)',
            'hover:text-(--color-text) hover:bg-(--color-bg-secondary)',
            'transition-colors',
            isActive && 'bg-(--color-brand) text-white hover:bg-(--color-brand-hover)',
            isMini && 'justify-center px-2'
          )}
          style={{ paddingLeft: isMini ? undefined : `${0.75 + level * 0.75}rem` }}
        >
          {item.icon && (
            <span className={cn('w-5 h-5 flex items-center justify-center', isMini && 'w-6 h-6')}>
              {item.icon}
            </span>
          )}
          {!isMini && (
            <>
              <span className="flex-1 text-left truncate">{item.label}</span>
              {item.badge && (
                <span className="text-xs px-1.5 py-0.5 rounded-full bg-(--color-brand) text-white font-medium">
                  {item.badge}
                </span>
              )}
              {hasChildren && (
                <ChevronDown
                  className={cn(
                    'w-4 h-4 ml-auto transition-transform',
                    isExpanded && 'rotate-180'
                  )}
                />
              )}
            </>
          )}
        </button>
      )}

      {/* Accordion Children */}
      {hasChildren && isExpanded && !isMini && (
        <div className="mt-1">
          {item.children!.map(child => (
            <SideNavItem
              key={child.id}
              item={child}
              level={level + 1}
              nestedNavStyle={nestedNavStyle}
              isMini={isMini}
              onItemClick={onItemClick}
            />
          ))}
        </div>
      )}
    </div>
  );
}
