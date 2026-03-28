import { Navigate, useLocation } from 'react-router-dom';
import { useAuthStore } from '@/store/authStore';
import type { ReactNode } from 'react';

interface ProtectedRouteProps {
  children: ReactNode;
  /** If specified, user must have at least one of these roles */
  requiredRoles?: string[];
  /** If specified, user must have at least one of these permissions */
  requiredPermissions?: string[];
}

/**
 * ProtectedRoute — Wraps routes that require authentication
 *
 * Redirects to /login if not authenticated.
 * Redirects to /unauthorized if missing required roles/permissions.
 *
 * Usage:
 * ```tsx
 * <Route path="/admin" element={
 *   <ProtectedRoute requiredRoles={['Admin']}>
 *     <AdminPage />
 *   </ProtectedRoute>
 * } />
 * ```
 */
export function ProtectedRoute({
  children,
  requiredRoles = [],
  requiredPermissions = [],
}: ProtectedRouteProps) {
  const { isAuthenticated, user } = useAuthStore();
  const location = useLocation();

  // Not logged in → redirect to login with return URL
  if (!isAuthenticated) {
    return <Navigate to="/login" state={{ from: location.pathname }} replace />;
  }

  // Check roles
  if (requiredRoles.length > 0 && user) {
    const hasRole = requiredRoles.some((r) => user.roles.includes(r));
    if (!hasRole) {
      return <Navigate to="/unauthorized" replace />;
    }
  }

  // Check permissions
  if (requiredPermissions.length > 0 && user) {
    const hasPerm = requiredPermissions.some((p) => user.permissions.includes(p));
    if (!hasPerm) {
      return <Navigate to="/unauthorized" replace />;
    }
  }

  return <>{children}</>;
}
