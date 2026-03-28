/**
 * Shared TypeScript type definitions
 */

// ============ User ============
export interface User {
  Id: string;
  Email: string;
  PasswordHash: string;
  FirstName: string;
  LastName: string;
  IsActive: boolean;
  CreatedAt: Date;
  UpdatedAt: Date;
}

export interface UserPublic {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  isActive: boolean;
  roles: string[];
  permissions: string[];
  createdAt: Date;
}

// ============ Role ============
export interface Role {
  Id: number;
  Name: string;
  Description: string | null;
  CreatedAt: Date;
}

// ============ Permission ============
export interface Permission {
  Id: number;
  Name: string;
  Description: string | null;
  Resource: string;
  Action: string;
  CreatedAt: Date;
}

// ============ Auth ============
export interface LoginRequest {
  email: string;
  password: string;
}

export interface RegisterRequest {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
}

export interface AuthResponse {
  user: UserPublic;
  accessToken: string;
  refreshToken: string;
}

// ============ RefreshToken ============
export interface RefreshToken {
  Id: string;
  UserId: string;
  Token: string;
  ExpiresAt: Date;
  CreatedAt: Date;
  RevokedAt: Date | null;
}

// ============ API Response ============
export interface ApiResponse<T = unknown> {
  success: boolean;
  data?: T;
  message?: string;
  errors?: Record<string, string[]>;
}

// ============ Pagination ============
export interface PaginationParams {
  page: number;
  limit: number;
}

export interface PaginatedResponse<T> {
  items: T[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

// ============ Fastify Augmentation ============
declare module 'fastify' {
  interface FastifyRequest {
    userId?: string;
    userRoles?: string[];
    userPermissions?: string[];
  }
}
