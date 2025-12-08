import { X } from 'lucide-react';
import * as Dialog from '@radix-ui/react-dialog';
import { cn } from '@/utils/utilsCN';
import { SideNavItem } from './SideNavItem';
import type { NavItem } from '@/types/layout';

interface SideNavMobileProps {
  items: NavItem[];
  isOpen: boolean;
  onClose: () => void;
  header?: React.ReactNode;
  footer?: React.ReactNode;
  position?: 'left' | 'right';
}

/**
 * SideNavMobile - Mobile drawer navigation
 * 
 * Features:
 * - Full-screen drawer on mobile
 * - Always uses accordion style (no popover on mobile)
 * - Scrollable navigation with hidden scrollbar
 * - Custom header/footer sections
 * - Backdrop overlay
 */
export function SideNavMobile({
  items,
  isOpen,
  onClose,
  header,
  footer,
  position = 'left',
}: SideNavMobileProps) {
  return (
    <Dialog.Root open={isOpen} onOpenChange={onClose}>
      <Dialog.Portal>
        {/* Backdrop */}
        <Dialog.Overlay
          className={cn(
            'fixed inset-0 z-50',
            'bg-black/50 backdrop-blur-sm',
            'data-[state=open]:animate-in data-[state=closed]:animate-out',
            'data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0'
          )}
        />

        {/* Drawer */}
        <Dialog.Content
          className={cn(
            'fixed top-0 z-50 h-full',
            'w-[85%] max-w-sm',
            'bg-(--color-bg) border-(--color-border)',
            'flex flex-col',
            'shadow-xl',
            'data-[state=open]:animate-in data-[state=closed]:animate-out',
            'data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0',
            position === 'left'
              ? 'left-0 border-r data-[state=closed]:slide-out-to-left data-[state=open]:slide-in-from-left'
              : 'right-0 border-l data-[state=closed]:slide-out-to-right data-[state=open]:slide-in-from-right'
          )}
        >
          {/* Header Section */}
          <div className="flex-shrink-0 flex items-center justify-between px-4 py-4 border-b border-(--color-border)">
            {header || (
              <h2 className="text-lg font-semibold text-(--color-text)">Menu</h2>
            )}
            <Dialog.Close asChild>
              <button
                className={cn(
                  'inline-flex items-center justify-center rounded-lg p-2',
                  'text-(--color-text-secondary) hover:text-(--color-text)',
                  'hover:bg-(--color-bg-secondary) transition-colors',
                  'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-(--color-brand)'
                )}
                aria-label="Close menu"
              >
                <X className="h-5 w-5" />
              </button>
            </Dialog.Close>
          </div>

          {/* Navigation Items - Scrollable with hidden scrollbar */}
          <nav
            className={cn(
              'flex-1 overflow-y-auto overflow-x-hidden',
              'scrollbar-thin scrollbar-hide',
              'py-4 px-3 space-y-1'
            )}
          >
            {items.map(item => (
              <SideNavItem
                key={item.id}
                item={item}
                level={0}
                nestedNavStyle="accordion" // Always accordion on mobile
                isMini={false}
                onItemClick={onClose} // Close drawer on navigation
              />
            ))}
          </nav>

          {/* Footer Section - Settings, Logout, etc. */}
          {footer && (
            <div className="flex-shrink-0 px-4 py-4 border-t border-(--color-border)">
              {footer}
            </div>
          )}
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
