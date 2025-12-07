import { forwardRef, useState, ReactNode, InputHTMLAttributes, TextareaHTMLAttributes } from 'react';
import { Eye, EyeOff } from 'lucide-react';
import { cn } from '@/utils/utilsCN';

type InputType = 'text' | 'email' | 'password' | 'number' | 'search' | 'tel' | 'url';

interface BaseInputProps {
  label?: string;
  error?: string;
  helperText?: string;
  required?: boolean;
  leftIcon?: ReactNode;
  rightIcon?: ReactNode;
  maxLength?: number;
  showCharCount?: boolean;
  disabled?: boolean;
  className?: string;
  wrapperClassName?: string;
}

interface SingleLineInputProps extends BaseInputProps, Omit<InputHTMLAttributes<HTMLInputElement>, 'type'> {
  type?: InputType;
  multiline?: false;
}

interface MultiLineInputProps extends BaseInputProps, Omit<TextareaHTMLAttributes<HTMLTextAreaElement>, 'type'> {
  type?: 'textarea';
  multiline: true;
  rows?: number;
  resize?: 'none' | 'vertical' | 'horizontal' | 'both';
}

export type InputProps = SingleLineInputProps | MultiLineInputProps;

export const Input = forwardRef<HTMLInputElement | HTMLTextAreaElement, InputProps>(
  (props, ref) => {
    const {
      label,
      error,
      helperText,
      required = false,
      leftIcon,
      rightIcon,
      maxLength,
      showCharCount = false,
      disabled = false,
      className = '',
      wrapperClassName = '',
      type = 'text',
      multiline = false,
      ...rest
    } = props;

    const [showPassword, setShowPassword] = useState(false);
    const [charCount, setCharCount] = useState(0);

    const isPassword = type === 'password';
    const inputType = isPassword && showPassword ? 'text' : type;

    const hasError = !!error;
    const hasLeftIcon = !!leftIcon;
    const hasRightIcon = !!rightIcon || isPassword || (showCharCount && maxLength);

    // Base input/textarea styles
    const baseStyles = cn(
      'w-full px-4 py-3 rounded-lg border transition-all',
      'bg-(--color-bg-secondary) text-(--color-text)',
      'placeholder:text-(--color-text-muted)',
      'focus:outline-none focus:ring-2 focus:ring-opacity-20',
      // Error state
      hasError
        ? 'border-error-500 focus:border-error-500 focus:ring-error-500'
        : 'border-(--color-border) focus:border-(--color-brand) focus:ring-(--color-brand) hover:border-(--color-brand)',
      // Disabled state
      disabled && 'opacity-50 cursor-not-allowed bg-(--color-bg-tertiary)',
      // Icon padding
      hasLeftIcon && 'pl-11',
      hasRightIcon && 'pr-11',
      className
    );

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      const value = e.target.value;
      if (maxLength) {
        setCharCount(value.length);
      }
      // Call original onChange if provided
      if ('onChange' in rest && rest.onChange) {
        rest.onChange(e as any);
      }
    };

    return (
      <div className={cn('w-full', wrapperClassName)}>
        {/* Label */}
        {label && (
          <label className="block text-sm font-medium text-(--color-text) mb-2">
            {label}
            {required && <span className="text-error-500 ml-1">*</span>}
          </label>
        )}

        {/* Input Container */}
        <div className="relative">
          {/* Left Icon */}
          {hasLeftIcon && (
            <div className="absolute left-3 top-1/2 -translate-y-1/2 text-(--color-text-muted) pointer-events-none">
              {leftIcon}
            </div>
          )}

          {/* Input or Textarea */}
          {multiline ? (
            <textarea
              ref={ref as React.Ref<HTMLTextAreaElement>}
              disabled={disabled}
              maxLength={maxLength}
              className={cn(
                baseStyles,
                'resize-' + ((props as MultiLineInputProps).resize || 'vertical'),
                'min-h-[100px]'
              )}
              onChange={handleInputChange}
              {...(rest as TextareaHTMLAttributes<HTMLTextAreaElement>)}
            />
          ) : (
            <input
              ref={ref as React.Ref<HTMLInputElement>}
              type={inputType}
              disabled={disabled}
              maxLength={maxLength}
              className={baseStyles}
              onChange={handleInputChange}
              {...(rest as InputHTMLAttributes<HTMLInputElement>)}
            />
          )}

          {/* Right Side Icons */}
          {hasRightIcon && (
            <div className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center gap-2">
              {/* Character Count */}
              {showCharCount && maxLength && (
                <span className={cn(
                  'text-xs font-medium',
                  charCount >= maxLength * 0.9
                    ? 'text-error-500'
                    : 'text-(--color-text-muted)'
                )}>
                  {charCount}/{maxLength}
                </span>
              )}

              {/* Password Toggle */}
              {isPassword && (
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="text-(--color-text-muted) hover:text-(--color-text) transition-colors p-1"
                  tabIndex={-1}
                >
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              )}

              {/* Custom Right Icon */}
              {rightIcon && !isPassword && (
                <div className="text-(--color-text-muted)">
                  {rightIcon}
                </div>
              )}
            </div>
          )}
        </div>

        {/* Error Message */}
        {error && (
          <p className="mt-1.5 text-sm text-error-500 flex items-start gap-1">
            <span className="text-base leading-none">⚠</span>
            {error}
          </p>
        )}

        {/* Helper Text */}
        {helperText && !error && (
          <p className="mt-1.5 text-sm text-(--color-text-muted)">
            {helperText}
          </p>
        )}
      </div>
    );
  }
);

Input.displayName = 'Input';
