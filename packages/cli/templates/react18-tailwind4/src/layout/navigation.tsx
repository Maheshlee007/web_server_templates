import { Home, FileText, User, Bell, HelpCircle, BookOpen, Code, Layers, Package, Zap, Database, Palette } from 'lucide-react';
import type { NavItem, MenuItem } from '@/types/layout';

/**
 * Main navigation items - Single source of truth
 * Used for both top navigation (top-only variant) and sidebar navigation
 */
export const navItems: NavItem[] = [
  { id: 'home', label: 'Home', icon: <Home className="w-5 h-5" />, path: '/' },
  { id: 'components', label: 'Components', icon: <Code className="w-5 h-5" />, path: '/components' },
  { id: 'feedback', label: 'Feedback', icon: <BookOpen className="w-5 h-5" />, path: '/feedback' },
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
  { id: 'themes', label: 'Themes', icon: <Palette className="w-5 h-5" />, path: '/themes', badge: '6' },
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
  { id: 'separator-1', type: 'separator', label: '' },
  { id: 'help', label: 'Help & Support', icon: <HelpCircle className="w-4 h-4" />, path: '/help' },
];
