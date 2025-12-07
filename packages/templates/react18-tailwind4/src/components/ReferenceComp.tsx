import { useTheme } from '@/context/themeContext';
import { useMousePosition } from '@/hooks/useMousePosition';
import { Moon, Sun, Monitor } from 'lucide-react';

function ReferenceComp() {
  const { theme, resolvedTheme, setTheme } = useTheme();
  
  // Enable mouse-follow gradient effect
  useMousePosition();

  const themeIcons = {
    light: <Sun size={18} />,
    dark: <Moon size={18} />,
    system: <Monitor size={18} />,
  };

  return (
    <div className="min-h-screen bg-(--color-bg) transition-colors duration-300 relative overflow-hidden mouse-gradient scrollbar-hide">
      {/* ============================================
          GRADIENT BACKGROUND
          WHY: Gradient blobs for glass effect visibility
          ============================================ */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        {/* Animated gradient blobs */}
        <div className="blob blob-primary w-[600px] h-[600px] -top-48 -left-48" />
        <div className="blob blob-accent w-[300px] h-[500px] top-2/3 -right-32 blob-delay-2s" />
        <div className="blob blob-primary w-[300px] h-[400px] -bottom-32 left-1/4 blob-delay-4s" />
      </div>

      {/* Main Content */}
      <div className="relative z-10 p-6 md:p-8 max-w-7xl mx-auto">
        {/* Header with Glass + Spotlight Effect */}
        <header className="glass-strong rounded-2xl p-6 mb-8 flex flex-col md:flex-row items-center justify-between gap-4 spotlight">
          <div>
            <h1 className="text-gradient text-3xl md:text-4xl font-bold mb-2">
              React 18 + Tailwind v4
            </h1>
            <p className="text-(--color-text-secondary)">
              Modern glassmorphism design system • Move your mouse around!
            </p>
          </div>

          {/* Theme Switcher */}
          <div className="glass rounded-full p-1.5 flex items-center gap-1">
            {(['light', 'dark', 'system'] as const).map((t) => (
              <button
                key={t}
                onClick={() => setTheme(t)}
                className={`
                  flex items-center gap-2 rounded-full px-4 py-2 text-sm font-medium transition-all
                  ${theme === t
                    ? 'bg-(--color-brand) text-white shadow-lg'
                    : 'text-(--color-text-secondary) hover:text-(--color-text) hover:bg-white/10'
                  }
                `}
              >
                {themeIcons[t]}
                <span className="hidden sm:inline capitalize">{t}</span>
              </button>
            ))}
          </div>
        </header>

        {/* Hero Section - Two Card Types */}
        <section className="grid lg:grid-cols-2 gap-6 mb-8">
          {/* Glass Card with Noise Overlay */}
          <div className="glass-strong rounded-2xl p-8  spotlight">
            <span className="inline-block px-3 py-1 rounded-full text-xs font-semibold bg-(--color-brand-light) text-(--color-brand) mb-4">
              GLASSMORPHISM
            </span>
            <h2 className="text-2xl md:text-3xl font-bold text-(--color-text) mb-4">
              True Glass Effect
            </h2>
            <p className="text-(--color-text-secondary) mb-6 leading-relaxed">
              Glass over gradient blobs. The mouse-follow gradient adds dynamic lighting.
              Grid pattern provides depth.
            </p>
            <div className="flex gap-3 flex-wrap">
              <button className="bg-(--color-brand) text-white px-6 py-2.5 rounded-lg font-medium hover:bg-(--color-brand-hover) transition-all hover:shadow-(--glow-primary) shimmer">
                Primary Button
              </button>
              <button className="glass px-6 py-2.5 rounded-lg font-medium text-(--color-text) hover:bg-white/20 transition-all">
                Glass Button
              </button>
            </div>
          </div>

          {/* Gradient Border Card */}
          <div className="glow-border  glass-strong rounded-2xl p-8">
            <span className="inline-block px-3 py-1 rounded-full text-xs font-semibold bg-(--color-accent-light) text-(--color-accent) mb-4">
              GRADIENT BORDER
            </span>
            <h2 className="text-2xl md:text-3xl font-bold text-(--color-text) mb-4">
              Hover for Glow
            </h2>
            <p className="text-(--color-text-secondary) mb-6 leading-relaxed">
              Simple gradient border with subtle glow on hover. 
              Clean and performant.
            </p>
            <div className="flex gap-3 flex-wrap">
              <button className="bg-(--color-accent) text-white px-6 py-2.5 rounded-lg font-medium hover:bg-(--color-accent-hover) transition-all hover:glow-accent">
                Accent Button
              </button>
            </div>
          </div>
        </section>

        {/* Feature Cards with Different Effects */}
        <section className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
          {/* Gradient Card (Reference 1 Style) */}
          <div className="bg-card-gradient rounded-2xl p-6 text-white shimmer">
            <h3 className="text-lg font-semibold mb-2">Gradient Card</h3>
            <p className="text-sm text-gray-300 mb-4">
              Linear gradient background with subtle border
            </p>
            <code className="bg-white/10 px-3 py-1.5 rounded text-xs">
              .bg-card-gradient
            </code>
          </div>

          {/* Spotlight Card */}
          <div className="glass rounded-2xl p-6 spotlight">
            <h3 className="text-lg font-semibold text-(--color-text) mb-2">
              Spotlight Effect
            </h3>
            <p className="text-sm text-(--color-text-secondary) mb-4">
              Hover to see the spotlight follow your mouse
            </p>
            <code className="bg-(--color-bg-tertiary) px-3 py-1.5 rounded text-xs text-(--color-text)">
              .spotlight
            </code>
          </div>

          {/* Shimmer Card */}
          <div className="glass rounded-2xl p-6 shimmer overflow-hidden">
            <h3 className="text-lg font-semibold text-(--color-text) mb-2">
              Shimmer Effect
            </h3>
            <p className="text-sm text-(--color-text-secondary) mb-4">
              Hover to see the shimmer animation sweep across
            </p>
            <code className="bg-(--color-bg-tertiary) px-3 py-1.5 rounded text-xs text-(--color-text)">
              .shimmer
            </code>
          </div>

          {/* Status Cards - using explicit borders */}
          <div className="glass rounded-xl p-5 border-l-4 border-l-(--color-success) border border-(--glass-border) spotlight ">
            <h3 className="text-lg font-semibold text-(--color-success) mb-2">
              ✓ Success
            </h3>
            <p className="text-sm text-(--color-text-secondary)">
              Operation completed successfully
            </p>
          </div>

          <div className="glass rounded-xl p-5 border-l-4 border-l-(--color-warning) border border-(--glass-border) spotlight">
            <h3 className="text-lg font-semibold text-(--color-warning) mb-2">
              ⚠ Warning
            </h3>
            <p className="text-sm text-(--color-text-secondary)">
              Please review before continuing
            </p>
          </div>

          <div className="glass rounded-xl p-5 border-l-4 border-l-(--color-error) border border-(--glass-border) spotlight">
            <h3 className="text-lg font-semibold text-(--color-error) mb-2">
              ✕ Error
            </h3>
            <p className="text-sm text-(--color-text-secondary)">
              Something went wrong
            </p>
          </div>
        </section>

        {/* Color Palette Preview */}
        {/* Color Palette - Current Theme Colors */}
        <section className="glass-strong rounded-2xl p-6 mb-8">
          <h2 className="text-xl font-bold text-(--color-text) mb-6">
            Theme Colors
          </h2>
          
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3">
            {/* Brand Colors */}
            <div className="flex flex-col items-center gap-2">
              <div className="w-14 h-14 rounded-xl bg-(--color-brand) shadow-lg hover:scale-110 transition-transform cursor-pointer" title="Brand" />
              <span className="text-xs text-(--color-text-muted)">Brand</span>
            </div>
            <div className="flex flex-col items-center gap-2">
              <div className="w-14 h-14 rounded-xl bg-(--color-brand-hover) shadow-lg hover:scale-110 transition-transform cursor-pointer" title="Brand Hover" />
              <span className="text-xs text-(--color-text-muted)">Brand Hover</span>
            </div>
            <div className="flex flex-col items-center gap-2">
              <div className="w-14 h-14 rounded-xl bg-(--color-brand-light) shadow-lg hover:scale-110 transition-transform cursor-pointer" title="Brand Light" />
              <span className="text-xs text-(--color-text-muted)">Brand Light</span>
            </div>
            
            {/* Accent Colors */}
            <div className="flex flex-col items-center gap-2">
              <div className="w-14 h-14 rounded-xl bg-(--color-accent) shadow-lg hover:scale-110 transition-transform cursor-pointer" title="Accent" />
              <span className="text-xs text-(--color-text-muted)">Accent</span>
            </div>
            <div className="flex flex-col items-center gap-2">
              <div className="w-14 h-14 rounded-xl bg-(--color-accent-hover) shadow-lg hover:scale-110 transition-transform cursor-pointer" title="Accent Hover" />
              <span className="text-xs text-(--color-text-muted)">Accent Hover</span>
            </div>
            <div className="flex flex-col items-center gap-2">
              <div className="w-14 h-14 rounded-xl bg-(--color-accent-light) shadow-lg hover:scale-110 transition-transform cursor-pointer" title="Accent Light" />
              <span className="text-xs text-(--color-text-muted)">Accent Light</span>
            </div>
            
            {/* Status Colors */}
            <div className="flex flex-col items-center gap-2">
              <div className="w-14 h-14 rounded-xl bg-(--color-success) shadow-lg hover:scale-110 transition-transform cursor-pointer" title="Success" />
              <span className="text-xs text-(--color-text-muted)">Success</span>
            </div>
            <div className="flex flex-col items-center gap-2">
              <div className="w-14 h-14 rounded-xl bg-(--color-warning) shadow-lg hover:scale-110 transition-transform cursor-pointer" title="Warning" />
              <span className="text-xs text-(--color-text-muted)">Warning</span>
            </div>
            <div className="flex flex-col items-center gap-2">
              <div className="w-14 h-14 rounded-xl bg-(--color-error) shadow-lg hover:scale-110 transition-transform cursor-pointer" title="Error" />
              <span className="text-xs text-(--color-text-muted)">Error</span>
            </div>
            
            {/* Background Colors */}
            <div className="flex flex-col items-center gap-2">
              <div className="w-14 h-14 rounded-xl bg-(--color-bg) border border-(--glass-border) shadow-lg hover:scale-110 transition-transform cursor-pointer" title="Background" />
              <span className="text-xs text-(--color-text-muted)">Background</span>
            </div>
            <div className="flex flex-col items-center gap-2">
              <div className="w-14 h-14 rounded-xl bg-(--color-bg-secondary) border border-(--glass-border) shadow-lg hover:scale-110 transition-transform cursor-pointer" title="BG Secondary" />
              <span className="text-xs text-(--color-text-muted)">BG Secondary</span>
            </div>
            <div className="flex flex-col items-center gap-2">
              <div className="w-14 h-14 rounded-xl bg-(--color-bg-tertiary) border border-(--glass-border) shadow-lg hover:scale-110 transition-transform cursor-pointer" title="BG Tertiary" />
              <span className="text-xs text-(--color-text-muted)">BG Tertiary</span>
            </div>
          </div>
        </section>

        {/* Effects Showcase */}
        <section className="glass-strong rounded-2xl p-6 mb-8">
          <h2 className="text-xl font-bold text-(--color-text) mb-4">
            Available Effects
          </h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {/* Glass Effect */}
            <div className="glass border border-(--glass-border) rounded-xl p-4">
              <code className="text-xs font-semibold text-(--color-brand)">.glass</code>
              <p className="text-xs text-(--color-text-muted) mt-1">Frosted glass effect</p>
            </div>
            
            {/* Glass Strong */}
            <div className="glass-strong rounded-xl p-4">
              <code className="text-xs font-semibold text-(--color-brand)">.glass-strong</code>
              <p className="text-xs text-(--color-text-muted) mt-1">More blur & saturation</p>
            </div>
            
            {/* Spotlight */}
            <div className="glass border border-(--glass-border) rounded-xl p-4 spotlight">
              <code className="text-xs font-semibold text-(--color-brand)">.spotlight</code>
              <p className="text-xs text-(--color-text-muted) mt-1">Mouse-follow highlight</p>
            </div>
            
            {/* Shimmer */}
            <div className="glass border border-(--glass-border) rounded-xl p-4 shimmer">
              <code className="text-xs font-semibold text-(--color-brand)">.shimmer</code>
              <p className="text-xs text-(--color-text-muted) mt-1">Hover sweep animation</p>
            </div>
            
            {/* Gradient Border */}
            <div className="gradient-border-glow rounded-xl p-4">
              <code className="text-xs font-semibold text-(--color-brand)">.gradient-border-glow</code>
              <p className="text-xs text-(--color-text-muted) mt-1">Gradient border + hover glow</p>
            </div>
            
            {/* Gradient Card */}
            <div className="bg-card-gradient rounded-xl p-4">
              <code className="text-xs font-semibold text-blue-400">.bg-card-gradient</code>
              <p className="text-xs text-gray-400 mt-1">Premium dark gradient</p>
            </div>
            
            {/* Text Gradient */}
            <div className="glass border border-(--glass-border) rounded-xl p-4">
              <code className="text-xs font-semibold text-gradient">.text-gradient</code>
              <p className="text-xs text-(--color-text-muted) mt-1">Gradient text effect</p>
            </div>
            
            {/* Mouse Gradient */}
            <div className="glass border border-(--glass-border) rounded-xl p-4">
              <code className="text-xs font-semibold text-(--color-brand)">.mouse-gradient</code>
              <p className="text-xs text-(--color-text-muted) mt-1">Global mouse follow</p>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="glass rounded-xl p-4 text-center">
          <p className="text-sm text-(--color-text-muted)">
            Theme: <span className="font-semibold text-(--color-brand)">{theme}</span>
            {theme === 'system' && (
              <span className="ml-2">(Resolved: {resolvedTheme})</span>
            )}
            <span className="mx-3">•</span>
            Built with React 18 + Tailwind v4 + OKLCH Colors
          </p>
        </footer>
      </div>
    </div>
  );
}

export default ReferenceComp;