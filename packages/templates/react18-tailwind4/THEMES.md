# Theme System Documentation

## Overview
The React 18 + Tailwind 4 template now supports **6 professional themes** with modular CSS architecture for easy maintenance and theme switching.

## Available Themes

### 1. **Dark** (Default)
- **Description**: Professional solid dark theme - no glassmorphism
- **Best For**: Default professional use, coding environments
- **Colors**: 
  - Background: Slate 900 (#0f172a)
  - Primary: Blue 400 (#60a5fa)
  - Accent: Rose/Pink 400
- **Eye Strain**: Minimal - high contrast, solid colors

### 2. **Light**
- **Description**: Clean white for daytime use
- **Best For**: Bright environments, presentations
- **Colors**:
  - Background: Pure white (#ffffff)
  - Primary: Blue 500 (#3b82f6)
  - Accent: Rose 500
- **Eye Strain**: Minimal - standard light mode

### 3. **Glass Dark**
- **Description**: Glassmorphism with blue-black transparency
- **Best For**: Modern UI demos, visual appeal
- **Colors**:
  - Background: Semi-transparent blue-black (rgba)
  - Primary: Blue 400 with glow
  - Accent: Rose 400 with glow
- **Eye Strain**: Low - translucent backgrounds reduce harsh contrast
- **Special**: Prominent blur effects, glows

### 4. **Glass Light**
- **Description**: Light glassmorphism with soft transparency
- **Best For**: Light mode with modern aesthetics
- **Colors**:
  - Background: Semi-transparent white (rgba)
  - Primary: Blue 600
  - Accent: Rose 600
- **Eye Strain**: Low - soft transparency
- **Special**: Strong blur effects

### 5. **Midnight**
- **Description**: True black OLED-friendly with purple accent
- **Best For**: OLED devices, battery saving, night reading
- **Colors**:
  - Background: Pure black (#000000)
  - Primary: Violet 400 (#a78bfa)
  - Accent: Cyan 400 (#22d3ee)
- **Eye Strain**: Very low - pure black, no backlight bleed on OLED
- **Special**: Purple/cyan color scheme instead of blue

### 6. **Slate**
- **Description**: Warm gray corporate with amber accent
- **Best For**: Corporate environments, warm aesthetic preference
- **Colors**:
  - Background: Stone 900 (#1c1917)
  - Primary: Amber 400 (#fbbf24)
  - Accent: Teal 400 (#2dd4bf)
- **Eye Strain**: Minimal - warm tones are gentler on eyes
- **Special**: Warm gray tones, amber instead of blue

## Architecture

### Modular CSS Structure
```
src/
├── index.css (Main file - @theme tokens + theme definitions)
└── styles/
    ├── utilities-glass.css      (Glassmorphism & scrollbars)
    ├── utilities-effects.css    (Glow, gradients, animations)
    └── utilities-decorative.css (Blobs, backgrounds, mouse effects)
```

### Key Features
- **@theme block** stays in `index.css` (Tailwind v4 requirement)
- **Modular utilities** grouped by feature with animations
- **Easy theme switching**: Comment/uncomment `@import` statements
- **CSS custom properties** for runtime theme changes
- **Short syntax**: `text-(--color-bg)` instead of `text-[var(--color-bg)]`

## Usage

### Switching Themes Programmatically
```tsx
import { useTheme } from '@/context/themeContext';

function MyComponent() {
  const { theme, setTheme } = useTheme();
  
  return (
    <button onClick={() => setTheme('midnight')}>
      Switch to Midnight
    </button>
  );
}
```

### Theme Toggle (Cycles through all themes)
```tsx
const { toggleTheme } = useTheme();

// Cycle: dark → light → glass-dark → glass-light → midnight → slate → dark
<button onClick={toggleTheme}>Toggle Theme</button>
```

### Using ThemeSelector Component
```tsx
import { ThemeSelector } from '@/components/UI/ThemeSelector';

function SettingsPage() {
  return (
    <div>
      <h2>Theme Settings</h2>
      <ThemeSelector />
    </div>
  );
}
```

## Theme Variables

All themes use the same CSS variable names for consistency:

```css
/* Backgrounds */
--color-bg
--color-bg-secondary
--color-bg-tertiary

/* Text */
--color-text
--color-text-secondary
--color-text-muted

/* Brand (Primary) */
--color-brand
--color-brand-hover
--color-brand-active
--color-brand-light
--color-brand-foreground

/* Accent */
--color-accent
--color-accent-hover
--color-accent-light
--color-accent-foreground

/* Status */
--color-success / --color-warning / --color-error / --color-info
(each with -light and -foreground variants)

/* Glass Effects */
--glass-bg
--glass-border
--glass-shadow
--glass-blur

/* Glow */
--glow-primary
--glow-accent
```

## Customization

### Adding a New Theme
1. Add theme type to `src/types/theme.ts`:
   ```ts
   export type Theme = 'dark' | 'light' | ... | 'your-theme' | 'system';
   ```

2. Add theme definition in `src/index.css`:
   ```css
   [data-theme="your-theme"] {
     --color-bg: #...;
     --color-text: #...;
     /* ... other variables */
   }
   ```

3. Update `themeContext.tsx` to include in toggle cycle

4. Add to `ThemeSelector` component themes array

### Disabling Glassmorphism Features
Comment out the import in `index.css`:
```css
@import "./styles/utilities-glass.css";  /* Remove this line */
```

### Disabling Special Effects
```css
/* @import "./styles/utilities-effects.css"; */  /* Comment out */
```

## Testing
The ComponentTest page (`/component-test`) includes the ThemeSelector for visual testing of all themes with various UI components.

Navigate to: `http://localhost:3001/component-test`

## Performance Notes
- **Modular imports** reduce file size if features are commented out
- **CSS custom properties** enable instant theme switching without page reload
- **Glass themes** use more GPU (backdrop-filter) - consider for low-end devices
- **OLED-friendly**: Midnight theme saves battery on OLED displays

## Browser Support
- All themes: Modern browsers (Chrome 88+, Firefox 85+, Safari 14+)
- Glassmorphism: Requires backdrop-filter support (Chrome 76+, Safari 9+)
- CSS custom properties: All modern browsers

## Future Enhancements
- [ ] Persist theme choice to localStorage
- [ ] Auto-switch based on time of day
- [ ] Per-component theme overrides
- [ ] Custom theme builder UI
- [ ] Accessibility presets (high contrast, reduced motion)
