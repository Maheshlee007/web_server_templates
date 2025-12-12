# React 18 + Tailwind 4 Template Documentation

> **Modern React Template with Tailwind CSS 4.0, Radix UI, and Comprehensive Component Library**

Welcome to the complete documentation for the React 18 + Tailwind 4 template. This template is designed to help you build beautiful, accessible, and performant web applications quickly.

---

## 📚 Documentation Structure

This documentation is divided into multiple focused guides:

### **For Users (Getting Started)**
- **[Installation Guide](./INSTALLATION.md)** - Setup, CLI installation, and project initialization
- **[Quick Start](./QUICK_START.md)** - Build your first page in 5 minutes
- **[Component Guide](./COMPONENTS.md)** - Complete component reference with all props
- **[Layout Guide](./LAYOUT.md)** - Navigation, breadcrumbs, and layout variants
- **[Theme Customization](./THEME_CUSTOMIZATION.md)** - Complete theme system and color customization guide

### **For Developers (Advanced)**
- **[Component Examples](./EXAMPLES.md)** - Real-world component combinations
- **[Architecture](./ARCHITECTURE.md)** - Project structure and design patterns
- **[Best Practices](./BEST_PRACTICES.md)** - Code style and conventions
- **[API Reference](./API_REFERENCE.md)** - Complete prop tables and TypeScript types

---

## 🚀 Quick Overview

### What's Included?

#### **UI Components** (20+)
- **Buttons** - 10 variants with loading states, icons, sizes
- **Inputs** - Text, password, textarea with validation
- **Cards** - 7 variants including glass effects
- **Dialogs** - Modals with positions and animations
- **Dropdowns & Comboboxes** - Rich selects with search, icons, colors
- **Feedback** - Toast, alerts, spinners, skeletons, progress bars
- **And more...**

#### **Layout System**
- **3 Layout Variants** - Top-only, sidebar-left, sidebar-right
- **Responsive Navigation** - Desktop sidebar + mobile drawer
- **Breadcrumbs** - Auto-generated from routes
- **Theme Switcher** - 6 beautiful themes

#### **Theme System**
- **6 Distinct Professional Themes** - Ocean Light, Ocean Deep, Forest, Cosmic, Milky Mist, Midnight
- **Equal Light/Dark Balance** - 2 light themes + 4 dark themes
- **Unique Color Palettes** - Each theme has completely different character
- **OLED Support** - True black theme for OLED displays
- **Full TypeScript** - Type-safe props and IntelliSense
- **Accessible** - ARIA labels, keyboard navigation
- **Mobile First** - Responsive on all devices

---

## 📦 Installation (Quick)

### Via CLI (Recommended)
```bash
npm create web-server-templates 
          or
npx create-web-server-templates 
choose react18+taliwind4
cd my-app
pnpm install
pnpm dev
```

### Manual Installation
```bash
git clone <repository-url>
cd packages/templates/react18-tailwind4
pnpm install
pnpm dev
```

Visit `http://localhost:5173` to see your app!

---

## 🎯 Quick Start Example

### 1. Create a Page with Components

```tsx
import { Button } from '@/components/UI/Buttons';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/UI/Card';
import { Input } from '@/components/UI/Input';
import { toast } from '@/components/UI/Feedback';

export default function MyPage() {
  const handleSubmit = () => {
    toast.success('Form submitted!');
  };

  return (
    <div className="max-w-2xl mx-auto p-6">
      <Card variant="elevated">
        <CardHeader>
          <CardTitle>Contact Form</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <Input 
              label="Email" 
              type="email" 
              placeholder="you@example.com"
              required 
            />
            <Input 
              label="Message" 
              multiline 
              rows={4} 
              placeholder="Your message..."
            />
            <Button onClick={handleSubmit} size="lg" fullWidth>
              Send Message
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
```

### 2. Add to Navigation

```tsx
// src/layout/navigation.tsx
export const navItems: NavItem[] = [
  { id: 'home', label: 'Home', icon: <Home />, path: '/' },
  { id: 'contact', label: 'Contact', icon: <Mail />, path: '/contact' }, // ← Add this
];
```

### 3. Add Route

```tsx
// src/App.tsx
import MyPage from './pages/MyPage';

<Route path="/contact" element={<MyPage />} />
```

That's it! Your page is live with navigation, breadcrumbs, and theme support. ✅

---

## 🔥 Key Features

### **1. CVA-Based Components**
Every component uses `class-variance-authority` for variant management:

```tsx
<Button variant="primary" size="lg" isLoading>Save</Button>
<Button variant="outline" size="sm">Cancel</Button>
<Button variant="ghost" icon={<Save />}>Save Draft</Button>
```

### **2. Compound Components**
Build complex UIs with sub-components:

```tsx
<Card variant="glass">
  <CardHeader>
    <CardTitle>Title</CardTitle>
    <CardDescription>Description</CardDescription>
  </CardHeader>
  <CardContent>Content</CardContent>
  <CardFooter>
    <Button>Action</Button>
  </CardFooter>
</Card>
```

