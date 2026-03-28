import { useState } from 'react';
import { Check, Copy, Palette } from 'lucide-react';
import { cn } from '@/utils/utilsCN';

export type ColorPaletteVariant = 'grid' | 'swatches' | 'compact' | 'detailed';

interface ColorSwatchProps {
  name: string;
  cssVar: string;
  showLabel?: boolean;
  size?: 'sm' | 'md' | 'lg';
  showHex?: boolean;
}

interface ColorPaletteProps {
  variant?: ColorPaletteVariant;
  showLabels?: boolean;
  className?: string;
}

/**
 * Resolve a CSS variable to its computed hex/rgb value
 */
function resolveColor(cssVar: string): string {
  try {
    return getComputedStyle(document.documentElement).getPropertyValue(cssVar).trim();
  } catch {
    return '';
  }
}

function ColorSwatch({ name, cssVar, showLabel = true, size = 'md', showHex = false }: ColorSwatchProps) {
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
          'rounded-xl shadow-lg hover:scale-110 transition-all duration-200 cursor-pointer relative overflow-hidden',
          'border border-(--color-border) hover:shadow-xl hover:ring-2 hover:ring-(--color-brand)/30'
        )}
        style={{ backgroundColor: `var(${cssVar})` }}
        title={`${name} — Click to copy`}
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
          <span className="text-xs text-(--color-text-muted) block font-medium">{name}</span>
          {showHex && (
            <span className="text-[10px] text-(--color-text-muted)/60 block font-mono">
              {resolveColor(cssVar) || cssVar}
            </span>
          )}
          {copied && (
            <span className="text-xs text-green-500 block animate-pulse">Copied!</span>
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
    { name: 'Brand Active', var: '--color-brand-active' },
    { name: 'Brand Light', var: '--color-brand-light' },
    { name: 'Brand FG', var: '--color-brand-foreground' },
  ],
  secondary: [
    { name: 'Secondary', var: '--color-secondary' },
    { name: 'Secondary Hover', var: '--color-secondary-hover' },
    { name: 'Secondary Light', var: '--color-secondary-light' },
    { name: 'Secondary FG', var: '--color-secondary-foreground' },
  ],
  accent: [
    { name: 'Accent', var: '--color-accent' },
    { name: 'Accent Hover', var: '--color-accent-hover' },
    { name: 'Accent Light', var: '--color-accent-light' },
    { name: 'Accent FG', var: '--color-accent-foreground' },
  ],
  status: [
    { name: 'Success', var: '--color-success' },
    { name: 'Success Light', var: '--color-success-light' },
    { name: 'Warning', var: '--color-warning' },
    { name: 'Warning Light', var: '--color-warning-light' },
    { name: 'Error', var: '--color-error' },
    { name: 'Error Light', var: '--color-error-light' },
    { name: 'Info', var: '--color-info' },
    { name: 'Info Light', var: '--color-info-light' },
  ],
  surfaces: [
    { name: 'Background', var: '--color-bg' },
    { name: 'BG Secondary', var: '--color-bg-secondary' },
    { name: 'BG Tertiary', var: '--color-bg-tertiary' },
    { name: 'Surface', var: '--color-surface' },
    { name: 'Surface Hover', var: '--color-surface-hover' },
  ],
  text: [
    { name: 'Text', var: '--color-text' },
    { name: 'Text Secondary', var: '--color-text-secondary' },
    { name: 'Text Muted', var: '--color-text-muted' },
  ],
  borders: [
    { name: 'Border', var: '--color-border' },
    { name: 'Border Light', var: '--color-border-light' },
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
            <h3 className="text-sm font-semibold text-(--color-text) mb-3 capitalize flex items-center gap-2">
              <Palette className="w-4 h-4 text-(--color-brand)" />
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

  if (variant === 'detailed') {
    return (
      <div className={cn('space-y-6', className)}>
        {Object.entries(COLORS).map(([category, colors]) => (
          <div key={category} className="glass-strong rounded-xl p-5 border border-(--color-border)">
            <h3 className="text-sm font-semibold text-(--color-text) mb-4 capitalize flex items-center gap-2">
              <Palette className="w-4 h-4 text-(--color-brand)" />
              {category}
              <span className="text-xs font-normal text-(--color-text-muted)">
                ({colors.length} colors)
              </span>
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3">
              {colors.map((color) => (
                <DetailedSwatch key={color.var} name={color.name} cssVar={color.var} />
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
          showHex
          size="lg"
        />
      ))}
    </div>
  );
}

/**
 * Detailed color swatch — shows name, variable, and resolved value in a card
 */
function DetailedSwatch({ name, cssVar }: { name: string; cssVar: string }) {
  const [copied, setCopied] = useState(false);

  const copy = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch {}
  };

  return (
    <div
      className="rounded-xl overflow-hidden border border-(--color-border) hover:border-(--color-brand)/40 transition-all group cursor-pointer hover:shadow-lg"
      onClick={() => copy(cssVar)}
    >
      <div
        className="h-16 w-full relative"
        style={{ backgroundColor: `var(${cssVar})` }}
      >
        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity bg-black/20">
          {copied ? (
            <Check className="w-5 h-5 text-white drop-shadow-md" />
          ) : (
            <Copy className="w-5 h-5 text-white drop-shadow-md" />
          )}
        </div>
      </div>
      <div className="p-2.5 bg-(--color-bg-secondary)">
        <p className="text-xs font-medium text-(--color-text) truncate">{name}</p>
        <p className="text-[10px] font-mono text-(--color-text-muted) truncate mt-0.5">
          var({cssVar})
        </p>
      </div>
    </div>
  );
}
