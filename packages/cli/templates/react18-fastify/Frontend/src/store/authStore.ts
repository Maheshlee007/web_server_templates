import { create } from 'zustand';
import type { UserPublic } from '../services/authService';
import { api } from '../services/api';

/**
 * Auth Store — In-memory only (NO localStorage/sessionStorage)
 *
 * Security:
 * - Tokens are NEVER persisted to storage (prevents tampering)
 * - On page reload, user must re-authenticate
 * - Server-side token validation on every request via JWT
 * - Even if someone injects data via devtools, API calls will fail
 *   because the server validates the actual JWT token
 *
 * Usage:
 * ```tsx
 * const { user, isAuthenticated, login, logout } = useAuthStore();
 * const hasRole = useAuthStore(s => s.hasRole('Admin'));
 * const hasPerm = useAuthStore(s => s.hasPermission('users:read'));
 * ```
 */

interface AuthState {
  // ──── State ────
  user: UserPublic | null;
  accessToken: string | null;
  refreshToken: string | null;
  isAuthenticated: boolean;
  isInitializing: boolean; // True while checking session on app load

  // ──── Actions ────
  setUser: (user: UserPublic) => void;
  setTokens: (accessToken: string, refreshToken: string) => void;
  loginSuccess: (user: UserPublic, accessToken: string, refreshToken: string) => void;
  logout: () => void;
  /** Validate session on app load — calls /auth/me to check if token is still valid */
  initSession: () => Promise<void>;

  // ──── Helpers ────
  hasRole: (role: string) => boolean;
  hasAnyRole: (roles: string[]) => boolean;
  hasPermission: (permission: string) => boolean;
  hasAnyPermission: (permissions: string[]) => boolean;
}

export const useAuthStore = create<AuthState>()(
  (set, get) => ({
    // ──── Initial State ────
    user: null,
    accessToken: null,
    refreshToken: null,
    isAuthenticated: false,
    isInitializing: false,

    // ──── Actions ────
    setUser: (user) => set({ user }),

    setTokens: (accessToken, refreshToken) => set({ accessToken, refreshToken }),

    loginSuccess: (user, accessToken, refreshToken) =>
      set({
        user,
        accessToken,
        refreshToken,
        isAuthenticated: true,
      }),

    logout: () => {
      // Clear any stale localStorage from previous versions
      try { localStorage.removeItem('fastify-react-auth'); } catch { /* ignore */ }
      set({
        user: null,
        accessToken: null,
        refreshToken: null,
        isAuthenticated: false,
      });
    },

    /**
     * Validate session — called on app load.
     * If a refreshToken exists in memory (e.g. from a same-tab navigation),
     * tries to refresh. Otherwise user must log in again.
     */
    initSession: async () => {
      const { refreshToken } = get();
      if (!refreshToken) {
        set({ isInitializing: false });
        return;
      }

      set({ isInitializing: true });
      try {
        const { data } = await api.post('/auth/refresh', { refreshToken });
        if (data.success && data.data) {
          const { user, accessToken, refreshToken: newRefreshToken } = data.data;
          set({
            user,
            accessToken,
            refreshToken: newRefreshToken,
            isAuthenticated: true,
            isInitializing: false,
          });
        } else {
          get().logout();
          set({ isInitializing: false });
        }
      } catch {
        get().logout();
        set({ isInitializing: false });
      }
    },

    // ──── Helpers ────
    hasRole: (role) => get().user?.roles.includes(role) ?? false,

    hasAnyRole: (roles) => roles.some((r) => get().user?.roles.includes(r) ?? false),

    hasPermission: (permission) => get().user?.permissions.includes(permission) ?? false,

    hasAnyPermission: (permissions) =>
      permissions.some((p) => get().user?.permissions.includes(p) ?? false),
  })
);
