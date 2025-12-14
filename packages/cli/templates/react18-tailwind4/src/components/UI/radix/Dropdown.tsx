import * as SelectPrimitive from '@radix-ui/react-select';
import { Check, ChevronDown } from 'lucide-react';
import { ReactNode } from 'react';

export interface SelectOption {
  value: string;
  label: string;
  description?: string;
  icon?: ReactNode; // Icon/emoji or component
  colorPalette?: string[]; // Array of colors for circles
  disabled?: boolean;
}

interface SelectProps {
  value: string;
  onValueChange: (value: string) => void;
  options: SelectOption[];
  placeholder?: string;
  label?: string;
  disabled?: boolean;
  className?: string;
  maxHeight?: string; // e.g., "300px", "max-h-96"
}

export function Select({
  value,
  onValueChange,
  options,
  placeholder = 'Select an option',
  label,
  disabled = false,
  className = '',
  maxHeight = '384px', // Default 96 * 4px = 384px (max-h-96)
}: SelectProps) {
  const selectedOption = options.find(opt => opt.value === value);

  return (
    <div className={`w-full ${className}`}>
      {label && (
        <label className="block text-sm font-medium text-(--color-text) mb-2">
          {label}
        </label>
      )}
      
      <SelectPrimitive.Root value={value} onValueChange={onValueChange} disabled={disabled}>
        <SelectPrimitive.Trigger
          className="w-full px-4 py-3 rounded-lg border border-(--color-border) bg-(--color-bg-secondary) text-(--color-text) hover:border-(--color-brand) focus:border-(--color-brand) focus:outline-none focus:ring-2 focus:ring-(--color-brand) focus:ring-opacity-20 transition-all cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-between gap-3"
        >
          <div className="flex items-center gap-3 flex-1 min-w-0">
            {/* Selected option display */}
            {selectedOption ? (
              <>
                {/* Icon */}
                {selectedOption.icon && (
                  <span className="shrink-0 text-lg">{selectedOption.icon}</span>
                )}
                
                {/* Color Palette */}
                {selectedOption.colorPalette && selectedOption.colorPalette.length > 0 && (
                  <div className="flex -space-x-2 shrink-0">
                    {selectedOption.colorPalette.map((color, idx) => (
                      <div
                        key={idx}
                        className="w-5 h-5 rounded-full border-2 border-(--color-bg-secondary)"
                        style={{ backgroundColor: color }}
                      />
                    ))}
                  </div>
                )}
                
                {/* Label & Description */}
                <div className="flex-1 text-left min-w-0">
                  <div className="text-sm font-medium truncate">{selectedOption.label}</div>
                  {selectedOption.description && (
                    <div className="text-xs text-(--color-text-muted) truncate">
                      {selectedOption.description}
                    </div>
                  )}
                </div>
              </>
            ) : (
              <span className="text-(--color-text-muted)">{placeholder}</span>
            )}
          </div>
          
          <SelectPrimitive.Icon asChild>
            <ChevronDown className="w-5 h-5 text-(--color-text-secondary) shrink-0" />
          </SelectPrimitive.Icon>
        </SelectPrimitive.Trigger>

        <SelectPrimitive.Portal>
          <SelectPrimitive.Content
            className="overflow-hidden bg-(--color-bg-secondary) rounded-lg border border-(--color-border) shadow-xl z-9999"
            position="popper"
            sideOffset={8}
          >
            <SelectPrimitive.Viewport 
              className="p-1"
              style={{ maxHeight }}
            >
              {options.map((option) => (
                <SelectPrimitive.Item
                  key={option.value}
                  value={option.value}
                  disabled={option.disabled}
                  className="relative flex items-center gap-3 px-4 py-3 rounded-md outline-none cursor-pointer select-none transition-colors hover:bg-(--color-bg-tertiary) focus:bg-(--color-bg-tertiary) data-disabled:opacity-50 data-disabled:cursor-not-allowed data-[state=checked]:bg-(--color-brand-light)"
                >
                  {/* Icon */}
                  {option.icon && (
                    <span className="shrink-0 text-lg">{option.icon}</span>
                  )}
                  
                  {/* Color Palette */}
                  {option.colorPalette && option.colorPalette.length > 0 && (
                    <div className="flex -space-x-2 shrink-0">
                      {option.colorPalette.map((color, idx) => (
                        <div
                          key={idx}
                          className="w-5 h-5 rounded-full border-2 border-(--color-bg-secondary)"
                          style={{ backgroundColor: color }}
                        />
                      ))}
                    </div>
                  )}
                  
                  {/* Label & Description */}
                  <div className="flex-1 min-w-0">
                    <SelectPrimitive.ItemText>
                      <div className="text-sm font-medium text-(--color-text)">
                        {option.label}
                      </div>
                    </SelectPrimitive.ItemText>
                    {option.description && (
                      <div className="text-xs text-(--color-text-muted)">
                        {option.description}
                      </div>
                    )}
                  </div>
                  
                  {/* Check indicator */}
                  <SelectPrimitive.ItemIndicator asChild>
                    <Check className="w-5 h-5 text-(--color-brand) shrink-0" />
                  </SelectPrimitive.ItemIndicator>
                </SelectPrimitive.Item>
              ))}
            </SelectPrimitive.Viewport>
          </SelectPrimitive.Content>
        </SelectPrimitive.Portal>
      </SelectPrimitive.Root>
    </div>
  );
}
