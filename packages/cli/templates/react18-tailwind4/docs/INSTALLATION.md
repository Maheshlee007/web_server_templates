# Installation Guide

Complete setup guide for the React 18 + Tailwind 4 template.

---

## 🎯 Installation Methods

### Method 1: Via CLI (Recommended)

The easiest way to create a new project:

```bash
# Create new project
npx create-react-tailwind-app my-app

# Navigate to project
cd my-app

# Install dependencies
pnpm install

# Start development server
pnpm dev
```

Your app will be running at `http://localhost:5173` 🎉

---

### Method 2: Manual Clone

Clone the repository and set up manually:

```bash
# Clone repository
git clone <repository-url>
cd web_server_templates

# Navigate to template
cd packages/templates/react18-tailwind4

# Install dependencies
pnpm install

# Start dev server
pnpm dev
```

---

## 📦 Requirements

### System Requirements
- **Node.js** 18.0 or higher
- **pnpm** 8.0 or higher (or npm/yarn)
- **Git** (for cloning)

### Check Your Versions
```bash
node --version    # Should be v18.0.0 or higher
pnpm --version    # Should be 8.0.0 or higher
```

### Install pnpm (if needed)
```bash
npm install -g pnpm
```

---

## 🔧 Project Setup

### 1. Install Dependencies

After creating/cloning the project:

```bash
pnpm install
```

This installs:
- React 18.3
- TypeScript 5.6
- Tailwind CSS 4.0
- Vite 6.0
- Radix UI components
- Sonner (toast library)
- Lucide Icons
- And more...

### 2. Environment Setup

Create `.env` file (optional):

```bash
# .env
VITE_APP_TITLE="My App"
VITE_API_URL="http://localhost:3000"
```

### 3. Start Development

```bash
pnpm dev
```

Opens at `http://localhost:5173`

---

## 📂 Project Structure

After installation, you'll see:

```
react18-tailwind4/
├── public/              # Static assets
├── src/
│   ├── components/      # UI components
│   │   ├── UI/         # Reusable components
│   │   │   ├── Buttons/
│   │   │   ├── Feedback/
│   │   │   └── radix/
│   │   └── features/   # Feature components
│   ├── layout/         # Layout system
│   │   ├── AppLayout/
│   │   ├── SideNav/
│   │   ├── TopNav/
│   │   └── Breadcrumbs/
│   ├── pages/          # Route pages
│   ├── context/        # React context
│   ├── hooks/          # Custom hooks
│   ├── types/          # TypeScript types
│   ├── utils/          # Utilities
│   ├── styles/         # Global styles
│   ├── App.tsx         # Main app
│   ├── main.tsx        # Entry point
│   └── index.css       # Global CSS
├── docs/               # Documentation
├── package.json
├── tsconfig.json
├── vite.config.ts
└── tailwind.config.js
```

---

## 🎨 Configure Your App

### 1. Update App Metadata

**File:** `index.html`
```html
<head>
  <title>My App Name</title> <!-- Change this -->
  <meta name="description" content="My app description" />
</head>
```

### 2. Configure Layout

**File:** `src/App.tsx`
```tsx
<AppLayoutProvider
  variant="sidebar-left"      // Layout type
  title="My App"              // App title
  sidebarDefaultOpen={true}   // Sidebar state
  user={{                     // User info
    name: "John Doe",
    email: "john@example.com",
    avatar: "/avatar.jpg"
  }}
>
  {/* Your routes */}
</AppLayoutProvider>
```

### 3. Add Your Routes

**File:** `src/App.tsx`
```tsx
import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import About from './pages/About';

<Routes>
  <Route path="/" element={<Home />} />
  <Route path="/about" element={<About />} />
</Routes>
```

### 4. Update Navigation

**File:** `src/layout/navigation.tsx`
```tsx
import { Home, Info } from 'lucide-react';

export const navItems: NavItem[] = [
  { 
    id: 'home', 
    label: 'Home', 
    icon: <Home className="w-5 h-5" />, 
    path: '/' 
  },
  { 
    id: 'about', 
    label: 'About', 
    icon: <Info className="w-5 h-5" />, 
    path: '/about' 
  },
];
```

---

## 🎯 Install Additional Dependencies

### Add Sonner (Toast Notifications)

Already included, but if you need to reinstall:

```bash
pnpm add sonner
```

