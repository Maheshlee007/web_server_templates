import { useState } from 'react';
import { Check, Copy } from 'lucide-react';
import { cn } from '@/utils/utilsCN';

export type ColorPaletteVariant = 'grid' | 'swatches' | 'compact';

interface ColorSwatchProps {
  name: string;
  cssVar: string;
  showLabel?: boolean;
  size?: 'sm' | 'md' | 'lg';
}

interface ColorPaletteProps {
  variant?: ColorPaletteVariant;
  showLabels?: boolean;
  className?: string;
}

function ColorSwatch({ name, cssVar, showLabel = true, size = 'md' }: ColorSwatchProps) {
  const [copied, setCopied] = useState(false);

  const copyColor = async () => {
    try {
      await navigator.clipboard.writeText(cssVar);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  const sizeClasses = {
    sm: 'w-10 h-10',
    md: 'w-14 h-14',
    lg: 'w-16 h-16',
  };

  return (
    <div className="flex flex-col items-center gap-2 group">
      <button
        onClick={copyColor}
        className={cn(
          sizeClasses[size],
          'rounded-xl shadow-lg hover:scale-110 transition-transform cursor-pointer relative overflow-hidden',
          'border border-(--color-border)'
        )}
        style={{ backgroundColor: `var(${cssVar})` }}
        title={`${name} - Click to copy`}
        aria-label={`Copy ${name} color variable`}
      >
        <div className="absolute inset-0 flex items-center justify-center bg-black/0 hover:bg-black/10 transition-colors">
          {copied ? (
            <Check className="w-4 h-4 text-white opacity-0 group-hover:opacity-100" />
          ) : (
            <Copy className="w-4 h-4 text-white opacity-0 group-hover:opacity-100" />
          )}
        </div>
      </button>
      {showLabel && (
        <div className="text-center">
          <span className="text-xs text-(--color-text-muted) block">{name}</span>
          {copied && (
            <span className="text-xs text-green-500 block">Copied!</span>
          )}
        </div>
      )}
    </div>
  );
}

const COLORS = {
  brand: [
    { name: 'Brand', var: '--color-brand' },
    { name: 'Brand Hover', var: '--color-brand-hover' },
    { name: 'Brand Light', var: '--color-brand-light' },
  ],
  accent: [
    { name: 'Accent', var: '--color-accent' },
    { name: 'Accent Hover', var: '--color-accent-hover' },
    { name: 'Accent Light', var: '--color-accent-light' },
  ],
  status: [
    { name: 'Success', var: '--color-success' },
    { name: 'Warning', var: '--color-warning' },
    { name: 'Error', var: '--color-error' },
    { name: 'Info', var: '--color-info' },
  ],
  background: [
    { name: 'Background', var: '--color-bg' },
    { name: 'BG Secondary', var: '--color-bg-secondary' },
    { name: 'BG Tertiary', var: '--color-bg-tertiary' },
  ],
  text: [
    { name: 'Text', var: '--color-text' },
    { name: 'Text Secondary', var: '--color-text-secondary' },
    { name: 'Text Muted', var: '--color-text-muted' },
  ],
};

export function ColorPalette({ variant = 'grid', showLabels = true, className }: ColorPaletteProps) {
  if (variant === 'compact') {
    return (
      <div className={cn('flex flex-wrap gap-2 items-center', className)}>
        {Object.values(COLORS).flat().map((color) => (
          <ColorSwatch
            key={color.var}
            name={color.name}
            cssVar={color.var}
            showLabel={false}
            size="sm"
          />
        ))}
      </div>
    );
  }

  if (variant === 'swatches') {
    return (
      <div className={cn('space-y-6', className)}>
        {Object.entries(COLORS).map(([category, colors]) => (
          <div key={category}>
            <h3 className="text-sm font-semibold text-(--color-text) mb-3 capitalize">
              {category}
            </h3>
            <div className="flex flex-wrap gap-4">
              {colors.map((color) => (
                <ColorSwatch
                  key={color.var}
                  name={color.name}
                  cssVar={color.var}
                  showLabel={showLabels}
                  size="md"
                />
              ))}
            </div>
          </div>
        ))}
      </div>
    );
  }

  // Grid variant (default)
  return (
    <div className={cn('grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4', className)}>
      {Object.values(COLORS).flat().map((color) => (
        <ColorSwatch
          key={color.var}
          name={color.name}
          cssVar={color.var}
          showLabel={showLabels}
          size="lg"
        />
      ))}
    </div>
  );
}
