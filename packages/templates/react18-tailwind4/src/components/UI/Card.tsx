// filepath: d:\web_server_templates\packages\templates\react18-tailwind4\src\components\UI\Card\Card.tsx
import { forwardRef, type HTMLAttributes, type ReactNode } from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/utils/utilsCN';

const cardStyles = cva(
  // Base styles
  ['rounded-2xl', 'transition-all duration-300'],
  {
    variants: {
      variant: {
        default: [
          'bg-(--color-bg-secondary)',
          'border border-(--color-border)',
          'shadow-sm',
        ],
        elevated: [
          'bg-(--color-bg-secondary)',
          'shadow-lg',
          'hover:shadow-xl',
        ],
        outline: [
          'bg-transparent',
          'border-2 border-(--color-border)',
        ],
        glass: ['glass', 'border border-(--glass-border)'],
        'glass-strong': ['glass-strong'],
        gradient: ['bg-card-gradient', 'text-white'],
      },
      padding: {
        none: 'p-0',
        sm: 'p-4',
        md: 'p-6',
        lg: 'p-8',
      },
      size: {
        sm: 'max-w-sm',
        md: 'max-w-md',
        lg: 'max-w-lg',
        xl: 'max-w-xl',
        '2xl': 'max-w-2xl',
        '3xl': 'max-w-3xl',
        '4xl': 'max-w-4xl',
        full: 'max-w-full',
        auto: 'max-w-none',
      },
      hoverable: {
        true: 'hover:scale-[1.02] cursor-pointer',
        false: '',
      },
    },
    defaultVariants: {
      variant: 'default',
      padding: 'md',
      size: 'auto',
      hoverable: false,
    },
  }
);

export interface CardProps
  extends HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof cardStyles> {}

export const Card = forwardRef<HTMLDivElement, CardProps>(
  ({ className, variant, padding, size, hoverable, children, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(cardStyles({ variant, padding, size, hoverable }), className)}
        {...props}
      >
        {children}
      </div>
    );
  }
);

Card.displayName = 'Card';

// Sub-components for compound pattern
interface CardSectionProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
}

export const CardHeader = forwardRef<HTMLDivElement, CardSectionProps>(
  ({ className, children, ...props }, ref) => (
    <div
      ref={ref}
      className={cn(
        'flex flex-col gap-1.5',
        'pb-4 border-b border-(--color-border)',
        className
      )}
      {...props}
    >
      {children}
    </div>
  )
);
CardHeader.displayName = 'CardHeader';

export const CardTitle = forwardRef<
  HTMLHeadingElement,
  HTMLAttributes<HTMLHeadingElement>
>(({ className, children, ...props }, ref) => (
  <h3
    ref={ref}
    className={cn(
      'text-lg font-semibold text-(--color-text)',
      className
    )}
    {...props}
  >
    {children}
  </h3>
));
CardTitle.displayName = 'CardTitle';

export const CardDescription = forwardRef<
  HTMLParagraphElement,
  HTMLAttributes<HTMLParagraphElement>
>(({ className, children, ...props }, ref) => (
  <p
    ref={ref}
    className={cn('text-sm text-(--color-text-secondary)', className)}
    {...props}
  >
    {children}
  </p>
));
CardDescription.displayName = 'CardDescription';

export const CardContent = forwardRef<HTMLDivElement, CardSectionProps>(
  ({ className, children, ...props }, ref) => (
    <div ref={ref} className={cn('py-4', className)} {...props}>
      {children}
    </div>
  )
);
CardContent.displayName = 'CardContent';

// Alias for CardContent
export const CardBody = CardContent;

export const CardFooter = forwardRef<HTMLDivElement, CardSectionProps>(
  ({ className, children, ...props }, ref) => (
    <div
      ref={ref}
      className={cn(
        'flex items-center gap-3',
        'pt-4 border-t border-(--color-border)',
        className
      )}
      {...props}
    >
      {children}
    </div>
  )
);
CardFooter.displayName = 'CardFooter';

export { cardStyles };