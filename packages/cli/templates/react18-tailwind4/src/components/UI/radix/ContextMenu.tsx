import * as DropdownMenu from '@radix-ui/react-dropdown-menu';
import { ChevronRight, LogOut } from 'lucide-react';
import { Link } from 'react-router-dom';
import { cn } from '../../../utils/utilsCN';
import { MenuItem, UserConfig } from '../../../types/layout';

export interface ContextMenuProps {
  trigger: React.ReactNode;
  menuItems?: MenuItem[];
  align?: 'start' | 'center' | 'end';
  sideOffset?: number;
  className?: string;
  contentClassName?: string;
}

export interface UserContextMenuProps extends Omit<ContextMenuProps, 'trigger'> {
  user: UserConfig;
  onLogout?: () => void;
  showUserInfo?: boolean;
}

/**
 * Generic ContextMenu component that can be used anywhere
 */
export function ContextMenu({
  trigger,
  menuItems = [],
  align = 'end',
  sideOffset = 8,
  className,
  contentClassName,
}: ContextMenuProps) {
  const renderMenuItem = (item: MenuItem) => {
    // Custom render function
    if (item.type === 'custom' && 'render' in item && item.render) {
      return <div key={item.id}>{item.render()}</div>;
    }

    if (item.type === 'separator') {
      return (
        <DropdownMenu.Separator
          key={item.id}
          className="h-px bg-(--color-border) my-1"
        />
      );
    }

    if (item.type === 'group' && item.children) {
      return (
        <DropdownMenu.Sub key={item.id}>
          <DropdownMenu.SubTrigger
            className={cn(
              'relative flex cursor-pointer select-none items-center',
              'rounded-md px-3 py-2 text-sm outline-none',
              'text-(--color-text-secondary)',
              'hover:bg-(--color-surface-hover)',
              'focus:bg-(--color-surface-hover)',
              'data-disabled:pointer-events-none data-disabled:opacity-50'
            )}
          >
            {item.icon && (
              <span className="mr-2 h-4 w-4 flex items-center justify-center">
                {item.icon}
              </span>
            )}
            <span>{item.label}</span>
            <ChevronRight className="ml-auto h-4 w-4" />
          </DropdownMenu.SubTrigger>
          <DropdownMenu.Portal>
            <DropdownMenu.SubContent
              className={cn(
                'z-9999 min-w-32 overflow-hidden rounded-lg',
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
              {item.children.map(renderMenuItem)}
            </DropdownMenu.SubContent>
          </DropdownMenu.Portal>
        </DropdownMenu.Sub>
      );
    }

    return (
      <DropdownMenu.Item
        key={item.id}
        disabled={item.disabled}
        onClick={item.onClick}
        asChild={!!item.path}
        className={cn(
          'relative flex cursor-pointer select-none items-center',
          'rounded-md px-3 py-2 text-sm outline-none w-full',
          'text-(--color-text-secondary)',
          'hover:bg-(--color-surface-hover)',
          'focus:bg-(--color-surface-hover)',
          'data-disabled:pointer-events-none data-disabled:opacity-50',
          item.variant === 'danger' && 'text-red-600 dark:text-red-400'
        )}
      >
        {item.path ? (
          <Link to={item.path} className="flex items-center w-full">
            {item.icon && (
              <span className="mr-2 h-4 w-4 flex items-center justify-center">
                {item.icon}
              </span>
            )}
            <span>{item.label}</span>
            {item.badge && (
              <span className="ml-auto text-xs px-1.5 py-0.5 rounded-full bg-(--color-brand) text-(--color-brand-foreground)">
                {item.badge}
              </span>
            )}
          </Link>
        ) : (
          <>
            {item.icon && (
              <span className="mr-2 h-4 w-4 flex items-center justify-center">
                {item.icon}
              </span>
            )}
            <span>{item.label}</span>
            {item.badge && (
              <span className="ml-auto text-xs text-(--color-text-tertiary)">
                {item.badge}
              </span>
            )}
          </>
        )}
      </DropdownMenu.Item>
    );
  };

  return (
    <DropdownMenu.Root>
      <DropdownMenu.Trigger asChild className={className}>
        {trigger}
      </DropdownMenu.Trigger>

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
            'data-[side=top]:slide-in-from-bottom-2',
            contentClassName
          )}
          align={align}
          sideOffset={sideOffset}
        >
          {menuItems.map(renderMenuItem)}
        </DropdownMenu.Content>
      </DropdownMenu.Portal>
    </DropdownMenu.Root>
  );
}

