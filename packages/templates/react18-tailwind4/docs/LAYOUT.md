# Layout Guide

Complete guide to the layout system, navigation, breadcrumbs, and themes.

---

## 📋 Table of Contents

- [AppLayout System](#applayout-system)
- [Navigation Setup](#navigation-setup)
- [Breadcrumbs](#breadcrumbs)
- [Theme System](#theme-system)
- [Responsive Behavior](#responsive-behavior)

---

## AppLayout System

The template includes a flexible layout system with 3 variants.

### Import
```tsx
import { AppLayoutProvider } from '@/layout/AppLayout';
import { AppLayout } from '@/layout/AppLayout';
```

### Layout Variants

1. **`sidebar-hidden`** - by default hidden Side nav on click or menu toggles.
2. **`sidebar-persistent`** - Sidebar on right, content on left. 
3. **`top-only`** - Top navigation bar only (no sidebar) with nav items at center.

### Basic Setup

```tsx
// src/App.tsx
import { AppLayoutProvider } from '@/layout/AppLayout';
import { AppLayout } from '@/layout/AppLayout';

function App() {
  return (
    <AppLayoutProvider
      variant="sidebar-left"
      title="My App"
      user={{
        name: "John Doe",
        email: "john@example.com",
        avatar: "/avatar.jpg"
      }}
    >
      <AppLayout>
        <Routes>
          {/* Your routes */}
        </Routes>
      </AppLayout>
    </AppLayoutProvider>
  );
}
```

### AppLayoutProvider Props

| Prop | Type | Default | Required | Description |
|------|------|---------|----------|-------------|
| `variant` | `'sidebar-left' \| 'sidebar-right' \| 'top-only'` | - | ✅ | Layout type |
| `title` | `string` | - | ❌ | App title in sidebar/topnav |
| `logo` | `ReactNode` | - | ❌ | Custom logo component |
| `sidebarDefaultOpen` | `boolean` | `true` | ❌ | Initial sidebar state |
| `sidebarCollapsible` | `boolean` | `true` | ❌ | Can sidebar collapse? |
| `sidebarBehavior` | `'push' \| 'overlay'` | `'push'` | ❌ | Sidebar behavior |
| `nestedNavStyle` | `'accordion' \| 'expandable' \| 'hybrid'` | `'hybrid'` | ❌ | Multi-level nav style |
| `user` | `UserConfig` | - | ❌ | User info for menu |
| `onLogout` | `() => void` | - | ❌ | Logout callback |
| `children` | `ReactNode` | - | ✅ | App content |

**UserConfig Type:**
```tsx
interface UserConfig {
  name: string;
  email: string;
  avatar?: string;
  role?: string;
}
```

### Examples

#### Sidebar Left (Default)
```tsx
<AppLayoutProvider
  variant="sidebar-left"
  title="Dashboard"
  sidebarDefaultOpen={true}
  user={{
    name: "John Doe",
    email: "john@example.com"
  }}
>
  <AppLayout>
    <Routes>...</Routes>
  </AppLayout>
</AppLayoutProvider>
```

#### Top Navigation Only
```tsx
<AppLayoutProvider
  variant="top-only"
  title="Website"
>
  <AppLayout>
    <Routes>...</Routes>
  </AppLayout>
</AppLayoutProvider>
```

#### With Custom Logo
```tsx
import Logo from './assets/logo.svg';

<AppLayoutProvider
  variant="sidebar-left"
  logo={<img src={Logo} alt="Logo" className="h-8" />}
  title="My Company"
>
  <AppLayout>
    <Routes>...</Routes>
  </AppLayout>
</AppLayoutProvider>
```

#### With Logout Handler
```tsx
const handleLogout = () => {
  localStorage.removeItem('token');
  navigate('/login');
};

<AppLayoutProvider
  variant="sidebar-left"
  user={{
    name: "Jane Smith",
    email: "jane@example.com",
    avatar: "/avatars/jane.jpg",
    role: "Admin"
  }}
  onLogout={handleLogout}
>
  <AppLayout>
    <Routes>...</Routes>
  </AppLayout>
</AppLayoutProvider>
```

---

## Navigation Setup

Navigation is configured in `src/layout/navigation.tsx`.

### NavItem Type

```tsx
interface NavItem {
  id: string;              // Unique identifier
  label: string;           // Display text
  icon: ReactNode;         // Icon component
  path: string;            // Route path
  badge?: string | number; // Optional badge
  children?: NavItem[];    // Sub-items (nested nav)
}
```

### Basic Navigation

```tsx
// src/layout/navigation.tsx
import { Home, User, Settings, FileText } from 'lucide-react';
import type { NavItem } from '@/types/layout';

export const navItems: NavItem[] = [
  { 
    id: 'home', 
    label: 'Home', 
    icon: <Home className="w-5 h-5" />, 
    path: '/' 
  },
  { 
    id: 'profile', 
    label: 'Profile', 
    icon: <User className="w-5 h-5" />, 
    path: '/profile' 
  },
  { 
    id: 'settings', 
    label: 'Settings', 
    icon: <Settings className="w-5 h-5" />, 
    path: '/settings' 
  },
];
```

### With Badges

```tsx
export const navItems: NavItem[] = [
  { 
    id: 'notifications', 
    label: 'Notifications', 
    icon: <Bell className="w-5 h-5" />, 
    path: '/notifications',
    badge: 5  // Shows "5" badge
  },
  { 
    id: 'messages', 
    label: 'Messages', 
    icon: <Mail className="w-5 h-5" />, 
    path: '/messages',
    badge: 'New'  // Shows "New" badge
  },
];
```

### Multi-Level Navigation

```tsx
export const navItems: NavItem[] = [
  {
    id: 'projects',
    label: 'Projects',
    icon: <Folder className="w-5 h-5" />,
    path: '/projects',
    children: [
      { 
        id: 'active', 
        label: 'Active Projects', 
        icon: <FolderOpen className="w-4 h-4" />, 
        path: '/projects/active' 
      },
      { 
        id: 'archived', 
        label: 'Archived', 
        icon: <Archive className="w-4 h-4" />, 
        path: '/projects/archived' 
      },
      {
        id: 'templates',
        label: 'Templates',
        icon: <Layout className="w-4 h-4" />,
        path: '/projects/templates',
        children: [
          { 
            id: 'react', 
            label: 'React Templates', 
            icon: <Code className="w-4 h-4" />, 
            path: '/projects/templates/react' 
          },
          { 
            id: 'vue', 
            label: 'Vue Templates', 
            icon: <Code className="w-4 h-4" />, 
            path: '/projects/templates/vue' 
          },
        ]
      },
    ]
  },
];
```

### User Menu Items

User context menu appears when clicking user avatar:

```tsx
// src/layout/navigation.tsx
import type { MenuItem } from '@/types/layout';

export const userMenuItems: MenuItem[] = [
  { 
    id: 'profile', 
    label: 'Profile', 
    icon: <User className="w-4 h-4" />, 
    path: '/profile' 
  },
  { 
    id: 'settings', 
    label: 'Settings', 
    icon: <Settings className="w-4 h-4" />, 
    path: '/settings' 
  },
  { 
    id: 'notifications', 
    label: 'Notifications', 
    icon: <Bell className="w-4 h-4" />, 
    path: '/notifications',
    badge: 3
  },
  { id: 'separator-1', type: 'separator', label: '' },
  { 
    id: 'help', 
    label: 'Help & Support', 
    icon: <HelpCircle className="w-4 h-4" />, 
    path: '/help' 
  },
  // Logout is added automatically by AppLayoutProvider
];
```

---

## Breadcrumbs

Breadcrumbs are auto-generated from the current route.

### How It Works

```tsx
// Route: /projects/templates/react
// Breadcrumbs: Home > Projects > Templates > React

// Route: /settings/profile
// Breadcrumbs: Home > Settings > Profile
```

### Custom Breadcrumb Labels

Override auto-generated labels:

```tsx
// src/layout/Breadcrumbs/Breadcrumbs.tsx

const customLabels: Record<string, string> = {
  '/': 'Home',
  '/projects': 'Projects',
  '/projects/templates': 'Templates',
  '/projects/templates/react': 'React Templates',
  '/settings': 'Settings',
  '/settings/profile': 'Profile Settings',
};
```

### Styling

Breadcrumbs automatically match your theme:
- Light theme: Gray text with hover
- Dark theme: Light gray text with hover
- Uses theme CSS variables

---

## Theme System

6 built-in themes with instant switching.

### Available Themes

| Theme | Description |
|-------|-------------|
| `light` | Clean white background, professional |
| `dark` | Dark mode with blue accent |
| `glass-light` | Glassmorphism light variant |
| `glass-dark` | Glassmorphism dark variant |
| `midnight` | Deep blue-black, developer-friendly |
| `slate` | Neutral gray, enterprise feel |

### Theme Hook

```tsx
import { useTheme } from '@/context/themeContext';

function MyComponent() {
  const { theme, setTheme, isDarkMode, resolvedTheme } = useTheme();
  
  return (
    <div>
      <p>Current theme: {theme}</p>
      <p>Is dark mode: {isDarkMode ? 'Yes' : 'No'}</p>
      <p>Resolved theme: {resolvedTheme}</p>
      
      <button onClick={() => setTheme('dark')}>
        Dark Mode
      </button>
      <button onClick={() => setTheme('light')}>
        Light Mode
      </button>
    </div>
  );
}
```

### ThemeSelector Component

Pre-built theme switcher:

```tsx
import { ThemeSelector } from '@/components/UI/ThemeSelector';

// Shows all 6 themes in a dropdown
<ThemeSelector />
```

### Manual Theme Switching

```tsx
const { setTheme } = useTheme();

// Switch to specific theme
setTheme('dark');
setTheme('midnight');
setTheme('glass-light');

// Use system preference
setTheme('system'); // Follows OS dark/light mode
```

### Theme CSS Variables

All themes use CSS variables for consistency:

```css
/* Available in all components */
--color-bg              /* Main background */
--color-bg-secondary    /* Secondary background */
--color-bg-tertiary     /* Tertiary background */
--color-text            /* Primary text */
--color-text-secondary  /* Secondary text */
--color-text-muted      /* Muted text */
--color-border          /* Border color */
--color-brand           /* Brand/primary color */
--color-brand-hover     /* Brand hover state */
--color-success         /* Success color */
--color-warning         /* Warning color */
--color-error           /* Error color */
```

### Using Theme Variables

```tsx
// In Tailwind classes
<div className="bg-(--color-bg) text-(--color-text) border-(--color-border)">
  Content
</div>

// In inline styles
<div style={{ 
  backgroundColor: 'var(--color-bg)',
  color: 'var(--color-text)'
}}>
  Content
</div>
```

### Adding Custom Theme

1. Create theme CSS file:

```css
/* src/styles/themes/custom.css */
[data-theme="custom"] {
  --color-bg: #ffffff;
  --color-bg-secondary: #f5f5f5;
  --color-text: #1a1a1a;
  --color-brand: #ff6b6b;
  /* ... more variables */
}
```

2. Import in `index.css`:

```css
@import "./styles/themes/custom.css";
```

3. Add to theme type:

```tsx
// src/types/theme.ts
export type Theme = 
  | 'light' 
  | 'dark' 
  | 'glass-light' 
  | 'glass-dark' 
  | 'midnight' 
  | 'slate'
  | 'custom';  // Add this
```

4. Add to ThemeSelector:

```tsx
// src/components/UI/ThemeSelector.tsx
const themes = [
  // ... existing themes
  { value: 'custom', label: 'Custom Theme', icon: <Palette /> },
];
```

---

## Responsive Behavior

### Breakpoints

- **Mobile:** < 1024px (lg breakpoint)
- **Desktop:** ≥ 1024px

### Mobile Behavior

On mobile (< 1024px):
- Sidebar becomes a slide-in drawer
- Hamburger menu appears in top navigation
- Drawer overlays content (doesn't push)
- Closes automatically after navigation

### Desktop Behavior

On desktop (≥ 1024px):
- Sidebar visible by default (if `sidebarDefaultOpen={true}`)
- Can toggle sidebar open/closed
- Sidebar behavior follows `sidebarBehavior` prop:
  - `push`: Pushes content (default)
  - `overlay`: Overlays content

### Sidebar States

#### Collapsible Sidebar (Desktop)

```tsx
<AppLayoutProvider
  variant="sidebar-left"
  sidebarCollapsible={true}
  sidebarBehavior="push"
>
  {/* Sidebar can be toggled open/closed */}
</AppLayoutProvider>
```

#### Fixed Sidebar (Desktop)

```tsx
<AppLayoutProvider
  variant="sidebar-left"
  sidebarCollapsible={false}
>
  {/* Sidebar always visible, no toggle */}
</AppLayoutProvider>
```

#### Overlay Sidebar

```tsx
<AppLayoutProvider
  variant="sidebar-left"
  sidebarBehavior="overlay"
>
  {/* Sidebar overlays content instead of pushing it */}
</AppLayoutProvider>
```

### Mobile Menu Control

Programmatically control mobile menu:

```tsx
import { useAppLayout } from '@/layout/AppLayout';

function MyComponent() {
  const { mobileMenuOpen, toggleMobileMenu, setMobileMenuOpen } = useAppLayout();
  
  return (
    <button onClick={toggleMobileMenu}>
      Toggle Menu
    </button>
  );
}
```

---

## Complete Example

Putting it all together:

```tsx
// src/App.tsx
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AppLayoutProvider } from '@/layout/AppLayout';
import { AppLayout } from '@/layout/AppLayout';
import { ThemeProvider } from '@/context/themeContext';
import { Toaster } from '@/components/UI/Feedback';

// Pages
import Home from './pages/Home';
import Projects from './pages/Projects';
import Settings from './pages/Settings';
import NotFound from './pages/NotFound';

function App() {
  const handleLogout = () => {
    localStorage.removeItem('token');
    window.location.href = '/login';
  };

  return (
    <BrowserRouter>
      <ThemeProvider initialTheme="system">
        <AppLayoutProvider
          variant="sidebar-left"
          title="My App"
          sidebarDefaultOpen={true}
          sidebarCollapsible={true}
          sidebarBehavior="push"
          nestedNavStyle="hybrid"
          user={{
            name: "John Doe",
            email: "john@example.com",
            avatar: "/avatars/john.jpg",
            role: "Admin"
          }}
          onLogout={handleLogout}
        >
          <AppLayout>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/projects/*" element={<Projects />} />
              <Route path="/settings/*" element={<Settings />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </AppLayout>
        </AppLayoutProvider>
        <Toaster position="top-right" />
      </ThemeProvider>
    </BrowserRouter>
  );
}

export default App;
```

```tsx
// src/layout/navigation.tsx
import { Home, Folder, Settings, Bell } from 'lucide-react';

export const navItems = [
  { 
    id: 'home', 
    label: 'Home', 
    icon: <Home className="w-5 h-5" />, 
    path: '/' 
  },
  {
    id: 'projects',
    label: 'Projects',
    icon: <Folder className="w-5 h-5" />,
    path: '/projects',
    badge: 12,
    children: [
      { 
        id: 'active', 
        label: 'Active', 
        icon: <Folder className="w-4 h-4" />, 
        path: '/projects/active' 
      },
      { 
        id: 'archived', 
        label: 'Archived', 
        icon: <Folder className="w-4 h-4" />, 
        path: '/projects/archived' 
      },
    ]
  },
  { 
    id: 'settings', 
    label: 'Settings', 
    icon: <Settings className="w-5 h-5" />, 
    path: '/settings' 
  },
];

export const userMenuItems = [
  { id: 'profile', label: 'Profile', icon: <User />, path: '/profile' },
  { id: 'settings', label: 'Settings', icon: <Settings />, path: '/settings' },
  { id: 'sep', type: 'separator', label: '' },
  { id: 'help', label: 'Help', icon: <HelpCircle />, path: '/help' },
];
```

---

## 🔗 Related Documentation

- [Component Guide](./COMPONENTS.md) - All UI components
- [Theme Guide](./THEMES.md) - Detailed theming
- [Examples](./EXAMPLES.md) - Layout patterns
- [Installation](./INSTALLATION.md) - Setup guide

---

**Need help?** Check the [Examples](./EXAMPLES.md) for common layout patterns!
