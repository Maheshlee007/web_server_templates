import * as TabsPrimitive from '@radix-ui/react-tabs';
import { forwardRef, type ComponentPropsWithoutRef } from 'react';
import { cn } from '@/utils/utilsCN';

/* ── Tabs Root ───────────────────────────────── */
export const Tabs = TabsPrimitive.Root;

/* ── Tabs List ───────────────────────────────── */
export interface TabsListProps extends ComponentPropsWithoutRef<typeof TabsPrimitive.List> {
  variant?: 'underline' | 'pills' | 'boxed';
}

export const TabsList = forwardRef<
  HTMLDivElement,
  TabsListProps
>(({ variant = 'underline', className, ...props }, ref) => (
  <TabsPrimitive.List
    ref={ref}
    className={cn(
      'inline-flex items-center gap-1',
      variant === 'underline' && [
        'border-b border-(--color-border) w-full',
        'gap-0',
      ],
      variant === 'pills' && [
        'bg-(--color-bg-secondary) rounded-lg p-1',
      ],
      variant === 'boxed' && [
        'bg-(--color-bg-secondary) rounded-lg p-1',
        'border border-(--color-border)',
      ],
      className
    )}
    data-variant={variant}
    {...props}
  />
));
TabsList.displayName = 'TabsList';

/* ── Tabs Trigger ────────────────────────────── */
export interface TabsTriggerProps extends ComponentPropsWithoutRef<typeof TabsPrimitive.Trigger> {
  variant?: 'underline' | 'pills' | 'boxed';
}

export const TabsTrigger = forwardRef<
  HTMLButtonElement,
  TabsTriggerProps
>(({ variant = 'underline', className, ...props }, ref) => (
  <TabsPrimitive.Trigger
    ref={ref}
    className={cn(
      'inline-flex items-center justify-center gap-2',
      'whitespace-nowrap text-sm font-medium',
      'transition-all duration-150',
      'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-(--color-brand) focus-visible:ring-offset-2',
      'disabled:pointer-events-none disabled:opacity-50',
      variant === 'underline' && [
        'px-4 py-2.5',
        'border-b-2 border-transparent -mb-px',
        'text-(--color-text-muted)',
        'hover:text-(--color-text)',
        'data-[state=active]:border-(--color-brand)',
        'data-[state=active]:text-(--color-brand)',
      ],
      variant === 'pills' && [
        'px-3 py-1.5 rounded-md',
        'text-(--color-text-muted)',
        'hover:text-(--color-text) hover:bg-(--color-surface-hover)',
        'data-[state=active]:bg-(--color-surface)',
        'data-[state=active]:text-(--color-text)',
        'data-[state=active]:shadow-sm',
      ],
      variant === 'boxed' && [
        'px-3 py-1.5 rounded-md',
        'text-(--color-text-muted)',
        'hover:text-(--color-text)',
        'data-[state=active]:bg-(--color-brand)',
        'data-[state=active]:text-(--color-brand-foreground)',
        'data-[state=active]:shadow-sm',
      ],
      className
    )}
    {...props}
  />
));
TabsTrigger.displayName = 'TabsTrigger';

/* ── Tabs Content ────────────────────────────── */
export const TabsContent = forwardRef<
  HTMLDivElement,
  ComponentPropsWithoutRef<typeof TabsPrimitive.Content>
>(({ className, ...props }, ref) => (
  <TabsPrimitive.Content
    ref={ref}
    className={cn(
      'mt-3',
      'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-(--color-brand) focus-visible:ring-offset-2',
      className
    )}
    {...props}
  />
));
TabsContent.displayName = 'TabsContent';
