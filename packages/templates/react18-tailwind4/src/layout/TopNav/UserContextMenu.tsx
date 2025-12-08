import { ContextMenu, UserContextMenuProps } from "@/components/UI/radix";
import { MenuItem } from "@/types/layout";
import { cn } from "@/utils/utilsCN";
import { LogOut } from "lucide-react";

/**
 * UserContextMenu - Specialized context menu for user profiles
 */

export function UserContextMenu({
  user,
  menuItems = [],
  onLogout,
  showUserInfo = true,
  align = 'end',
  sideOffset = 8,
  className,
  contentClassName,
}: UserContextMenuProps) {
  const userTrigger = (
    <button
      className={cn(
        'flex items-center gap-2 rounded-full',
        'hover:bg-(--color-surface-hover)',
        'transition-colors duration-200',
        'focus:outline-none focus-visible:ring-2 focus-visible:ring-(--color-brand)'
      )}
      aria-label="User menu"
    >
      {user.avatar ? (
        <img
          src={user.avatar}
          alt={user.name}
          className="h-8 w-8 rounded-full object-cover"
        />
      ) : (
        <div className="h-8 w-8 rounded-full bg-(--color-brand) flex items-center justify-center text-white text-sm font-medium">
          {user.name.charAt(0).toUpperCase()}
        </div>
      )}
    </button>
  );

  const userMenuItems: MenuItem[] = [
    ...(showUserInfo
      ? [
          {
            id: 'user-info',
            type: 'custom' as const,
            label: '',
            render: () => (
              <div className="px-3 py-2 mb-1">
                <p className="text-sm font-medium text-(--color-text-primary)">
                  {user.name}
                </p>
                <p className="text-xs text-(--color-text-tertiary)">{user.email}</p>
              </div>
            ),
          },
          { id: 'separator-1', type: 'separator' as const, label: '' },
        ]
      : []),
    ...menuItems,
    ...(onLogout
      ? [
          { id: 'separator-logout', type: 'separator' as const, label: '' },
          {
            id: 'logout',
            label: 'Log out',
            icon: <LogOut className="h-4 w-4" />,
            onClick: onLogout,
            variant: 'danger' as const,
          },
        ]
      : []),
  ];

  return (
    <ContextMenu
      trigger={userTrigger}
      menuItems={userMenuItems}
      align={align}
      sideOffset={sideOffset}
      className={className}
      contentClassName={contentClassName}
    />
  );
}
