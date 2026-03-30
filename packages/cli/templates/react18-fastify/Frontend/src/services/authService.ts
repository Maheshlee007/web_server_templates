import { api } from './api';
import { hashPassword } from '../utils/crypto';

/**
 * Auth API service — communicates with backend /auth endpoints
 * Passwords are SHA-256 hashed client-side before transmission
 */

export interface UserPublic {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  isActive: boolean;
  roles: string[];
  permissions: string[];
  createdAt: string;
}

export interface AuthResponse {
  user: UserPublic;
  accessToken: string;
  refreshToken: string;
}

export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  message?: string;
  errors?: Record<string, string[]>;
}

export const authApi = {
  /**
   * Register a new user (password is SHA-256 hashed before sending)
   */
  async register(data: {
    email: string;
    password: string;
    firstName: string;
    lastName: string;
  }): Promise<ApiResponse<AuthResponse>> {
    const hashedPassword = await hashPassword(data.password);
    const response = await api.post('/auth/register', {
      ...data,
      password: hashedPassword,
      _hashed: true,
    });
    return response.data;
  },

  /**
   * Login with email & password (password is SHA-256 hashed before sending)
   */
  async login(data: { email: string; password: string }): Promise<ApiResponse<AuthResponse>> {
    const hashedPassword = await hashPassword(data.password);
    const response = await api.post('/auth/login', {
      ...data,
      password: hashedPassword,
      _hashed: true,
    });
    return response.data;
  },

  /**
   * Refresh access token
   */
  async refresh(refreshToken: string): Promise<ApiResponse<AuthResponse>> {
    const response = await api.post('/auth/refresh', { refreshToken });
    return response.data;
  },

  /**
   * Logout — revokes refresh tokens server-side
   */
  async logout(): Promise<void> {
    try {
      await api.post('/auth/logout');
    } catch {
      // Ignore logout errors — we clear local state anyway
    }
  },

  /**
   * Get current user profile
   */
  async getMe(): Promise<ApiResponse<UserPublic>> {
    const response = await api.get('/auth/me');
    return response.data;
  },
};
