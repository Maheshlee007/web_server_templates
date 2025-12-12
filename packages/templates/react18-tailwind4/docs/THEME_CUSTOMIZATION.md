# 🎨 Theme System - Complete Customization Guide

Comprehensive guide to understanding and customizing the theme system.

---

## 📋 Table of Contents

- [Theme Architecture](#theme-architecture)
- [Color System Explained](#color-system-explained)
- [File Structure](#file-structure)
- [Customization Methods](#customization-methods)
- [Creating Custom Themes](#creating-custom-themes)
- [Color Reference](#color-reference)

---

## Theme Architecture

### Overview

The theme system uses a **two-layer architecture**:

1. **Design Tokens Layer** - Fixed color scales (never change between themes)
2. **Semantic Variables Layer** - Theme-specific mappings that change per theme

```
┌─────────────────────────────────────────────┐
│  @theme Block (Design Tokens)              │
│  ├─ Primary Scale (50-950)                 │
│  ├─ Secondary Scale (50-950)               │
│  ├─ Accent Scale (50-950)                  │
│  ├─ Success/Warning/Error/Info Scales      │
│  └─ Never changes between themes           │
└─────────────────────────────────────────────┘
              ↓ Maps to
┌─────────────────────────────────────────────┐
│  Semantic Variables (:root, [data-theme])  │
│  ├─ --color-bg, --color-text, etc.        │
│  ├─ Changes based on active theme          │
│  └─ Used directly in components            │
└─────────────────────────────────────────────┘
```

---

## Color System Explained

### Design Tokens (@theme block)

**Location:** `src/index.css` (lines 20-100)

These are **fixed color scales** that provide the palette for all themes:

#### Primary Scale - Professional Blue
```css
--color-primary-50  → #eff6ff  (Lightest - backgrounds)
--color-primary-100 → #dbeafe
--color-primary-200 → #bfdbfe
--color-primary-300 → #93c5fd
--color-primary-400 → #60a5fa  (Bright - dark theme buttons)
--color-primary-500 → #3b82f6  (Base - balanced)
--color-primary-600 → #2563eb  (Default - light theme buttons)
--color-primary-700 → #1d4ed8  (Dark - hover states)
--color-primary-800 → #1e40af  (Darker)
--color-primary-900 → #1e3a8a  (Darkest)
--color-primary-950 → #172554  (Nearly black)
```

**Usage:** Maps to `--color-brand` in themes

#### Secondary Scale - Neutral Slate
```css
--color-secondary-50  → #f8fafc  (Lightest - backgrounds)
--color-secondary-100 → #f1f5f9
--color-secondary-200 → #e2e8f0
--color-secondary-300 → #cbd5e1
--color-secondary-400 → #94a3b8  (Medium - borders, muted text)
--color-secondary-500 → #64748b  (Base)
--color-secondary-600 → #475569  (Default - secondary buttons)
--color-secondary-700 → #334155  (Dark)
--color-secondary-800 → #1e293b  (Darker - dark theme backgrounds)
--color-secondary-900 → #0f172a  (Darkest - main dark background)
--color-secondary-950 → #020617  (Nearly black)
```

**Usage:** Maps to backgrounds, text, borders in themes

#### Accent Scale - Rose/Pink
```css
--color-accent-50  → Lightest pink (backgrounds)
--color-accent-600 → #e11d48 (Rose-600 - light theme accent)
--color-accent-400 → #fb7185 (Rose-400 - dark theme accent)
--color-accent-700 → #be123c (Rose-700 - hover states)
```

**Usage:** Maps to `--color-accent` for highlights and CTAs

#### Status Colors
```css
/* Success - Green */
--color-success-50  → #f0fdf4  (Light background)
--color-success-600 → #16a34a  (Success in light themes)
--color-success-500 → #22c55e  (Success base)

/* Warning - Amber */
--color-warning-50  → #fffbeb  (Light background)
--color-warning-600 → #d97706  (Warning in light themes)
--color-warning-500 → #f59e0b  (Warning base)

/* Error - Red */
--color-error-50  → #fef2f2  (Light background)
--color-error-600 → #dc2626  (Error in light themes)
--color-error-500 → #ef4444  (Error base)

/* Info - Sky Blue */
--color-info-50  → #f0f9ff  (Light background)
--color-info-600 → #0284c7  (Info in light themes)
--color-info-500 → #0ea5e9  (Info base)
```

---

### Semantic Variables (Per-Theme)

**Location:** 
- Default (Ocean Light): `src/index.css` `:root` block (lines 110-180)
- Ocean Deep: `src/index.css` `[data-theme="dark"]` block (lines 182-250)
- Forest: `src/styles/themes/glass-light.css`
- Cosmic: `src/styles/themes/glass-dark.css`
- Milky Mist: `src/styles/themes/slate.css`
- Midnight: `src/styles/themes/midnight.css`

These variables **change based on the active theme**:

#### Background Colors (3 Levels)
```css
--color-bg           /* Main page background */
--color-bg-secondary /* Cards, panels, elevated surfaces */
--color-bg-tertiary  /* Higher elevation (nested cards) */
--color-surface      /* Dropdown/popover solid background */
--color-surface-hover /* Hover state for menu items */
```

**Purpose:**
- Creates depth hierarchy (z-index visual layers)
- `bg` → `bg-secondary` → `bg-tertiary` creates elevation
- `surface` for floating elements (dropdowns, tooltips)
- `surface-hover` for interactive feedback

**Example Usage:**
```tsx
<div className="bg-(--color-bg)">                    {/* Page background */}
  <Card className="bg-(--color-bg-secondary)">       {/* Card on page */}
    <div className="bg-(--color-bg-tertiary)">       {/* Nested section */}
      <Dropdown className="bg-(--color-surface)">    {/* Floating menu */}
```

#### Text Colors (3 Levels)
```css
--color-text           /* Primary text - highest contrast */
--color-text-secondary /* Secondary text - labels, captions */
--color-text-muted     /* Muted text - placeholders, disabled */
```

**Purpose:**
- Creates text hierarchy (importance/readability)
- `text` for body content, headings
- `text-secondary` for supporting information
- `text-muted` for de-emphasized content

**Example Usage:**
```tsx
<h1 className="text-(--color-text)">Main Title</h1>
<p className="text-(--color-text-secondary)">Subtitle</p>
<span className="text-(--color-text-muted)">Optional info</span>
```

#### Border Colors (2 Levels)
```css
--color-border       /* Standard borders - cards, inputs */
--color-border-light /* Subtle borders - dividers, separators */
```

**Purpose:**
- `border` for structural boundaries
- `border-light` for visual separation without hard lines

#### Brand Colors (5 Variants)
```css
--color-brand            /* Primary action buttons, links */
--color-brand-hover      /* Hover state */
--color-brand-active     /* Active/pressed state */
--color-brand-light      /* Light background (10-15% opacity) */
--color-brand-foreground /* Text color on brand background */
```

**Purpose:**
- Main call-to-action color
- Used for primary buttons, active nav items, links
- Represents your brand identity

**Example Usage:**
```tsx
<Button className="bg-(--color-brand) text-(--color-brand-foreground)">
  Save Changes
</Button>
<div className="bg-(--color-brand-light)">  {/* Subtle brand tint */}
  Info box with brand accent
</div>
```

#### Secondary Colors (5 Variants)
```css
--color-secondary            /* Secondary buttons, less important actions */
--color-secondary-hover      /* Hover state */
--color-secondary-light      /* Light background */
--color-secondary-foreground /* Text on secondary background */
```

**Purpose:**
- Alternative actions (Cancel, Back, etc.)
- Less prominent than brand
- Neutral alternative

#### Accent Colors (5 Variants)
```css
--color-accent            /* Highlights, badges, special elements */
--color-accent-hover      /* Hover state */
--color-accent-light      /* Light background */
--color-accent-foreground /* Text on accent background */
```

**Purpose:**
- Draw attention without being primary
- Badges, tags, highlights
- Complementary to brand color

#### Status Colors (3 Variants Each)
```css
/* Success - Positive feedback */
--color-success            /* Success buttons, icons */
--color-success-light      /* Success banner backgrounds */
--color-success-foreground /* Text on success background */

/* Warning - Caution states */
--color-warning            /* Warning buttons, icons */
--color-warning-light      /* Warning banner backgrounds */
--color-warning-foreground /* Text on warning background */

/* Error - Error states */
--color-error            /* Error buttons, icons, validation */
--color-error-light      /* Error banner backgrounds */
--color-error-foreground /* Text on error background */

/* Info - Informational */
--color-info            /* Info buttons, icons */
--color-info-light      /* Info banner backgrounds */
--color-info-foreground /* Text on info background */
```

**Purpose:**
- Semantic feedback to users
- Success: confirmation, completion
- Warning: caution, reversible actions
- Error: validation failures, critical issues
- Info: helpful tips, neutral information

#### Glass Effect (4 Properties)
```css
--glass-bg     /* Semi-transparent background with blur */
--glass-border /* Subtle border for glass elements */
--glass-shadow /* Soft shadow for depth */
--glass-blur   /* Blur amount (8-16px) */
```

**Purpose:**
- Modern glassmorphism effects
- Used by `.glass` utility classes
- Creates floating, translucent surfaces

#### Glow Colors (2 Properties)
```css
--glow-primary /* Brand color glow effect */
--glow-accent  /* Accent color glow effect */
```

**Purpose:**
- Decorative glow effects
- Used with `.glow` utility classes
- Adds premium feel

---

## File Structure

### Entry Point: `src/index.css`

```
src/index.css
├── @import "tailwindcss"              (Tailwind CSS framework)
├── @import "./styles/utilities-*.css" (Custom utilities)
│
├── @theme { ... }                     (Design Tokens - Fixed Scales)
│   ├── Primary Scale (50-950)
│   ├── Secondary Scale (50-950)
│   ├── Accent Scale (50-950)
│   ├── Success/Warning/Error/Info
│   └── Shadows, Transitions
│
├── :root { ... }                      (Ocean Light - Default Theme)
│   └── Semantic Variables
│
├── [data-theme="dark"] { ... }        (Ocean Deep Theme)
│   └── Semantic Variables
│
└── @import "./styles/themes/*.css"    (Additional Themes)
    ├── glass-light.css  → Forest (Dark)
    ├── glass-dark.css   → Cosmic (Dark)
    ├── slate.css        → Milky Mist (Light)
    └── midnight.css     → Midnight (Dark)
```

### Theme Files Location

```
src/styles/themes/
├── glass-light.css  → [data-theme="glass-light"]  (Forest Dark)
├── glass-dark.css   → [data-theme="glass-dark"]   (Cosmic Dark)
├── slate.css        → [data-theme="slate"]         (Milky Mist Light)
└── midnight.css     → [data-theme="midnight"]      (Midnight Dark)
```

**Each theme file defines:**
- All 30+ semantic CSS variables
- Specific color values for that theme
- Glass and glow effects

---

## Customization Methods

### Method 1: Quick Color Tweaks (2 Themes Only)

**Best for:** Simple brand color changes without adding new themes

**Edit:** `src/index.css` only

**Steps:**

1. **Change Default Light Theme (Ocean Light)**
   ```css
   /* Edit :root block in src/index.css (line ~110) */
   :root {
     /* Change brand color from blue to your brand */
     --color-brand: #your-color;        /* Your primary brand color */
     --color-brand-hover: #darker;      /* 10-15% darker */
     --color-brand-active: #darkest;    /* 20-30% darker */
     --color-brand-light: #lightest;    /* Very light tint */
     
     /* Optionally change accent */
     --color-accent: #your-accent;
     --color-accent-hover: #darker-accent;
   }
   ```

2. **Change Default Dark Theme (Ocean Deep)**
   ```css
   /* Edit [data-theme="dark"] block in src/index.css (line ~180) */
   [data-theme="dark"] {
     /* Change brand color (use lighter shade for dark bg) */
     --color-brand: #bright-color;      /* Bright version for dark bg */
     --color-brand-hover: #brighter;
   }
   ```

3. **Save and test** - Changes apply immediately

**Limitations:**
- Only affects Ocean Light and Ocean Deep
- Other 4 themes remain unchanged
- Can't add new themes

---

### Method 2: Customize All Themes

**Best for:** Consistent brand identity across all 6 themes

**Edit:** `src/index.css` + all theme files in `src/styles/themes/`

**Steps:**

1. **Choose your brand colors:**
   ```
   Brand Primary:   #3b82f6 → #YOUR-BRAND-COLOR
   Brand Accent:    #e11d48 → #YOUR-ACCENT-COLOR
   ```

2. **Edit each theme file:**

   **Ocean Light** (`src/index.css` `:root`)
   ```css
   --color-brand: #your-brand-color-600;        /* Main shade */
   --color-brand-hover: #your-brand-color-700;
   --color-accent: #your-accent-color-600;
   ```

   **Ocean Deep** (`src/index.css` `[data-theme="dark"]`)
   ```css
   --color-brand: #your-brand-color-400;        /* Brighter for dark */
   --color-brand-hover: #your-brand-color-500;
   --color-accent: #your-accent-color-400;
   ```

   **Forest** (`src/styles/themes/glass-light.css`)
   ```css
   --color-brand: #keep-green-or-change;        /* Theme-specific decision */
   --color-accent: #your-accent-color;
   ```

   **Cosmic** (`src/styles/themes/glass-dark.css`)
   ```css
   --color-brand: #keep-purple-or-change;       /* Theme-specific decision */
   --color-accent: #your-accent-color;
   ```

   **Milky Mist** (`src/styles/themes/slate.css`)
   ```css
   --color-brand: #your-brand-color-600;
   --color-accent: #your-accent-color;
   ```

   **Midnight** (`src/styles/themes/midnight.css`)
   ```css
   --color-brand: #your-brand-color-400;        /* Bright neon version */
   --color-accent: #your-accent-color-400;
   ```

3. **Test each theme** using the ThemeSelector component

---

### Method 3: Modify Design Tokens (Advanced)

**Best for:** Changing the base color palette across all themes

**Edit:** `src/index.css` `@theme` block (lines 20-100)

**Steps:**

1. **Update Primary Scale** (if changing brand from blue)
   ```css
   @theme {
     /* Replace blue oklch values with your brand color */
     --color-primary-50: oklch(...);   /* Calculate for your color */
     --color-primary-100: oklch(...);
     /* ... all shades 50-950 */
   }
   ```

2. **Recalculate semantic variables** in all themes
   - Each theme references these tokens
   - Update mappings to use new scale

**Tools for oklch:**
- https://oklch.com - Color picker with oklch values
- https://colorjs.io - Color conversion utilities

**⚠️ Warning:** Advanced - affects entire color system

---

## Creating Custom Themes

### Full Custom Theme

**Steps:**

#### 1. Create Theme File

Create `src/styles/themes/custom.css`:

```css
/* ========== YOUR THEME NAME ========== */
/* Description of your theme */
[data-theme="custom"] {
  /* ===== BACKGROUNDS (3 levels) ===== */
  --color-bg: #ffffff;               /* Main background */
  --color-bg-secondary: #f5f5f5;     /* Cards, panels */
  --color-bg-tertiary: #eeeeee;      /* Nested elements */
  --color-surface: #ffffff;          /* Dropdowns */
  --color-surface-hover: #f5f5f5;    /* Menu hover */

  /* ===== TEXT (3 levels) ===== */
  --color-text: #1a1a1a;             /* Primary text */
  --color-text-secondary: #4a4a4a;   /* Secondary text */
  --color-text-muted: #8a8a8a;       /* Muted text */

  /* ===== BORDERS (2 levels) ===== */
  --color-border: #e0e0e0;           /* Standard borders */
  --color-border-light: #f0f0f0;     /* Light borders */

  /* ===== BRAND (5 variants) ===== */
  --color-brand: #your-color;        /* Main brand */
  --color-brand-hover: #darker;      /* Hover */
  --color-brand-active: #darkest;    /* Active */
  --color-brand-light: #lightest;    /* Background */
  --color-brand-foreground: #fff;    /* Text on brand */

  /* ===== SECONDARY (4 variants) ===== */
  --color-secondary: #gray;
  --color-secondary-hover: #darker-gray;
  --color-secondary-light: #light-gray;
  --color-secondary-foreground: #white;

  /* ===== ACCENT (4 variants) ===== */
  --color-accent: #accent-color;
  --color-accent-hover: #darker-accent;
  --color-accent-light: #light-accent;
  --color-accent-foreground: #white;

  /* ===== STATUS COLORS (each with 3 variants) ===== */
  --color-success: #22c55e;
  --color-success-light: #f0fdf4;
  --color-success-foreground: #ffffff;
  
  --color-warning: #f59e0b;
  --color-warning-light: #fffbeb;
  --color-warning-foreground: #000000;
  
  --color-error: #ef4444;
  --color-error-light: #fef2f2;
  --color-error-foreground: #ffffff;
  
  --color-info: #0ea5e9;
  --color-info-light: #f0f9ff;
  --color-info-foreground: #ffffff;

  /* ===== GLASS EFFECT (4 properties) ===== */
  --glass-bg: rgba(255, 255, 255, 0.8);
  --glass-border: rgba(0, 0, 0, 0.1);
  --glass-shadow: 0 8px 32px 0 rgba(0, 0, 0, 0.1);
  --glass-blur: 12px;

  /* ===== GLOW EFFECTS (2 colors) ===== */
  --glow-primary: rgba(your-brand-rgb, 0.4);
  --glow-accent: rgba(accent-rgb, 0.4);
}
```

#### 2. Import Theme File

Add to `src/index.css` at bottom (after other theme imports):

```css
@import "./styles/themes/custom.css";
```

#### 3. Register Theme Type

Edit `src/types/theme.ts`:

```typescript
export type Theme = 
  | 'light'
  | 'dark'
  | 'glass-light'
  | 'glass-dark'
  | 'slate'
  | 'midnight'
  | 'custom'        // Add your theme
  | 'system';
```

#### 4. Add to Theme Selector

Edit `src/components/UI/ThemeSelector.tsx`:

```typescript
const themeOptions: SelectOption[] = [
  // ... existing themes
  { 
    value: 'custom', 
    label: 'Your Theme Name', 
    description: 'Your theme description',
    colorPalette: ['#bg', '#brand', '#accent', '#success']
  },
];
```

#### 5. Update isDarkMode Logic (if dark theme)

Edit `src/context/themeContext.tsx`:

```typescript
const isDarkMode = resolvedTheme === 'dark' 
  || resolvedTheme === 'glass-light' 
  || resolvedTheme === 'glass-dark' 
  || resolvedTheme === 'midnight'
  || resolvedTheme === 'custom';  // Add if dark theme
```

#### 6. Test Your Theme

```tsx
import { useTheme } from '@/context/themeContext';

const { setTheme } = useTheme();
setTheme('custom');
```

---

## Color Reference

### Quick Reference Chart

| Variable | Purpose | Light Theme Example | Dark Theme Example |
|----------|---------|--------------------|--------------------|
| `--color-bg` | Page background | `#ffffff` | `#0f172a` |
| `--color-text` | Primary text | `#0f172a` | `#f8fafc` |
| `--color-brand` | Main buttons, links | `#2563eb` | `#60a5fa` |
| `--color-accent` | Highlights, badges | `#e11d48` | `#fb7185` |
| `--color-success` | Success states | `#16a34a` | `#4ade80` |
| `--color-warning` | Warning states | `#d97706` | `#fbbf24` |
| `--color-error` | Error states | `#dc2626` | `#f87171` |
| `--color-border` | Borders | `#e2e8f0` | `rgba(148,163,184,0.25)` |

### Component Usage Examples

```tsx
/* Button variants automatically use theme variables */
<Button variant="primary">  {/* Uses --color-brand */}
<Button variant="accent">   {/* Uses --color-accent */}
<Button variant="success">  {/* Uses --color-success */}

/* Manual usage */
<div className="bg-(--color-bg) text-(--color-text) border-(--color-border)">
  Card with theme colors
</div>

/* Status colors */
<div className="bg-(--color-success-light) text-(--color-success)">
  Success message
</div>
```

---

## Best Practices

### ✅ Do

1. **Use semantic variables in components**
   ```tsx
   ✅ className="bg-(--color-bg-secondary)"
   ❌ className="bg-slate-100"
   ```

2. **Maintain contrast ratios**
   - Light themes: Dark text on light bg (7:1 ratio)
   - Dark themes: Light text on dark bg (7:1 ratio)

3. **Test all 6 themes** after changes

4. **Keep consistent patterns**
   - Light backgrounds get dark brand colors (600-700)
   - Dark backgrounds get bright brand colors (300-400)

5. **Use color scales properly**
   - 50-100: Backgrounds
   - 300-400: Bright accents, dark theme primary
   - 600-700: Light theme primary
   - 800-900: Backgrounds in dark themes

### ❌ Don't

1. **Don't hardcode colors**
   ```tsx
   ❌ className="bg-blue-500"
   ✅ className="bg-(--color-brand)"
   ```

2. **Don't skip foreground colors**
   - Always set `*-foreground` for text on colored backgrounds

3. **Don't forget status colors**
   - Use semantic colors for feedback (success/warning/error/info)

4. **Don't break accessibility**
   - Maintain WCAG AA minimum (4.5:1)
   - Aim for WCAG AAA (7:1)

---

## Troubleshooting

### Theme not applying?

1. Check `data-theme` attribute on `<html>`:
   ```html
   <html data-theme="custom">
   ```

2. Verify import in `src/index.css`:
   ```css
   @import "./styles/themes/custom.css";
   ```

3. Clear browser cache and rebuild:
   ```bash
   pnpm dev
   ```

### Colors not updating?

1. Check CSS variable syntax:
   ```css
   ✅ --color-bg: #ffffff;
   ❌ --color-bg = #ffffff;
   ```

2. Ensure all required variables defined (30+ per theme)

3. Use browser DevTools to inspect computed styles

### Theme selector not showing new theme?

1. Add to `src/types/theme.ts`
2. Add to `ThemeSelector.tsx` options
3. Update `isDarkMode` logic if needed

---

## Summary

### Theme System Structure

```
Design Tokens (@theme)          →  Fixed color scales
       ↓
Semantic Variables (:root)      →  Theme-specific mappings
       ↓
Components (className)          →  Use semantic variables
```

### Key Files

- **Entry Point**: `src/index.css` (Design tokens + default themes)
- **Additional Themes**: `src/styles/themes/*.css`
- **Types**: `src/types/theme.ts`
- **Selector**: `src/components/UI/ThemeSelector.tsx`
- **Context**: `src/context/themeContext.tsx`

### Customization Paths

1. **Quick (2 themes)**: Edit `src/index.css` `:root` and `[data-theme="dark"]`
2. **All themes**: Edit all 6 theme files
3. **New theme**: Create new theme file + register in types + add to selector

---

**Need Help?** Check existing theme files for reference patterns!
