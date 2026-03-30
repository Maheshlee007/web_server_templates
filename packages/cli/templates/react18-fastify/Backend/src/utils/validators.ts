import { z } from 'zod';

/**
 * Validation schemas for all request inputs (Zod)
 *
 * Note: Passwords may be sent as SHA-256 hex hashes (64-char hex string)
 * from the frontend. The validators accept both plaintext and pre-hashed formats.
 */

// SHA-256 hex pattern: exactly 64 lowercase hex characters
const SHA256_REGEX = /^[a-f0-9]{64}$/;

// ============ Auth Schemas ============
export const loginSchema = z.object({
  email: z.string().email('Invalid email address').trim().toLowerCase(),
  password: z.string().min(6, 'Password must be at least 6 characters'),
});

export const registerSchema = z.object({
  email: z.string().email('Invalid email address').trim().toLowerCase(),
  password: z
    .string()
    .min(8, 'Password must be at least 8 characters')
    .refine(
      (val) =>
        // Accept SHA-256 hex hashes (from frontend) OR plaintext passwords with complexity rules
        SHA256_REGEX.test(val) ||
        (/[A-Z]/.test(val) && /[a-z]/.test(val) && /[0-9]/.test(val)),
      {
        message:
          'Password must contain at least one uppercase letter, one lowercase letter, and one number',
      }
    ),
  firstName: z.string().min(1, 'First name is required').max(100).trim(),
  lastName: z.string().min(1, 'Last name is required').max(100).trim(),
});

export const refreshTokenSchema = z.object({
  refreshToken: z.string().min(1, 'Refresh token is required'),
});

// ============ User Schemas ============
export const updateUserSchema = z.object({
  firstName: z.string().min(1).max(100).optional(),
  lastName: z.string().min(1).max(100).optional(),
  email: z.string().email().optional(),
});

export const userIdParamSchema = z.object({
  id: z.string().uuid('Invalid user ID format'),
});

// ============ Pagination Schema ============
export const paginationSchema = z.object({
  page: z.coerce.number().int().min(1).default(1),
  limit: z.coerce.number().int().min(1).max(100).default(20),
});

// ============ Type Exports ============
export type LoginInput = z.infer<typeof loginSchema>;
export type RegisterInput = z.infer<typeof registerSchema>;
export type RefreshTokenInput = z.infer<typeof refreshTokenSchema>;
export type UpdateUserInput = z.infer<typeof updateUserSchema>;
export type PaginationInput = z.infer<typeof paginationSchema>;
