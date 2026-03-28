import { type HTMLAttributes, type ReactNode } from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/utils/utilsCN';
import { X } from 'lucide-react';

const badgeStyles = cva(
  [
    'inline-flex items-center gap-1',
    'font-medium rounded-full',
    'transition-colors duration-150',
  ],
  {
    variants: {
      variant: {
        default: [
          'bg-(--color-brand-light)',
          'text-(--color-brand)',
          'border border-(--color-brand)/20',
        ],
        secondary: [
          'bg-(--color-bg-secondary)',
          'text-(--color-text-secondary)',
          'border border-(--color-border)',
        ],
        outline: [
          'bg-transparent',
          'text-(--color-text)',
          'border border-(--color-border)',
        ],
        success: [
          'bg-(--color-success-light)',
          'text-(--color-success)',
          'border border-(--color-success)/20',
        ],
        warning: [
          'bg-(--color-warning-light)',
          'text-(--color-warning)',
          'border border-(--color-warning)/20',
        ],
        error: [
          'bg-(--color-error-light)',
          'text-(--color-error)',
          'border border-(--color-error)/20',
        ],
        info: [
          'bg-(--color-info-light)',
          'text-(--color-info)',
          'border border-(--color-info)/20',
        ],
      },
      size: {
        sm: 'px-2 py-0.5 text-xs',
        md: 'px-2.5 py-0.5 text-sm',
        lg: 'px-3 py-1 text-sm',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'md',
    },
  }
);

export interface BadgeProps
  extends HTMLAttributes<HTMLSpanElement>,
    VariantProps<typeof badgeStyles> {
  dot?: boolean;
  removable?: boolean;
  onRemove?: () => void;
  children: ReactNode;
}

export function Badge({
  variant,
  size,
  dot,
  removable,
  onRemove,
  className,
  children,
  ...props
}: BadgeProps) {
  return (
    <span className={cn(badgeStyles({ variant, size }), className)} {...props}>
      {dot && (
        <span className="w-1.5 h-1.5 rounded-full bg-current opacity-70" />
      )}
      {children}
      {removable && (
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            onRemove?.();
          }}
          className="ml-0.5 -mr-1 p-0.5 rounded-full hover:bg-black/10 transition-colors"
          aria-label="Remove"
        >
          <X className="w-3 h-3" />
        </button>
      )}
    </span>
  );
}
