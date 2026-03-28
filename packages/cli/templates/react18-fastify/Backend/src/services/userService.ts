import { userRepository } from '../repositories/userRepository.js';
import { roleRepository } from '../repositories/roleRepository.js';
import type { UserPublic, PaginatedResponse } from '../types/index.js';
import type { UpdateUserInput } from '../utils/validators.js';

/**
 * User Service — User CRUD operations
 */
export const userService = {
  /**
   * Get a user by ID with roles and permissions
   */
  async getUserById(id: string): Promise<UserPublic | null> {
    const user = await userRepository.findById(id);
    if (!user) return null;

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
  },

  /**
   * List all users with pagination
   */
  async listUsers(page: number, limit: number): Promise<PaginatedResponse<UserPublic>> {
    const { items, total } = await userRepository.findAll(page, limit);

    const users: UserPublic[] = await Promise.all(
      items.map(async (user) => {
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
      })
    );

    return {
      items: users,
      total,
      page,
      limit,
      totalPages: Math.ceil(total / limit),
    };
  },

  /**
   * Update a user's profile
   */
  async updateUser(id: string, data: UpdateUserInput): Promise<UserPublic | null> {
    const updated = await userRepository.update(id, data);
    if (!updated) return null;

    const roles = await roleRepository.getUserRoles(updated.Id);
    const permissions = await roleRepository.getUserPermissions(updated.Id);

    return {
      id: updated.Id,
      email: updated.Email,
      firstName: updated.FirstName,
      lastName: updated.LastName,
      isActive: updated.IsActive,
      roles,
      permissions,
      createdAt: updated.CreatedAt,
    };
  },

  /**
   * Deactivate a user
   */
  async deactivateUser(id: string): Promise<boolean> {
    return userRepository.deactivate(id);
  },
};
