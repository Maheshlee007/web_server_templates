import { type HTMLAttributes, type ReactNode, useState } from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/utils/utilsCN';
import { AlertCircle, CheckCircle2, AlertTriangle, Info, X } from 'lucide-react';

const alertStyles = cva(
  [
    'relative flex gap-3 rounded-lg p-4',
    'border',
    'transition-all duration-200',
  ],
  {
    variants: {
      variant: {
        info: [
          'bg-(--color-info-light)',
          'border-(--color-info)/20',
          'text-(--color-text)',
        ],
        success: [
          'bg-(--color-success-light)',
          'border-(--color-success)/20',
          'text-(--color-text)',
        ],
        warning: [
          'bg-(--color-warning-light)',
          'border-(--color-warning)/20',
          'text-(--color-text)',
        ],
        error: [
          'bg-(--color-error-light)',
          'border-(--color-error)/20',
          'text-(--color-text)',
        ],
      },
    },
    defaultVariants: {
      variant: 'info',
    },
  }
);

const iconMap = {
  info: Info,
  success: CheckCircle2,
  warning: AlertTriangle,
  error: AlertCircle,
};

const iconColorMap = {
  info: 'text-(--color-info)',
  success: 'text-(--color-success)',
  warning: 'text-(--color-warning)',
  error: 'text-(--color-error)',
};

export interface AlertProps
  extends HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof alertStyles> {
  title?: string;
  dismissible?: boolean;
  onDismiss?: () => void;
  icon?: ReactNode;
  children: ReactNode;
}

export function Alert({
  variant = 'info',
  title,
  dismissible,
  onDismiss,
  icon,
  className,
  children,
  ...props
}: AlertProps) {
  const [visible, setVisible] = useState(true);

  if (!visible) return null;

  const IconComponent = iconMap[variant || 'info'];

  const handleDismiss = () => {
    setVisible(false);
    onDismiss?.();
  };

  return (
    <div
      role="alert"
      className={cn(alertStyles({ variant }), className)}
      {...props}
    >
      <div className={cn('shrink-0 mt-0.5', iconColorMap[variant || 'info'])}>
        {icon || <IconComponent className="w-5 h-5" />}
      </div>
      <div className="flex-1 min-w-0">
        {title && (
          <h5 className="font-semibold text-sm mb-1">{title}</h5>
        )}
        <div className="text-sm text-(--color-text-secondary)">{children}</div>
      </div>
      {dismissible && (
        <button
          type="button"
          onClick={handleDismiss}
          className="shrink-0 p-1 rounded-md hover:bg-black/10 transition-colors text-(--color-text-muted)"
          aria-label="Dismiss"
        >
          <X className="w-4 h-4" />
        </button>
      )}
    </div>
  );
}
