import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/utils/utilsCN';

const progressVariants = cva('w-full overflow-hidden rounded-full bg-(--color-bg-tertiary)', {
  variants: {
    size: {
      sm: 'h-1',
      md: 'h-2',
      lg: 'h-3',
      xl: 'h-4',
    },
    variant: {
      default: '[&>div]:bg-(--color-brand)',
      success: '[&>div]:bg-green-500',
      warning: '[&>div]:bg-amber-500',
      error: '[&>div]:bg-red-500',
      gradient: '[&>div]:bg-linear-to-r [&>div]:from-(--color-brand) [&>div]:to-(--color-accent)',
    },
  },
  defaultVariants: {
    size: 'md',
    variant: 'default',
  },
});

export interface ProgressProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof progressVariants> {
  value?: number; // 0-100, undefined for indeterminate
  showLabel?: boolean;
  label?: string;
}

export function Progress({
  value,
  size,
  variant,
  showLabel = false,
  label,
  className,
  ...props
}: ProgressProps) {
  const isIndeterminate = value === undefined;
  const clampedValue = value !== undefined ? Math.min(100, Math.max(0, value)) : 0;

  return (
    <div className="w-full space-y-2">
      {(showLabel || label) && (
        <div className="flex items-center justify-between text-sm">
          <span className="text-(--color-text-secondary)">
            {label || 'Progress'}
          </span>
          {!isIndeterminate && (
            <span className="font-medium text-(--color-text)">
              {Math.round(clampedValue)}%
            </span>
          )}
        </div>
      )}
      <div
        className={cn(progressVariants({ size, variant }), className)}
        role="progressbar"
        aria-valuenow={isIndeterminate ? undefined : clampedValue}
        aria-valuemin={0}
        aria-valuemax={100}
        {...props}
      >
        <div
          className={cn(
            'h-full transition-all duration-300 ease-in-out',
            isIndeterminate && 'animate-progress-indeterminate w-1/3'
          )}
          style={isIndeterminate ? undefined : { width: `${clampedValue}%` }}
        />
      </div>
    </div>
  );
}

// Circular Progress
export interface CircularProgressProps extends React.HTMLAttributes<HTMLDivElement> {
  value?: number; // 0-100, undefined for indeterminate
  size?: number;
  strokeWidth?: number;
  variant?: 'default' | 'success' | 'warning' | 'error';
  showLabel?: boolean;
}

export function CircularProgress({
  value,
  size = 48,
  strokeWidth = 4,
  variant = 'default',
  showLabel = false,
  className,
  ...props
}: CircularProgressProps) {
  const isIndeterminate = value === undefined;
  const clampedValue = value !== undefined ? Math.min(100, Math.max(0, value)) : 0;
  
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (clampedValue / 100) * circumference;

  const colorMap = {
    default: 'text-(--color-brand)',
    success: 'text-green-500',
    warning: 'text-amber-500',
    error: 'text-red-500',
  };

  return (
    <div
      className={cn('inline-flex items-center justify-center relative', className)}
      style={{ width: size, height: size }}
      role="progressbar"
      aria-valuenow={isIndeterminate ? undefined : clampedValue}
      aria-valuemin={0}
      aria-valuemax={100}
      {...props}
    >
      <svg
        width={size}
        height={size}
        className={cn(isIndeterminate && 'animate-spin')}
      >
        {/* Background circle */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke="currentColor"
          strokeWidth={strokeWidth}
          className="text-(--color-bg-tertiary)"
        />
        {/* Progress circle */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke="currentColor"
          strokeWidth={strokeWidth}
          strokeDasharray={circumference}
          strokeDashoffset={isIndeterminate ? circumference * 0.75 : offset}
          strokeLinecap="round"
          className={cn(
            'transition-all duration-300 ease-in-out',
            colorMap[variant]
          )}
          style={{
            transform: 'rotate(-90deg)',
            transformOrigin: '50% 50%',
          }}
        />
      </svg>
      {showLabel && !isIndeterminate && (
        <span className="absolute text-xs font-medium text-(--color-text)">
          {Math.round(clampedValue)}%
        </span>
      )}
    </div>
  );
}
