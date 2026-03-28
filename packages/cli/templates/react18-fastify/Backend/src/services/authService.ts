import bcrypt from 'bcryptjs';
import { userRepository } from '../repositories/userRepository.js';
import { roleRepository } from '../repositories/roleRepository.js';
import type { UserPublic, AuthResponse } from '../types/index.js';
import type { RegisterInput, LoginInput } from '../utils/validators.js';
import type { TokenService } from './tokenService.js';

const SALT_ROUNDS = 12;

/**
 * Auth Service — Registration, login, and token refresh logic
 */
export function createAuthService(tokenService: TokenService) {
  /**
   * Map a DB user record + roles/permissions to a public user object
   */
  async function toUserPublic(user: {
    Id: string;
    Email: string;
    FirstName: string;
    LastName: string;
    IsActive: boolean;
    CreatedAt: Date;
  }): Promise<UserPublic> {
    const roles = await roleRepository.getUserRoles(user.Id);
    const permissions = await roleRepository.getUserPermissions(user.Id);
    return {
      id: user.Id,
      email: user.Email,
      firstName: user.FirstName,
      lastName: user.LastName,
      isActive: user.IsActive,
      roles,
      permissions,
      createdAt: user.CreatedAt,
    };
  }

  return {
    /**
     * Register a new user — defaults to "Guest" role
     */
    async register(data: RegisterInput): Promise<AuthResponse> {
      // Check if email already exists
      const existing = await userRepository.findByEmail(data.email);
      if (existing) {
        throw { statusCode: 409, message: 'Email already registered' };
      }

      // Hash password
      const passwordHash = await bcrypt.hash(data.password, SALT_ROUNDS);

      // Create user
      const user = await userRepository.create({
        email: data.email,
        passwordHash,
        firstName: data.firstName,
        lastName: data.lastName,
      });

      // Assign default role
      await roleRepository.assignRole(user.Id, 'Guest');

      // Build user profile with roles/permissions
      const userPublic = await toUserPublic(user);

      // Generate tokens
      const tokens = await tokenService.generateTokenPair({
        userId: user.Id,
        email: user.Email,
        roles: userPublic.roles,
        permissions: userPublic.permissions,
      });

      return {
        user: userPublic,
        ...tokens,
      };
    },

    /**
     * Login with email and password
     */
    async login(data: LoginInput): Promise<AuthResponse> {
      const user = await userRepository.findByEmail(data.email);
      if (!user) {
        throw { statusCode: 401, message: 'Invalid email or password' };
      }

      if (!user.IsActive) {
        throw { statusCode: 403, message: 'Account is deactivated' };
      }

      const validPassword = await bcrypt.compare(data.password, user.PasswordHash);
      if (!validPassword) {
        throw { statusCode: 401, message: 'Invalid email or password' };
      }

      const userPublic = await toUserPublic(user);

      const tokens = await tokenService.generateTokenPair({
        userId: user.Id,
        email: user.Email,
        roles: userPublic.roles,
        permissions: userPublic.permissions,
      });

      return {
        user: userPublic,
        ...tokens,
      };
    },

    /**
     * Refresh access token using a valid refresh token
     */
    async refresh(refreshToken: string): Promise<AuthResponse | null> {
      const userId = await tokenService.validateRefreshToken(refreshToken);
      if (!userId) return null;

      const user = await userRepository.findById(userId);
      if (!user || !user.IsActive) return null;

      const userPublic = await toUserPublic(user);

      const tokens = await tokenService.generateTokenPair({
        userId: user.Id,
        email: user.Email,
        roles: userPublic.roles,
        permissions: userPublic.permissions,
      });

      return {
        user: userPublic,
        ...tokens,
      };
    },

    /**
     * Get current user profile from JWT payload
     */
    async getMe(userId: string): Promise<UserPublic | null> {
      const user = await userRepository.findById(userId);
      if (!user) return null;
      return toUserPublic(user);
    },

    /**
     * Logout — revoke all refresh tokens for user
     */
    async logout(userId: string): Promise<void> {
      await tokenService.revokeAllUserTokens(userId);
    },
  };
}

export type AuthService = ReturnType<typeof createAuthService>;
