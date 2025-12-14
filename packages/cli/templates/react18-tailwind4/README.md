# React 18 + Tailwind 4 Template

> **Production-ready React template with Tailwind CSS 4.0, comprehensive UI components, and flexible layout system.**

[![React](https://img.shields.io/badge/React-18.3-blue.svg)](https://reactjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.6-blue.svg)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-4.0-38bdf8.svg)](https://tailwindcss.com/)
[![Vite](https://img.shields.io/badge/Vite-6.0-646cff.svg)](https://vitejs.dev/)

---

## 🚀 Quick Start

```bash
# Install dependencies
pnpm install

# Start development server
pnpm dev

# Build for production
pnpm build
```

Visit `http://localhost:5173` to see your app! 🎉

---

## 📚 Documentation

Complete documentation is available in the `/docs` folder:

### **Getting Started**
- **[📖 Main Documentation](./docs/README.md)** - Start here!
- **[📦 Installation Guide](./docs/INSTALLATION.md)** - Setup and configuration
- **[⚡ Quick Start](./docs/QUICK_START.md)** - Build your first feature in 5 minutes

### **Component Reference**
- **[🎨 Component Guide](./docs/COMPONENTS.md)** - All components with props and examples
- **[📐 Layout Guide](./docs/LAYOUT.md)** - Navigation, breadcrumbs, themes
- **[💡 Examples](./docs/EXAMPLES.md)** - Real-world component combinations

---

## ✨ Features

### **20+ UI Components**
- **Buttons** - 10 variants (primary, secondary, outline, ghost, danger, success, warning, glass, link, gradient, gradient-border)
- **Inputs** - Text, email, password, textarea with validation, icons, character count
- **Cards** - 7 variants with compound components (Header, Title, Description, Content, Footer)
- **Dialogs** - Modal with 5 positions (center, top, bottom, left, right) and animations
- **Dropdowns** - Rich selects with icons, colors, descriptions, and search
- **Combobox** - Searchable select with keyword filtering
- **Feedback** - Toast, Spinner, Skeleton, Progress (linear & circular)
- **Navigation** - Context menu, breadcrumbs, multi-level nav

### **Flexible Layout System**
- **3 Layout Variants** - Sidebar-left, sidebar-right, top-only
- **Responsive** - Desktop sidebar + mobile drawer
- **Collapsible** - Toggle sidebar visibility
- **Nested Navigation** - Multi-level menu support
- **Auto Breadcrumbs** - Generated from routes

### **6 Beautiful Themes**
- Light, Dark, Glass Light, Glass Dark, Midnight, Slate
- Instant theme switching
- System preference support
- CSS variable-based

### **Developer Experience**
- **TypeScript** - Full type safety with IntelliSense
- **CVA Pattern** - Variant management for components
- **Compound Components** - Flexible composition patterns
- **Accessible** - ARIA labels and keyboard navigation
- **Mobile First** - Responsive on all devices

---

## 🎯 What's Included

```
src/
├── components/         # UI Components
│   ├── UI/            # Reusable components
│   │   ├── Buttons/   # Button with 10 variants
│   │   ├── Feedback/  # Toast, Spinner, Skeleton, Progress
│   │   └── radix/     # Dialog, Dropdown, Combobox, ContextMenu
│   └── features/      # Feature-specific components
├── layout/            # Layout system
│   ├── AppLayout/     # Layout provider
│   ├── SideNav/       # Sidebar navigation
│   ├── TopNav/        # Top navigation
│   └── Breadcrumbs/   # Auto breadcrumbs
├── pages/             # Route pages
│   ├── Home.tsx
│   ├── ComponentsDemo.tsx
│   └── FeedbackDemo.tsx
├── context/           # React context
│   └── themeContext.tsx
├── hooks/             # Custom hooks
├── types/             # TypeScript types
├── utils/             # Utility functions
└── styles/            # Global styles + themes
```

---

## 🛠️ Tech Stack

- **React 18.3** - Latest React with concurrent features
- **TypeScript 5.6** - Full type safety
- **Tailwind CSS 4.0** - Latest Tailwind with new features
- **Vite 6.0** - Lightning-fast build tool
- **Radix UI** - Accessible component primitives
- **CVA** - Class Variance Authority for variants
- **Sonner** - Toast notification system
- **Lucide Icons** - Beautiful icon library

---

## 📖 Usage Examples

### Basic Component Usage

```tsx
import { Button } from '@/components/UI/Buttons';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/UI/Card';
import { Input } from '@/components/UI/Input';
import { toast } from '@/components/UI/Feedback';

function MyPage() {
  const handleSubmit = () => {
    toast.success('Form submitted!');
  };

  return (
    <Card variant="elevated">
      <CardHeader>
        <CardTitle>Contact Form</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <Input label="Email" type="email" required />
          <Input label="Message" multiline rows={4} />
          <Button onClick={handleSubmit} fullWidth>
            Send Message
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
```

### Theme Switching

```tsx
import { useTheme } from '@/context/themeContext';
import { ThemeSelector } from '@/components/UI/ThemeSelector';

function MyComponent() {
  const { theme, setTheme } = useTheme();

  return (
    <>
      <ThemeSelector />  {/* Dropdown with all themes */}
      
      {/* Or manual switching */}
      <button onClick={() => setTheme('dark')}>Dark Mode</button>
      <button onClick={() => setTheme('midnight')}>Midnight</button>
    </>
  );
}
```

### Layout Configuration

```tsx
import { AppLayoutProvider } from '@/layout/AppLayout';
import { AppLayout } from '@/layout/AppLayout';

function App() {
  return (
    <AppLayoutProvider
      variant="sidebar-left"
      title="My App"
      user={{
        name: "John Doe",
        email: "john@example.com"
      }}
    >
      <AppLayout>
        <Routes>{/* Your routes */}</Routes>
      </AppLayout>
    </AppLayoutProvider>
  );
}
```

---

## 🎨 Component Highlights

### Buttons (10 Variants)
```tsx
<Button variant="primary">Primary</Button>
<Button variant="secondary" size="lg">Large</Button>
<Button icon={<Save />} isLoading>Saving...</Button>
<Button variant="gradient" fullWidth>Gradient</Button>
```

### Inputs with Validation
```tsx
<Input 
  label="Email" 
  type="email" 
  leftIcon={<Mail />}
  error="Invalid email format"
  required 
/>
<Input 
  label="Bio" 
  multiline 
  rows={4}
  maxLength={200}
  showCharCount
/>
```

### Cards with Compound Components
```tsx
<Card variant="glass" hoverable>
  <CardHeader>
    <CardTitle>Title</CardTitle>
    <CardDescription>Description</CardDescription>
  </CardHeader>
  <CardContent>Content here</CardContent>
  <CardFooter>
    <Button>Action</Button>
  </CardFooter>
</Card>
```

### Toast Notifications
```tsx
toast.success('Saved successfully!');
toast.error('Failed to save');
toast.promise(apiCall(), {
  loading: 'Saving...',
  success: 'Saved!',
  error: 'Failed'
});
```

### Loading States
```tsx
<Spinner size="lg" label="Loading..." />
<Skeleton animation="wave" width={300} height={200} />
<Progress value={75} variant="success" showLabel />
<CircularProgress value={60} showLabel />
```

---

## 📦 Installation

### Via CLI (Recommended)
```bash
npx create-react-tailwind-app my-app
cd my-app
pnpm install
pnpm dev
```

### Manual Clone
```bash
git clone <repository-url>
cd packages/templates/react18-tailwind4
pnpm install
pnpm dev
```

See [Installation Guide](./docs/INSTALLATION.md) for detailed setup instructions.

---

## 🎯 Next Steps

1. **Learn the basics** → Read [Quick Start](./docs/QUICK_START.md)
2. **Explore components** → Check [Component Guide](./docs/COMPONENTS.md)
3. **Customize layout** → See [Layout Guide](./docs/LAYOUT.md)
4. **View examples** → Browse [Examples](./docs/EXAMPLES.md)

---

## 📝 Scripts

```bash
pnpm dev          # Start development server
pnpm build        # Build for production
pnpm preview      # Preview production build
pnpm type-check   # Run TypeScript checks
pnpm lint         # Run ESLint
```

---

## 🌈 Available Themes

| Theme | Description |
|-------|-------------|
| **Light** | Clean white background, professional |
| **Dark** | Dark mode with blue accent |
| **Glass Light** | Glassmorphism light variant |
| **Glass Dark** | Glassmorphism dark variant |
| **Midnight** | Deep blue-black, developer-friendly |
| **Slate** | Neutral gray, enterprise feel |

---

## 📄 License

MIT - Free for personal and commercial use.

---

## 🙏 Acknowledgments

Built with:
- [React](https://react.dev)
- [Tailwind CSS](https://tailwindcss.com)
- [Radix UI](https://radix-ui.com)
- [Lucide Icons](https://lucide.dev)
- [Sonner](https://sonner.emilkowal.ski)

---

**Ready to start building? Check out the [documentation](./docs/README.md)!** 🚀
   └── Removes unused exports

4. Final bundle
   └── Only contains actually used code

import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

// Named export is preferred for utilities (better tree-shaking)
export const cn = (...inputs: ClassValue[]) => {
  return twMerge(clsx(inputs));
};

// cn = className (common convention in React/Tailwind projects)
// Used by: shadcn/ui, Radix UI, and many others

// Default export - always imported
import cn from './utilCN';  // cn is always bundled

// Named export - can be tree-shaken if unused
import { cn } from './utilCN';  // Only bundled if actually used

_________________
y giving alias in both tsconfig(compile time) as well as vite (build time)is required
"paths": {
  "@config/*": [
    "src/config/local/*",    // Priority 1: Local overrides
    "src/config/default/*"   // Priority 2: Default configs
  ]
}"paths": {
  "@shared/*": [
    "../../packages/shared/src/*",  // Shared package
    "src/shared/*"                   // Local fallback
  ]
}


Why gradients don't work: Native <option> elements are rendered by the operating system (not the browser), so they only support basic CSS properties like background-color and color. Gradients, borders, padding variations, and complex styling are not supported by the OS-level dropdown rendering.

src/components/Layout/
├── AppLayout/
│   ├── AppLayout.tsx           ← Main wrapper (orchestrator)
│   ├── AppLayoutProvider.tsx   ← Context for layout state
│   └── useLayout.ts            ← Custom hook
├── TopNav/
│   ├── TopNavBar.tsx           ← All top nav logic (logo, menu, user)
│   └── TopNavUser.tsx          ← User dropdown (extracted for clarity)
├── SideNav/
│   ├── SideNavBar.tsx          ← Single sidebar (handles open/closed/mini)
│   ├── SideNavItem.tsx         ← Nav item with children support
│   └── SideNavMobile.tsx       ← Mobile drawer (uses SideNavBar internally)
├── Breadcrumbs/
│   └── Breadcrumbs.tsx         ← Separate component
└── types.ts                    ← Shared TypeScript types