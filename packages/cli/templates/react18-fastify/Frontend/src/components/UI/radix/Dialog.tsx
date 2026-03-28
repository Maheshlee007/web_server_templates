import * as DialogPrimitive from '@radix-ui/react-dialog';
import { X } from 'lucide-react';
import { ReactNode } from 'react';
import { cn } from '@/utils/utilsCN';

type DialogPosition = 'center' | 'top' | 'bottom' | 'left' | 'right';
type DialogSize = 'sm' | 'md' | 'lg' | 'xl' | 'full';

interface DialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  children: ReactNode;
  title?: string;
  description?: string;
  position?: DialogPosition;
  size?: DialogSize;
  showClose?: boolean;
  closeOnOverlayClick?: boolean;
  className?: string;
}

const sizeClasses: Record<DialogSize, string> = {
  sm: 'max-w-sm',
  md: 'max-w-md',
  lg: 'max-w-lg',
  xl: 'max-w-xl',
  full: 'max-w-full w-full h-full',
};

const positionClasses: Record<DialogPosition, string> = {
  center: 'items-center justify-center',
  top: 'items-start justify-center pt-20',
  bottom: 'items-end justify-center pb-20',
  left: 'items-center justify-start pl-20',
  right: 'items-center justify-end pr-20',
};

const contentAnimationClasses: Record<DialogPosition, string> = {
  center: 'data-[state=open]:animate-in data-[state=open]:fade-in-0 data-[state=open]:zoom-in-95 data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95',
  top: 'data-[state=open]:animate-in data-[state=open]:fade-in-0 data-[state=open]:slide-in-from-top-4 data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:slide-out-to-top-4',
  bottom: 'data-[state=open]:animate-in data-[state=open]:fade-in-0 data-[state=open]:slide-in-from-bottom-4 data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:slide-out-to-bottom-4',
  left: 'data-[state=open]:animate-in data-[state=open]:fade-in-0 data-[state=open]:slide-in-from-left-4 data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:slide-out-to-left-4',
  right: 'data-[state=open]:animate-in data-[state=open]:fade-in-0 data-[state=open]:slide-in-from-right-4 data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:slide-out-to-right-4',
};

export function Dialog({
  open,
  onOpenChange,
  children,
  title,
  description,
  position = 'center',
  size = 'md',
  showClose = true,
  closeOnOverlayClick = true,
  className = '',
}: DialogProps) {
  return (
    <DialogPrimitive.Root open={open} onOpenChange={onOpenChange}>
      <DialogPrimitive.Portal>
        {/* Overlay */}
        <DialogPrimitive.Overlay
          className={cn(
            'fixed inset-0 z-9998 bg-black/50 backdrop-blur-sm',
            'data-[state=open]:animate-in data-[state=open]:fade-in-0',
            'data-[state=closed]:animate-out data-[state=closed]:fade-out-0'
          )}
        />

        {/* Content Container */}
        <div className={cn('fixed inset-0 z-9999 flex', positionClasses[position])}>
          <DialogPrimitive.Content
            onPointerDownOutside={(e) => {
              if (!closeOnOverlayClick) {
                e.preventDefault();
              }
            }}
            onEscapeKeyDown={(e) => {
              if (!closeOnOverlayClick) {
                e.preventDefault();
              }
            }}
            className={cn(
              'relative w-full rounded-2xl shadow-xl',
              'bg-(--color-bg-secondary) border border-(--color-border)',
              'focus:outline-none',
              contentAnimationClasses[position],
              size === 'full' ? 'rounded-none' : sizeClasses[size],
              position === 'center' && 'm-4',
              className
            )}
          >
            {/* Header */}
            {(title || description || showClose) && (
              <div className="flex items-start justify-between p-6 pb-4 border-b border-(--color-border)">
                <div className="flex-1">
                  {title && (
                    <DialogPrimitive.Title className="text-xl font-semibold text-(--color-text)">
                      {title}
                    </DialogPrimitive.Title>
                  )}
                  {description && (
                    <DialogPrimitive.Description className="mt-1.5 text-sm text-(--color-text-secondary)">
                      {description}
                    </DialogPrimitive.Description>
                  )}
                </div>

                {showClose && (
                  <DialogPrimitive.Close
                    className="ml-4 rounded-lg p-2 text-(--color-text-muted) hover:text-(--color-text) hover:bg-(--color-bg-tertiary) transition-colors"
                    aria-label="Close"
                  >
                    <X className="w-5 h-5" />
                  </DialogPrimitive.Close>
                )}
              </div>
            )}

            {/* Body */}
            <div className={cn('p-6', (title || description) && 'pt-4')}>
              {children}
            </div>
          </DialogPrimitive.Content>
        </div>
      </DialogPrimitive.Portal>
    </DialogPrimitive.Root>
  );
}

// Compound components for more flexibility
export const DialogHeader = ({ children, className = '' }: { children: ReactNode; className?: string }) => (
  <div className={cn('flex flex-col space-y-1.5', className)}>{children}</div>
);

export const DialogTitle = DialogPrimitive.Title;
export const DialogDescription = DialogPrimitive.Description;
export const DialogClose = DialogPrimitive.Close;

export const DialogFooter = ({ children, className = '' }: { children: ReactNode; className?: string }) => (
  <div className={cn('flex items-center justify-end gap-3 pt-4 border-t border-(--color-border)', className)}>
    {children}
  </div>
);

// Simple pre-built dialog variants
interface AlertDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  title: string;
  description: string;
  confirmText?: string;
  cancelText?: string;
  onConfirm?: () => void;
  onCancel?: () => void;
  variant?: 'info' | 'warning' | 'error' | 'success';
}

export function AlertDialog({
  open,
  onOpenChange,
  title,
  description,
  confirmText = 'Confirm',
  cancelText = 'Cancel',
  onConfirm,
  onCancel,
  variant = 'info',
}: AlertDialogProps) {
  const variantColors = {
    info: 'text-info-500',
    warning: 'text-warning-500',
    error: 'text-error-500',
    success: 'text-success-500',
  };

  const handleConfirm = () => {
    onConfirm?.();
    onOpenChange(false);
  };

  const handleCancel = () => {
    onCancel?.();
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange} size="sm" closeOnOverlayClick={false}>
      <div className="space-y-4">
        <div>
          <h3 className={cn('text-lg font-semibold', variantColors[variant])}>{title}</h3>
          <p className="mt-2 text-sm text-(--color-text-secondary)">{description}</p>
        </div>

        <DialogFooter>
          <button
            onClick={handleCancel}
            className="px-4 py-2 rounded-lg border border-(--color-border) bg-(--color-bg-secondary) text-(--color-text) hover:bg-(--color-bg-tertiary) transition-colors"
          >
            {cancelText}
          </button>
          <button
            onClick={handleConfirm}
            className={cn(
              'px-4 py-2 rounded-lg font-medium text-white transition-colors',
              variant === 'error' && 'bg-error-500 hover:bg-error-600',
              variant === 'warning' && 'bg-warning-500 hover:bg-warning-600',
              variant === 'success' && 'bg-success-500 hover:bg-success-600',
              variant === 'info' && 'bg-(--color-brand) hover:bg-(--color-brand-hover)'
            )}
          >
            {confirmText}
          </button>
        </DialogFooter>
      </div>
    </Dialog>
  );
}