Then add to `src/main.tsx`:
```tsx
import { Toaster } from '@/components/UI/Feedback';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ThemeProvider>
      <App />
      <Toaster position="top-right" /> {/* Add this */}
    </ThemeProvider>
  </StrictMode>
);
```

### Add Form Validation (React Hook Form)

```bash
pnpm add react-hook-form zod @hookform/resolvers
```

### Add State Management (Zustand)

```bash
pnpm add zustand
```

### Add Data Fetching (React Query)

```bash
pnpm add @tanstack/react-query
```

### Add Animations (Framer Motion)

```bash
pnpm add framer-motion
```

---

## 🚀 Build & Deploy

### Development Build

```bash
pnpm dev
# Runs on http://localhost:5173
```

### Production Build

```bash
pnpm build
# Creates optimized build in /dist
```

### Preview Production Build

```bash
pnpm preview
# Preview production build locally
```

### Build Analysis

```bash
pnpm build --mode production --stats
# Analyze bundle size
```

---

## 🐳 Docker Setup (Optional)

### Create Dockerfile

```dockerfile
FROM node:18-alpine

WORKDIR /app

COPY package.json pnpm-lock.yaml ./
RUN npm install -g pnpm && pnpm install

COPY . .

RUN pnpm build

EXPOSE 5173

CMD ["pnpm", "preview"]
```

### Build & Run

```bash
docker build -t my-app .
docker run -p 5173:5173 my-app
```

---

## 🔧 Troubleshooting

### Issue: `pnpm` not found
**Solution:**
```bash
npm install -g pnpm
```

### Issue: Port 5173 already in use
**Solution:**
```bash
# Change port in vite.config.ts
export default defineConfig({
  server: {
    port: 3000 // Change to any available port
  }
})
```

### Issue: Module not found errors
**Solution:**
```bash
rm -rf node_modules pnpm-lock.yaml
pnpm install
```

### Issue: TypeScript errors
**Solution:**
```bash
# Check tsconfig.json paths
{
  "compilerOptions": {
    "paths": {
      "@/*": ["./src/*"]  // Ensure this exists
    }
  }
}
```

### Issue: Tailwind styles not applying
**Solution:**
1. Check `tailwind.config.js` content paths
2. Restart dev server: `pnpm dev`
3. Clear Vite cache: `rm -rf node_modules/.vite`

### Issue: Toast not showing
**Solution:**
Ensure `<Toaster />` is added to `main.tsx`:
```tsx
import { Toaster } from '@/components/UI/Feedback';
<Toaster position="top-right" />
```

---

## 📱 IDE Setup

### VS Code Extensions (Recommended)

Install these extensions for best experience:

1. **ES7+ React/Redux/React-Native** - Code snippets
2. **Tailwind CSS IntelliSense** - Class autocomplete
3. **TypeScript Error Translator** - Better error messages
4. **ESLint** - Code linting
5. **Prettier** - Code formatting

### VS Code Settings

```json
{
  "editor.formatOnSave": true,
  "editor.defaultFormatter": "esbenp.prettier-vscode",
  "tailwindCSS.experimental.classRegex": [
    ["cva\\(([^)]*)\\)", "[\"'`]([^\"'`]*).*?[\"'`]"]
  ]
}
```

---

## ✅ Verify Installation

Run this checklist to ensure everything works:

### 1. Development Server
```bash
pnpm dev
# ✓ Should open http://localhost:5173
```

### 2. TypeScript Compilation
```bash
pnpm type-check
# ✓ Should show no errors
```

### 3. Build
```bash
pnpm build
# ✓ Should create /dist folder
```

### 4. Components
Visit these pages to verify:
- ✓ Home page loads
- ✓ Components page shows all components
- ✓ Theme switcher works
- ✓ Navigation works
- ✓ Toast notifications work

---

## 🎉 Next Steps

Installation complete! Now:

1. **Learn the basics** → [Quick Start Guide](./QUICK_START.md)
2. **Explore components** → [Component Guide](./COMPONENTS.md)
3. **Customize layout** → [Layout Guide](./LAYOUT.md)
4. **Change themes** → [Theme Guide](./THEMES.md)

---

## 📞 Need Help?

- **Documentation Issues?** → Check [README](./README.md)
- **Component Questions?** → See [Component Guide](./COMPONENTS.md)
- **Build Errors?** → Check troubleshooting section above

---

**Ready to start building? Let's go! 🚀**
