import * as PopoverPrimitive from '@radix-ui/react-popover';
import { Search, Check, X } from 'lucide-react';
import { useState, useMemo, ReactNode, useEffect, useRef } from 'react';

export interface ComboboxOption {
  value: string;
  label: string;
  description?: string;
  icon?: ReactNode;
  keywords?: string[]; // Additional search terms
  disabled?: boolean;
}

interface ComboboxProps {
  value: string;
  onValueChange: (value: string) => void;
  options: ComboboxOption[];
  placeholder?: string;
  searchPlaceholder?: string;
  label?: string;
  disabled?: boolean;
  className?: string;
  maxHeight?: string;
  emptyMessage?: string;
}

export function Combobox({
  value,
  onValueChange,
  options,
  placeholder = 'Select an option',
  searchPlaceholder = 'Search...',
  label,
  disabled = false,
  className = '',
  maxHeight = '384px',
  emptyMessage = 'No results found',
}: ComboboxProps) {
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);
  
  const selectedOption = options.find(opt => opt.value === value);

  // Filter options based on search
  const filteredOptions = useMemo(() => {
    if (!search.trim()) return options;
    
    const searchLower = search.toLowerCase();
    return options.filter(option => {
      const labelMatch = option.label.toLowerCase().includes(searchLower);
      const descMatch = option.description?.toLowerCase().includes(searchLower);
      const keywordMatch = option.keywords?.some(kw => kw.toLowerCase().includes(searchLower));
      
      return labelMatch || descMatch || keywordMatch;
    });
  }, [options, search]);

  // Focus input when opened
  useEffect(() => {
    if (open && inputRef.current) {
      setTimeout(() => inputRef.current?.focus(), 0);
    }
  }, [open]);

  const handleSelect = (optionValue: string) => {
    onValueChange(optionValue);
    setOpen(false);
    setSearch('');
  };

  const handleClear = () => {
    setSearch('');
    inputRef.current?.focus();
  };

  return (
    <div className={`w-full ${className}`}>
      {label && (
        <label className="block text-sm font-medium text-(--color-text) mb-2">
          {label}
        </label>
      )}
      
      <PopoverPrimitive.Root open={open} onOpenChange={setOpen}>
        <PopoverPrimitive.Trigger asChild>
          <button
            disabled={disabled}
            className="w-full px-4 py-3 rounded-lg border border-(--color-border) bg-(--color-bg-secondary) text-(--color-text) hover:border-(--color-brand) focus:border-(--color-brand) focus:outline-none focus:ring-2 focus:ring-(--color-brand) focus:ring-opacity-20 transition-all cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-between gap-3"
          >
            <div className="flex items-center gap-3 flex-1 min-w-0">
              {selectedOption ? (
                <>
                  {selectedOption.icon && (
                    <span className="shrink-0 text-lg">{selectedOption.icon}</span>
                  )}
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
            <Search className="w-5 h-5 text-(--color-text-secondary) shrink-0" />
          </button>
        </PopoverPrimitive.Trigger>

        <PopoverPrimitive.Portal>
          <PopoverPrimitive.Content
            className="w-(--radix-popover-trigger-width) bg-(--color-bg-secondary) rounded-lg border border-(--color-border) shadow-xl z-9999 overflow-hidden"
            sideOffset={8}
            align="start"
          >
            {/* Search Input */}
            <div className="p-3 border-b border-(--color-border)">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-(--color-text-muted)" />
                <input
                  ref={inputRef}
                  type="text"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder={searchPlaceholder}
                  className="w-full pl-9 pr-9 py-2 rounded-md border border-(--color-border) bg-(--color-bg-tertiary) text-(--color-text) placeholder:text-(--color-text-muted) focus:outline-none focus:ring-2 focus:ring-(--color-brand) focus:ring-opacity-20 text-sm"
                />
                {search && (
                  <button
                    onClick={handleClear}
                    className="absolute right-2 top-1/2 -translate-y-1/2 p-1 hover:bg-(--color-bg) rounded transition-colors"
                  >
                    <X className="w-3 h-3 text-(--color-text-muted)" />
                  </button>
                )}
              </div>
            </div>

            {/* Options List */}
            <div 
              className="p-1 overflow-y-auto"
              style={{ maxHeight }}
            >
              {filteredOptions.length === 0 ? (
                <div className="px-4 py-8 text-center text-sm text-(--color-text-muted)">
                  {emptyMessage}
                </div>
              ) : (
                filteredOptions.map((option) => (
                  <button
                    key={option.value}
                    onClick={() => handleSelect(option.value)}
                    disabled={option.disabled}
                    className={`
                      relative flex items-center gap-3 w-full px-4 py-3 rounded-md outline-none cursor-pointer select-none transition-colors
                      hover:bg-(--color-bg-tertiary) focus:bg-(--color-bg-tertiary)
                      disabled:opacity-50 disabled:cursor-not-allowed
                      ${value === option.value ? 'bg-(--color-brand-light)' : ''}
                    `}
                  >
                    {option.icon && (
                      <span className="shrink-0 text-lg">{option.icon}</span>
                    )}
                    
                    <div className="flex-1 text-left min-w-0">
                      <div className="text-sm font-medium text-(--color-text)">
                        {option.label}
                      </div>
                      {option.description && (
                        <div className="text-xs text-(--color-text-muted)">
                          {option.description}
                        </div>
                      )}
                    </div>
                    
                    {value === option.value && (
                      <Check className="w-5 h-5 text-(--color-brand) shrink-0" />
                    )}
                  </button>
                ))
              )}
            </div>
          </PopoverPrimitive.Content>
        </PopoverPrimitive.Portal>
      </PopoverPrimitive.Root>
    </div>
  );
}
