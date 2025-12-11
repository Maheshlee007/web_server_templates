// Toast wrapper for Sonner
// Install: pnpm add sonner

import { Toaster as Sonner, toast as sonnerToast } from 'sonner';

export interface ToasterProps {
  position?: 'top-left' | 'top-right' | 'top-center' | 'bottom-left' | 'bottom-right' | 'bottom-center';
  theme?: 'light' | 'dark' | 'system';
  richColors?: boolean;
  expand?: boolean;
  duration?: number;
  closeButton?: boolean;
}

export function Toaster({
  position = 'top-right',
  theme = 'system',
  richColors = true,
  expand = false,
  duration = 4000,
  closeButton = true,
}: ToasterProps = {}) {
  return (
    <Sonner
      position={position}
      theme={theme}
      richColors={richColors}
      expand={expand}
      duration={duration}
      closeButton={closeButton}
      toastOptions={{
        classNames: {
          toast: 'bg-(--color-bg-secondary) border-(--color-border) text-(--color-text)',
          title: 'text-(--color-text)',
          description: 'text-(--color-text-secondary)',
          actionButton: 'bg-(--color-brand) text-white',
          cancelButton: 'bg-(--color-bg-tertiary) text-(--color-text)',
          closeButton: 'bg-(--color-bg-tertiary) text-(--color-text) hover:bg-(--color-bg-tertiary)',
        },
      }}
    />
  );
}

// Toast API wrapper
export const toast = {
  success: (message: string, options?: any) => sonnerToast.success(message, options),
  error: (message: string, options?: any) => sonnerToast.error(message, options),
  info: (message: string, options?: any) => sonnerToast.info(message, options),
  warning: (message: string, options?: any) => sonnerToast.warning(message, options),
  loading: (message: string, options?: any) => sonnerToast.loading(message, options),
  
  // Promise toast - shows loading, then success/error
  promise: <T,>(
    promise: Promise<T>,
    options: {
      loading: string;
      success: string | ((data: T) => string);
      error: string | ((error: any) => string);
    }
  ) => sonnerToast.promise(promise, options),

  // Custom toast with action
  custom: (message: string, options?: any) => sonnerToast(message, options),
  
  // Dismiss specific or all toasts
  dismiss: (id?: string | number) => sonnerToast.dismiss(id),
};

// Usage examples:
/*
// Basic
toast.success('Saved successfully!');
toast.error('Failed to save');
toast.info('New update available');
toast.warning('Session expiring soon');

// With description
toast.success('User created', {
  description: 'Welcome email sent to user@example.com'
});

// With action
toast('Event created', {
  action: {
    label: 'View',
    onClick: () => console.log('View clicked'),
  },
});

// Promise toast
toast.promise(
  fetch('/api/save'),
  {
    loading: 'Saving...',
    success: 'Saved successfully!',
    error: 'Failed to save',
  }
);

// With duration
toast.success('Quick message', { duration: 2000 });

// Persistent (manual dismiss)
toast.info('Important info', { duration: Infinity });
*/
