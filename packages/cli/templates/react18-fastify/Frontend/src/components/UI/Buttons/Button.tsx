import { forwardRef, type ButtonHTMLAttributes, type ReactNode } from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/utils/utilsCN';

// CVA: Define all button variants in one place
const buttonStyles = cva(
  // Base styles - always applied
  [
    'inline-flex items-center justify-center gap-2',
    'font-medium rounded-lg',
    'transition-all duration-200 ease-out',
    'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2',
    'disabled:opacity-50 disabled:cursor-not-allowed',
    'active:scale-[0.97]',
  ],
  {
    variants: {
      // Visual style variants
      variant: {
        primary: [
          'bg-(--color-brand)',
          'text-(--color-brand-foreground)',
          'hover:bg-(--color-brand-hover)',
          'focus-visible:ring-(--color-brand)',
          'shadow-md hover:shadow-lg',
        ],
        secondary: [
          'bg-(--color-bg-secondary)',
          'text-(--color-text)',
          'border border-(--color-border)',
          'hover:bg-(--color-bg-tertiary)',
          'focus-visible:ring-(--color-secondary)',
        ],
        outline: [
          'bg-transparent',
          'text-(--color-brand)',
          'border-2 border-(--color-brand)',
          'hover:bg-(--color-brand)',
          'hover:text-(--color-brand-foreground)',
          'focus-visible:ring-(--color-brand)',
        ],
        ghost: [
          'bg-transparent',
          'text-(--color-text)',
          'hover:bg-(--color-bg-secondary)',
          'focus-visible:ring-(--color-brand)',
        ],
        danger: [
          'bg-(--color-error)',
          'text-(--color-error-foreground)',
          'hover:opacity-90',
          'focus-visible:ring-(--color-error)',
          'shadow-md',
        ],
        success: [
          'bg-(--color-success)',
          'text-(--color-success-foreground)',
          'hover:opacity-90',
          'focus-visible:ring-(--color-success)',
          'shadow-md',
        ],
        warning: [
          'bg-(--color-warning)',
          'text-(--color-warning-foreground)',
          'hover:opacity-90',
          'focus-visible:ring-(--color-warning)',
          'shadow-md',
        ],
        glass: [
          'glass',
          'text-(--color-text)',
          'border border-(--glass-border)',
          'hover:bg-white/10',
          'focus-visible:ring-(--color-brand)',
        ],
        link: [
          'bg-transparent',
          'text-(--color-brand)',
          'underline-offset-4',
          'hover:underline',
          'focus-visible:ring-(--color-brand)',
          'shadow-none',
          'h-auto',
          'p-0',
        ],
        gradient: [
          'bg-linear-to-br from-(--color-brand) to-(--color-accent)',
          'text-white',
          'hover:opacity-90',
          'focus-visible:ring-(--color-brand)',
          'shadow-lg hover:shadow-xl',
          'relative overflow-hidden',
        ],
        'gradient-border': [
          'gradient-border-glow',
          'bg-transparent',
          'text-(--color-text)',
          'focus-visible:ring-(--color-brand)',
        ],
      },
      // Size variants
      size: {
        xs: 'h-7 px-2.5 text-xs',
        sm: 'h-8 px-3 text-sm',
        md: 'h-10 px-4 text-sm',
        lg: 'h-11 px-5 text-base',
        xl: 'h-12 px-6 text-lg',
        icon: 'h-10 w-10 p-0',
        'icon-sm': 'h-8 w-8 p-0',
        'icon-lg': 'h-12 w-12 p-0',
      },
      // Full width option
      fullWidth: {
        true: 'w-full',
        false: 'w-auto',
      },
    },
    // Default values
    defaultVariants: {
      variant: 'primary',
      size: 'md',
      fullWidth: false,
    },
    // Compound variants for special cases
    compoundVariants: [
      {
        variant: 'link',
        size: ['xs', 'sm', 'md', 'lg', 'xl'],
        className: 'h-auto px-0',
      },
    ],
  }
);

// Spinner component for loading state
const LoadingSpinner = ({ className }: { className?: string }) => (
  <svg
    className={cn('animate-spin', className)}
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <circle
      className="opacity-25"
      cx="12"
      cy="12"
      r="10"
      stroke="currentColor"
      strokeWidth="4"
    />
    <path
      className="opacity-75"
      fill="currentColor"
      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
    />
  </svg>
);

// Button props extending HTML button attributes + CVA variants
export interface ButtonProps
  extends ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonStyles> {
  /** Shows loading spinner and disables button */
  isLoading?: boolean;
  /** Icon displayed before text */
  leftIcon?: ReactNode;
  /** Icon displayed after text */
  rightIcon?: ReactNode;
}

/**
 * Button component with multiple variants and sizes
 * 
 * @example
 * <Button variant="primary" size="md">Click me</Button>
 * <Button variant="outline" leftIcon={<Icon />}>With Icon</Button>
 * <Button variant="danger" isLoading>Deleting...</Button>
 */
export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      variant,
      size,
      fullWidth,
      isLoading = false,
      leftIcon,
      rightIcon,
      disabled,
      children,
      ...props
    },
    ref
  ) => {
    const isDisabled = disabled || isLoading;
    
    return (
      <button
        ref={ref}
        className={cn(buttonStyles({ variant, size, fullWidth }), className)}
        disabled={isDisabled}
        aria-busy={isLoading}
        {...props}
      >
        {/* Loading spinner or left icon */}
        {isLoading ? (
          <LoadingSpinner className="h-4 w-4" />
        ) : leftIcon ? (
          <span className="shrink-0">{leftIcon}</span>
        ) : null}

        {/* Button text */}
        {children && <span>{children}</span>}

        {/* Right icon (hidden when loading) */}
        {rightIcon && !isLoading && (
          <span className="shrink-0">{rightIcon}</span>
        )}
      </button>
    );
  }
);

Button.displayName = 'Button';

// Exporting variants for external use (e.g., styling links as buttons)
export { buttonStyles };
export default Button;