import { ChevronDown, ChevronRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import * as DropdownMenu from '@radix-ui/react-dropdown-menu';
import { cn } from '@/utils/utilsCN';
import type { NavItem, MenuItem } from '@/types/layout';

interface NavDropdownProps {
  item: NavItem;
  level?: number;
}

/**
 * Recursive NavDropdown component that handles nested navigation
 * - Supports unlimited nesting levels
 * - Clicking label navigates to route
 * - Clicking arrow opens dropdown
 */
export function NavDropdown({ item, level = 0 }: NavDropdownProps) {
  const isTopLevel = level === 0;
  
  // Convert NavItem children to MenuItem format
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

  const menuItems = item.children ? convertToMenuItems(item.children) : [];

  // Recursive menu item renderer
  const renderMenuItem = (menuItem: MenuItem, itemLevel: number = 0): React.ReactNode => {
    // Handle group with children (nested dropdown)
    if (menuItem.type === 'group' && menuItem.children && menuItem.children.length > 0) {
      return (
        <DropdownMenu.Sub key={menuItem.id}>
          <DropdownMenu.SubTrigger
            className={cn(
              'relative flex cursor-pointer select-none items-center',
              'rounded-md px-3 py-2 text-sm outline-none w-full',
              'text-(--color-text-secondary)',
              'hover:bg-(--color-bg-secondary) hover:text-(--color-text)',
              'focus:bg-(--color-bg-secondary) focus:text-(--color-text)',
              'data-disabled:pointer-events-none data-disabled:opacity-50',
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
                'data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95',
                'data-[side=bottom]:slide-in-from-top-2',
                'data-[side=left]:slide-in-from-right-2',
                'data-[side=right]:slide-in-from-left-2',
                'data-[side=top]:slide-in-from-bottom-2'
              )}
              sideOffset={4}
            >
              {menuItem.children.map(child => renderMenuItem(child, itemLevel + 1))}
            </DropdownMenu.SubContent>
          </DropdownMenu.Portal>
        </DropdownMenu.Sub>
      );
    }

    // Regular menu item with optional link
    return (
      <DropdownMenu.Item
        key={menuItem.id}
        disabled={menuItem.disabled}
        onClick={menuItem.onClick}
        asChild={!!menuItem.path}
        className={cn(
          'relative flex cursor-pointer select-none items-center',
          'rounded-md px-3 py-2 text-sm outline-none w-full',
          'text-(--color-text-secondary)',
          'hover:bg-(--color-bg-secondary) hover:text-(--color-text)',
          'focus:bg-(--color-bg-secondary) focus:text-(--color-text)',
          'data-disabled:pointer-events-none data-disabled:opacity-50',
          'transition-colors',
          menuItem.variant === 'danger' && 'text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-950'
        )}
      >
        {menuItem.path ? (
          <Link to={menuItem.path} className="flex items-center w-full">
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

  // Top level navigation item with split behavior
  if (isTopLevel) {
    return (
      <DropdownMenu.Root>
        <div className="flex items-center">
          {/* Main button - navigates to route */}
          {item.path ? (
            <Link
              to={item.path}
              className={cn(
                'inline-flex items-center gap-2 pl-4 pr-2 py-2 rounded-l-lg',
                'text-sm font-medium text-(--color-text-secondary)',
                'hover:text-(--color-text) hover:bg-(--color-bg-secondary)',
                'transition-colors'
              )}
            >
              {item.icon && <span className="w-4 h-4">{item.icon}</span>}
              <span>{item.label}</span>
              {item.badge && (
                <span className="ml-2 min-w-5 h-5 px-1.5 flex items-center justify-center rounded-full bg-(--color-brand) text-white text-xs font-semibold">
                  {item.badge}
                </span>
              )}
            </Link>
          ) : (
            <button
              className={cn(
                'inline-flex items-center gap-2 pl-4 pr-2 py-2 rounded-l-lg',
                'text-sm font-medium text-(--color-text-secondary)',
                'hover:text-(--color-text) hover:bg-(--color-bg-secondary)',
                'transition-colors',
                'cursor-default'
              )}
            >
              {item.icon && <span className="w-4 h-4">{item.icon}</span>}
              <span>{item.label}</span>
              {item.badge && (
                <span className="ml-2 min-w-5 h-5 px-1.5 flex items-center justify-center rounded-full bg-(--color-brand) text-white text-xs font-semibold">
                  {item.badge}
                </span>
              )}
            </button>
          )}

          {/* Dropdown trigger - opens menu */}
          <DropdownMenu.Trigger asChild>
            <button
              className={cn(
                'inline-flex items-center justify-center p-2 pr-4 rounded-r-lg',
                'text-sm font-medium text-(--color-text-secondary)',
                'hover:text-(--color-text) hover:bg-(--color-bg-secondary)',
                'transition-colors',
                'border-l border-(--color-border)'
              )}
              aria-label={`Open ${item.label} menu`}
            >
              <ChevronDown className="w-4 h-4" />
            </button>
          </DropdownMenu.Trigger>
        </div>

        <DropdownMenu.Portal>
          <DropdownMenu.Content
            className={cn(
              'z-9999 min-w-48 overflow-hidden rounded-lg',
              'bg-(--color-surface) backdrop-blur-xl p-1',
              'shadow-lg border border-(--color-border)',
              'data-[state=open]:animate-in data-[state=closed]:animate-out',
              'data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0',
              'data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95',
              'data-[side=bottom]:slide-in-from-top-2',
              'data-[side=left]:slide-in-from-right-2',
              'data-[side=right]:slide-in-from-left-2',
              'data-[side=top]:slide-in-from-bottom-2'
            )}
            align="center"
            sideOffset={8}
          >
            {menuItems.map(menuItem => renderMenuItem(menuItem, 1))}
          </DropdownMenu.Content>
        </DropdownMenu.Portal>
      </DropdownMenu.Root>
    );
  }

  return null;
}