### **3. Theme System**
Switch themes instantly:

```tsx
import { useTheme } from '@/context/themeContext';

const { theme, setTheme } = useTheme();
setTheme('midnight'); // Changes entire app theme
```

### **4. Feedback System**
Toast notifications made easy:

```tsx
toast.success('Saved!');
toast.error('Failed to save');
toast.promise(apiCall(), {
  loading: 'Saving...',
  success: 'Saved!',
  error: 'Failed'
});
```

---

## 📖 Documentation Guide

### **Start Here** (Recommended Order)
1. [Installation Guide](./INSTALLATION.md) - Get the template running
2. [Quick Start](./QUICK_START.md) - Build your first feature
3. [Component Guide](./COMPONENTS.md) - Learn all components
4. [Layout Guide](./LAYOUT.md) - Customize navigation
5. [Theme Guide](./THEMES.md) - Theme customization

### **Deep Dive**
- [Component Examples](./EXAMPLES.md) - 20+ real-world patterns
- [Architecture](./ARCHITECTURE.md) - Understand the structure
- [API Reference](./API_REFERENCE.md) - Complete prop reference

---

## 🛠️ Tech Stack

- **React 18.3** - Latest React with concurrent features
- **TypeScript 5.6** - Full type safety
- **Tailwind CSS 4.0** - Latest Tailwind with new features
- **Vite 6.0** - Lightning-fast build tool
- **Radix UI** - Accessible component primitives
- **CVA** - Variant management
- **Sonner** - Toast notifications
- **Lucide Icons** - Beautiful icon library

---

## 📁 Project Structure

```
src/
├── components/         # UI Components
│   ├── UI/            # Reusable UI components
│   │   ├── Buttons/   # Button component
│   │   ├── Feedback/  # Toast, Spinner, Skeleton, Progress
│   │   └── radix/     # Dialog, Dropdown, Combobox, ContextMenu
│   └── features/      # Feature-specific components
├── layout/            # Layout components
│   ├── AppLayout/     # Layout provider and wrapper
│   ├── SideNav/       # Sidebar navigation
│   ├── TopNav/        # Top navigation
│   └── Breadcrumbs/   # Auto breadcrumbs
├── pages/             # Route pages
├── context/           # React context (theme)
├── hooks/             # Custom hooks
├── types/             # TypeScript types
├── utils/             # Utility functions
└── styles/            # Global styles and themes
```

---

## 🎨 Component Categories

### **Form Components**
- Button (10 variants)
- Input (text, email, password, textarea)
- Dropdown (with icons, colors, descriptions)
- Combobox (searchable select)

### **Layout Components**
- Card (7 variants)
- Dialog (modal with animations)
- Drawer (slide-out panel)
- AppLayout (3 layout variants)

### **Feedback Components**
- Toast (success, error, warning, info)
- Spinner (5 sizes, 4 variants)
- Skeleton (3 variants, 2 animations)
- Progress (linear & circular)

### **Navigation Components**
- SideNav (collapsible sidebar)
- TopNav (horizontal navigation)
- Breadcrumbs (auto-generated)
- Context Menu (right-click menu)

---

## 🌈 Theme Preview

| Theme | Description | Use Case |
|-------|-------------|----------|
| **Light** | Clean white background | Default, professional apps |
| **Dark** | Dark mode with blue accent | Modern apps, dark theme users |
| **Glass Light** | Glassmorphism light | Creative, modern designs |
| **Glass Dark** | Glassmorphism dark | Futuristic, premium feel |
| **Midnight** | Deep blue-black | Developer tools, coding apps |
| **Slate** | Neutral gray | Professional, enterprise apps |

---

## 🚦 Getting Help

### **Documentation**
- Component props not working? → [API Reference](./API_REFERENCE.md)
- Need examples? → [Component Examples](./EXAMPLES.md)
- Layout issues? → [Layout Guide](./LAYOUT.md)

### **Common Issues**
- Toast not showing? → Add `<Toaster />` to `main.tsx`
- Theme not applying? → Wrap app in `<ThemeProvider>`
- Types error? → Check import paths use `@/`

### **Resources**
- [Radix UI Docs](https://radix-ui.com) - Component primitives
- [Tailwind CSS Docs](https://tailwindcss.com) - Utility classes
- [CVA Docs](https://cva.style) - Variant management

---

## 📝 License

MIT - Free for personal and commercial use.

---

## 🎯 Next Steps

Choose your learning path:

**👤 I'm a User** → Start with [Installation Guide](./INSTALLATION.md)

**👨‍💻 I'm a Developer** → Jump to [Architecture](./ARCHITECTURE.md)

**🚀 I want to build now** → Go to [Quick Start](./QUICK_START.md)

**📚 I want complete reference** → Read [Component Guide](./COMPONENTS.md)

---

**Ready to build something amazing? Let's go! 🚀**
