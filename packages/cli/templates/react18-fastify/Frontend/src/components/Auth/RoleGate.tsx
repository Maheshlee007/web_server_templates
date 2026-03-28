import type { ReactNode } from 'react';
import { useAuthStore } from '@/store/authStore';

interface RoleGateProps {
  children: ReactNode;
  /** Show children only if user has at least one of these roles */
  roles?: string[];
  /** Show children only if user has at least one of these permissions */
  permissions?: string[];
  /** Optional fallback content when access is denied */
  fallback?: ReactNode;
}

/**
 * RoleGate — Conditionally renders children based on user roles/permissions
 *
 * Usage:
 * ```tsx
 * <RoleGate roles={['Admin', 'Manager']}>
 *   <AdminPanel />
 * </RoleGate>
 *
 * <RoleGate permissions={['reports:view']} fallback={<p>No access</p>}>
 *   <ReportsSection />
 * </RoleGate>
 * ```
 */
export function RoleGate({ children, roles = [], permissions = [], fallback = null }: RoleGateProps) {
  const user = useAuthStore((s) => s.user);

  if (!user) return <>{fallback}</>;

  // If roles specified, check at least one matches
  if (roles.length > 0) {
    const hasRole = roles.some((r) => user.roles.includes(r));
    if (!hasRole) return <>{fallback}</>;
  }

  // If permissions specified, check at least one matches
  if (permissions.length > 0) {
    const hasPerm = permissions.some((p) => user.permissions.includes(p));
    if (!hasPerm) return <>{fallback}</>;
  }

  return <>{children}</>;
}
