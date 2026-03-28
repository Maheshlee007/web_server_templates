import * as SwitchPrimitive from '@radix-ui/react-switch';
import { forwardRef, type ComponentPropsWithoutRef } from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/utils/utilsCN';

const switchStyles = cva(
  [
    'peer inline-flex shrink-0 cursor-pointer items-center',
    'rounded-full border-2 border-transparent',
    'transition-colors duration-200',
    'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-(--color-brand) focus-visible:ring-offset-2',
    'disabled:cursor-not-allowed disabled:opacity-50',
    'data-[state=unchecked]:bg-(--color-bg-tertiary)',
    'data-[state=checked]:bg-(--color-brand)',
  ],
  {
    variants: {
      size: {
        sm: 'h-5 w-9',
        md: 'h-6 w-11',
        lg: 'h-7 w-[3.25rem]',
      },
    },
    defaultVariants: {
      size: 'md',
    },
  }
);

const thumbStyles = cva(
  [
    'pointer-events-none block rounded-full bg-white shadow-lg ring-0',
    'transition-transform duration-200',
  ],
  {
    variants: {
      size: {
        sm: 'h-4 w-4 data-[state=checked]:translate-x-4 data-[state=unchecked]:translate-x-0',
        md: 'h-5 w-5 data-[state=checked]:translate-x-5 data-[state=unchecked]:translate-x-0',
        lg: 'h-6 w-6 data-[state=checked]:translate-x-6 data-[state=unchecked]:translate-x-0',
      },
    },
    defaultVariants: {
      size: 'md',
    },
  }
);

export interface SwitchProps
  extends Omit<ComponentPropsWithoutRef<typeof SwitchPrimitive.Root>, 'size'>,
    VariantProps<typeof switchStyles> {
  label?: string;
  description?: string;
}

export const Switch = forwardRef<HTMLButtonElement, SwitchProps>(
  ({ size, label, description, className, id, ...props }, ref) => {
    const switchId = id || label?.toLowerCase().replace(/\s+/g, '-');

    const switchElement = (
      <SwitchPrimitive.Root
        ref={ref}
        id={switchId}
        className={cn(switchStyles({ size }), className)}
        {...props}
      >
        <SwitchPrimitive.Thumb className={thumbStyles({ size })} />
      </SwitchPrimitive.Root>
    );

    if (!label) return switchElement;

    return (
      <div className="flex items-center gap-3">
        {switchElement}
        <div>
          <label
            htmlFor={switchId}
            className="text-sm font-medium text-(--color-text) cursor-pointer"
          >
            {label}
          </label>
          {description && (
            <p className="text-xs text-(--color-text-muted)">{description}</p>
          )}
        </div>
      </div>
    );
  }
);
Switch.displayName = 'Switch';
