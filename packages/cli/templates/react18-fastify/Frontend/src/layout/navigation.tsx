import { Home, FileText, User, Bell, HelpCircle, BookOpen, Code, Layers, Package, Zap, Database, Palette, ShieldCheck } from 'lucide-react';
import type { NavItem, MenuItem } from '@/types/layout';
import { routeRegistry } from '@/config/routeRegistry';

// ──── Icon map — maps route registry IDs to icons ────
const iconMap: Record<string, React.ReactNode> = {
  home: <Home className="w-5 h-5" />,
  components: <Code className="w-5 h-5" />,
  feedback: <BookOpen className="w-5 h-5" />,
  themes: <Palette className="w-5 h-5" />,
  admin: <ShieldCheck className="w-5 h-5" />,
};

/**
 * Main navigation items — Generated from route registry
 * Adding a new screen to routeRegistry.ts auto-updates this list.
 */
export const navItems: NavItem[] = [
  // Auto-generated from route registry
  ...routeRegistry
    .filter((r) => !r.hidden)
    .map((route) => ({
      id: route.id,
      label: route.label,
      icon: iconMap[route.id] ?? <FileText className="w-5 h-5" />,
      path: route.path,
      badge: route.badge,
      roles: route.roles,
    })),
  // Static demo item with nested children (not in registry — demo only)
  { 
    id: 'multi-step-nav', 
    label: 'Multi-Step Nav (Demo)', 
    icon: <FileText className="w-5 h-5" />, 
    path: '/basic',
    badge: 'Demo',
    children: [
      { id: 'active', label: 'Active Projects', icon: <Zap className="w-4 h-4" />, path: '/basic/docs' },
      { id: 'archived', label: 'Archived', icon: <Package className="w-4 h-4" />, path: '/basic/examples' },
      { 
        id: 'templates', 
        label: 'Templates', 
        icon: <Layers className="w-4 h-4" />, 
        path: '/basic/components',
        children: [
          { id: 'react-templates', label: 'React Templates', icon: <Zap className="w-4 h-4" />, path: '/basic/examples/react', badge: '12' },
          { id: 'vue-templates', label: 'Vue Templates', icon: <Package className="w-4 h-4" />, path: '/basic/examples/vue' },
          { 
            id: 'advanced-templates', 
            label: 'Advanced', 
            icon: <Database className="w-4 h-4" />,
            path: '/basic/examples/advanced',
            children: [
              { id: 'design-systems', label: 'Design Systems', icon: <Code className="w-4 h-4" />, path: '/basic/examples/advanced/patterns' },
              { id: 'performance', label: 'Performance', icon: <Zap className="w-4 h-4" />, path: '/basic/examples/advanced/performance' },
            ]
          },
        ]
      },
    ]
  },
];

// Aliases for clarity when passing as props
export const sideNavItems = navItems;
export const topNavItems = navItems;

/**
 * User menu items for user context menu
 */
export const userMenuItems: MenuItem[] = [
  { id: 'profile', label: 'Profile', icon: <User className="w-4 h-4" />, path: '/profile' },
  { id: 'settings', label: 'Settings', icon: <Bell className="w-4 h-4" />, path: '/settings' },
  { id: 'notifications', label: 'Notifications', icon: <Bell className="w-4 h-4" />, path: '/notifications', badge: 5 },
  { id: 'separator-nav', type: 'separator', label: '' },
  { id: 'help', label: 'Help & Support', icon: <HelpCircle className="w-4 h-4" />, path: '/help' },
];
