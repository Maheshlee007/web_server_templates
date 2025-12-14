import { X } from 'lucide-react';
import * as Dialog from '@radix-ui/react-dialog';
import { cn } from '@/utils/utilsCN';
import { ReactNode } from 'react';

export type DrawerSize = 'small' | 'medium' | 'large' | 'xl' | 'full' | 'auto';
export type DrawerPosition = 'left' | 'right' | 'top' | 'bottom';

interface FooterButton {
  label: string;
  onClick: () => void;
  variant?: 'primary' | 'secondary' | 'ghost';
  disabled?: boolean;
}

interface DrawerProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  size?: DrawerSize;
  position?: DrawerPosition;
  title?: string;
  description?: string;
  icon?: ReactNode;
  logo?: ReactNode;
  children: ReactNode;
  footer?: ReactNode;
  footerButtons?: FooterButton[];
  showCloseButton?: boolean;
  className?: string;
}

/**
 * Drawer Component - Reusable side panel with multiple size variants
 * 
 * Features:
 * - 6 sizes: small (320px), medium (480px), large (50%), xl (75%), full (100%), auto (mobile-responsive)
 * - 4 positions: left, right, top, bottom
 * - Optional header with title, description, icon/logo
 * - Optional footer with custom content or action buttons
 * - Backdrop overlay with blur
 * - Smooth animations
 * - Mobile responsive (auto size adapts to screen)
 */
export function Drawer({
  open,
  onOpenChange,
  size = 'medium',
  position = 'right',
  title,
  description,
  icon,
  logo,
  children,
  footer,
  footerButtons,
  showCloseButton = true,
  className,
}: DrawerProps) {
  // Size mapping - responsive for horizontal (left/right) and vertical (top/bottom)
  const isHorizontal = position === 'left' || position === 'right';
  const sizeClasses = {
    small: isHorizontal ? 'w-full sm:w-80' : 'h-80',
    medium: isHorizontal ? 'w-full sm:w-[480px]' : 'h-[480px]',
    large: isHorizontal ? 'w-full sm:w-1/2' : 'h-1/2',
    xl: isHorizontal ? 'w-full sm:w-3/4' : 'h-3/4',
    full: isHorizontal ? 'w-full' : 'h-full',
    auto: isHorizontal ? 'w-full sm:w-auto sm:max-w-2xl' : 'h-auto max-h-[90vh]',
  };

  // Position classes
  const positionClasses = {
    left: 'left-0 top-0 h-full border-r',
    right: 'right-0 top-0 h-full border-l',
    top: 'top-0 left-0 w-full border-b',
    bottom: 'bottom-0 left-0 w-full border-t',
  };

  // Animation classes
  const animationClasses = {
    left: 'data-[state=closed]:slide-out-to-left data-[state=open]:slide-in-from-left',
    right: 'data-[state=closed]:slide-out-to-right data-[state=open]:slide-in-from-right',
    top: 'data-[state=closed]:slide-out-to-top data-[state=open]:slide-in-from-top',
    bottom: 'data-[state=closed]:slide-out-to-bottom data-[state=open]:slide-in-from-bottom',
  };

  return (
    <Dialog.Root open={open} onOpenChange={onOpenChange}>
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

        {/* Drawer Panel */}
        <Dialog.Content
          className={cn(
            'fixed z-50',
            'bg-(--color-bg) border-(--color-border)',
            'flex flex-col',
            'shadow-xl',
            'data-[state=open]:animate-in data-[state=closed]:animate-out',
            'data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0',
            'duration-300',
            sizeClasses[size],
            positionClasses[position],
            animationClasses[position],
            className
          )}
        >
          {/* Header */}
          {(title || description || icon || logo) && (
            <div className="shrink-0 px-6 py-4 border-b border-(--color-border)">
              <div className="flex items-start justify-between gap-4">
                <div className="flex items-start gap-3 flex-1">
                  {/* Icon or Logo */}
                  {(icon || logo) && (
                    <div className="shrink-0 mt-1">
                      {logo || icon}
                    </div>
                  )}
                  
                  {/* Title & Description */}
                  <div className="flex-1 min-w-0">
                    {title && (
                      <Dialog.Title className="text-lg font-semibold text-(--color-text) mb-1">
                        {title}
                      </Dialog.Title>
                    )}
                    {description && (
                      <Dialog.Description className="text-sm text-(--color-text-secondary)">
                        {description}
                      </Dialog.Description>
                    )}
                  </div>
                </div>

                {/* Close Button */}
                {showCloseButton && (
                  <Dialog.Close asChild>
                    <button
                      className={cn(
                        'inline-flex items-center justify-center rounded-lg p-2',
                        'text-(--color-text-secondary) hover:text-(--color-text)',
                        'hover:bg-(--color-bg-secondary) transition-colors',
                        'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-(--color-brand)'
                      )}
                      aria-label="Close"
                    >
                      <X className="h-5 w-5" />
                    </button>
                  </Dialog.Close>
                )}
              </div>
            </div>
          )}

          {/* Content */}
          <div className="flex-1 overflow-y-auto p-6">
            {children}
          </div>

          {/* Footer */}
          {(footer || footerButtons) && (
            <div className="shrink-0 px-6 py-4 border-t border-(--color-border) bg-(--color-bg-secondary)/50">
              {footer || (
                <div className="flex items-center justify-end gap-3">
                  {footerButtons?.map((button, index) => {
                    const variantClasses = {
                      primary: 'bg-(--color-brand) text-white hover:opacity-90',
                      secondary: 'border border-(--color-border) hover:bg-(--color-bg-secondary)',
                      ghost: 'hover:bg-(--color-bg-secondary)',
                    };
                    
                    return (
                      <button
                        key={index}
                        onClick={button.onClick}
                        disabled={button.disabled}
                        className={cn(
                          'px-4 py-2 rounded-lg font-medium transition-all',
                          'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-(--color-brand)',
                          'disabled:opacity-50 disabled:cursor-not-allowed',
                          variantClasses[button.variant || 'secondary']
                        )}
                      >
                        {button.label}
                      </button>
                    );
                  })}
                </div>
              )}
            </div>
          )}
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
