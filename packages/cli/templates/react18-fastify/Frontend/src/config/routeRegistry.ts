import type { ReactNode } from 'react';

/**
 * Route Registry — Single source of truth for ALL application routes
 *
 * WHY: Instead of manually adding routes to navigation.tsx, App.tsx, and
 * the admin page separately, define them once here. Changes to roles/
 * permissions propagate everywhere automatically.
 *
 * HOW IT WORKS:
 * 1. Define routes here with their component, icon, roles, permissions
 * 2. navigation.tsx reads this to build the sidebar
 * 3. App.tsx reads this to build <Route> elements
 * 4. Admin page reads this to show the screen-role permission matrix
 *
 * To add a new screen:
 * 1. Create the page component
 * 2. Add an entry here — navigation + routing + admin visibility auto-update
 */

export interface RouteEntry {
  /** Unique identifier */
  id: string;
  /** Display label in navigation */
  label: string;
  /** Route path */
  path: string;
  /** Lucide icon component */
  icon?: ReactNode;
  /** Badge text (e.g., "Admin", "New", "6") */
  badge?: string;
  /** Roles that can access this route (empty = all authenticated users) */
  roles?: string[];
  /** Permissions required (empty = none) */
  permissions?: string[];
  /** If true, route is hidden from navigation but still accessible */
  hidden?: boolean;
  /** If true, route requires authentication */
  requiresAuth?: boolean;
  /** Description shown in admin panel */
  description?: string;
  /** Sub-routes/children */
  children?: RouteEntry[];
  /** Category for grouping in admin panel */
  category?: 'core' | 'admin' | 'demo' | 'settings';
}

/**
 * All application routes — ordered by priority
 * This is the ONLY place you need to update when adding new screens.
 */
export const routeRegistry: RouteEntry[] = [
  {
    id: 'home',
    label: 'Home',
    path: '/',
    requiresAuth: true,
    description: 'Main dashboard',
    category: 'core',
  },
  {
    id: 'components',
    label: 'Components',
    path: '/components',
    requiresAuth: true,
    description: 'UI component showcase',
    category: 'demo',
  },
  {
    id: 'feedback',
    label: 'Feedback',
    path: '/feedback',
    requiresAuth: true,
    description: 'Feedback components demo',
    category: 'demo',
  },
  {
    id: 'themes',
    label: 'Themes',
    path: '/themes',
    badge: '6',
    requiresAuth: true,
    description: 'Theme customization',
    category: 'settings',
  },
  {
    id: 'admin',
    label: 'Administration',
    path: '/admin',
    badge: 'Admin',
    roles: ['Admin'],
    permissions: ['admin:access'],
    requiresAuth: true,
    description: 'User management, role management, system settings',
    category: 'admin',
  },
];

/**
 * Get routes accessible to a user based on their roles and permissions
 */
export function getAccessibleRoutes(
  userRoles: string[],
  userPermissions: string[]
): RouteEntry[] {
  return routeRegistry.filter((route) => {
    // No role/permission restriction → everyone can access
    if (!route.roles?.length && !route.permissions?.length) return true;
    // Check roles
    const hasRole = route.roles?.some((r) => userRoles.includes(r)) ?? true;
    // Check permissions
    const hasPerm = route.permissions?.some((p) => userPermissions.includes(p)) ?? true;
    return hasRole || hasPerm;
  });
}

/**
 * Get the full role-screen permission matrix for admin display
 */
export function getScreenPermissionMatrix(): {
  screen: string;
  path: string;
  description: string;
  category: string;
  roles: string[];
  permissions: string[];
}[] {
  return routeRegistry
    .filter((r) => !r.hidden)
    .map((route) => ({
      screen: route.label,
      path: route.path,
      description: route.description ?? '',
      category: route.category ?? 'core',
      roles: route.roles ?? [],
      permissions: route.permissions ?? [],
    }));
}
