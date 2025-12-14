import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/utils/utilsCN';

const spinnerVariants = cva(
  'inline-block animate-spin rounded-full border-solid border-current border-r-transparent',
  {
    variants: {
      size: {
        xs: 'h-3 w-3 border-2',
        sm: 'h-4 w-4 border-2',
        md: 'h-6 w-6 border-2',
        lg: 'h-8 w-8 border-3',
        xl: 'h-12 w-12 border-4',
      },
      variant: {
        primary: 'text-(--color-brand)',
        secondary: 'text-(--color-text-secondary)',
        white: 'text-white',
        current: 'text-current',
      },
    },
    defaultVariants: {
      size: 'md',
      variant: 'primary',
    },
  }
);

export interface SpinnerProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof spinnerVariants> {
  label?: string;
}

export function Spinner({ 
  size, 
  variant, 
  className, 
  label,
  ...props 
}: SpinnerProps) {
  return (
    <div 
      className={cn('inline-flex items-center gap-2', className)} 
      role="status"
      aria-label={label || 'Loading'}
      {...props}
    >
      <div className={cn(spinnerVariants({ size, variant }))} />
      {label && (
        <span className="text-sm text-(--color-text-secondary)">
          {label}
        </span>
      )}
    </div>
  );
}
