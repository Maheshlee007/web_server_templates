import { api } from './api';
import type { UserPublic } from './authService';

/**
 * Admin API service — communicates with backend /admin endpoints
 */

export interface PaginatedResponse<T> {
  items: T[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

export interface AdminUser extends UserPublic {
  updatedAt: string;
}

export interface RoleWithDetails {
  id: number;
  name: string;
  description: string | null;
  permissions: string[];
  userCount: number;
}

export interface PermissionItem {
  id: number;
  name: string;
  description: string | null;
  resource: string;
  action: string;
}

export interface SystemStats {
  users: {
    totalUsers: number;
    activeUsers: number;
    inactiveUsers: number;
  };
  roleDistribution: Array<{ role: string; count: number }>;
  recentSignups: Array<{
    id: string;
    email: string;
    name: string;
    createdAt: string;
  }>;
}

export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  message?: string;
}

export interface ScreenAccessMapping {
  screenId: string;
  screenName: string;
  path: string;
  category: string;
  description: string;
  requiresAuth?: boolean;
  isHidden?: boolean;
  roles: string[];
  permissions: string[];
}

export const adminApi = {
  /**
   * List all users with optional filters
   */
  async listUsers(params?: {
    page?: number;
    limit?: number;
    search?: string;
    role?: string;
    isActive?: boolean;
  }): Promise<ApiResponse<PaginatedResponse<AdminUser>>> {
    const response = await api.get('/admin/users', { params });
    return response.data;
  },

  /**
   * Get user details by ID
   */
  async getUserById(id: string): Promise<ApiResponse<AdminUser>> {
    const response = await api.get(`/admin/users/${id}`);
    return response.data;
  },

  /**
   * Update user roles
   */
  async updateUserRoles(
    id: string,
    roles: string[]
  ): Promise<ApiResponse<UserPublic>> {
    const response = await api.put(`/admin/users/${id}/roles`, { roles });
    return response.data;
  },

  /**
   * Toggle user active/inactive status
   */
  async toggleUserStatus(
    id: string,
    isActive: boolean
  ): Promise<ApiResponse<{ message: string }>> {
    const response = await api.patch(`/admin/users/${id}/status`, { isActive });
    return response.data;
  },

  /**
   * List all roles with permissions
   */
  async listRoles(): Promise<ApiResponse<RoleWithDetails[]>> {
    const response = await api.get('/admin/roles');
    return response.data;
  },

  /**
   * List all permissions
   */
  async listPermissions(): Promise<ApiResponse<PermissionItem[]>> {
    const response = await api.get('/admin/permissions');
    return response.data;
  },

  /**
   * Get system stats
   */
  async getStats(): Promise<ApiResponse<SystemStats>> {
    const response = await api.get('/admin/stats');
    return response.data;
  },

  // ═══════════════════════════════════════════
  //  SCREEN-ROLE ACCESS
  // ═══════════════════════════════════════════

  /**
   * Get all screen-role access mappings from backend
   */
  async getScreenAccess(): Promise<ApiResponse<ScreenAccessMapping[]>> {
    const response = await api.get('/admin/screen-access');
    return response.data;
  },

  /**
   * Create or update a screen-role mapping
   */
  async upsertScreenAccess(entry: ScreenAccessMapping): Promise<ApiResponse<{ message: string }>> {
    const response = await api.put('/admin/screen-access', entry);
    return response.data;
  },

  /**
   * Delete a screen-role mapping
   */
  async deleteScreenAccess(screenId: string): Promise<ApiResponse<{ message: string }>> {
    const response = await api.delete(`/admin/screen-access/${screenId}`);
    return response.data;
  },

  /**
   * Seed screen access table from frontend route registry
   */
  async seedScreenAccess(
    entries: Array<{
      screenId: string;
      screenName: string;
      path: string;
      category: string;
      description?: string;
      roles: string[];
      permissions: string[];
    }>
  ): Promise<ApiResponse<{ message: string }>> {
    const response = await api.post('/admin/screen-access/seed', { entries });
    return response.data;
  },
};
