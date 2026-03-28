/**
 * Client-side password hashing utility
 *
 * WHY: Prevents plaintext passwords from being visible in:
 * - Browser DevTools Network tab
 * - Proxy logs
 * - Server access logs (if body is logged)
 *
 * HOW: Uses Web Crypto API (SHA-256) to hash the password before sending.
 * The server then bcrypt-hashes this SHA-256 hash for storage.
 *
 * NOTE: This does NOT replace HTTPS. HTTPS encrypts the entire payload
 * in transit. This is an additional defense-in-depth measure.
 */

/**
 * Hash a password using SHA-256 via Web Crypto API.
 * Returns a hex-encoded hash string.
 */
export async function hashPassword(password: string): Promise<string> {
  const encoder = new TextEncoder();
  const data = encoder.encode(password);
  const hashBuffer = await crypto.subtle.digest('SHA-256', data);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  return hashArray.map((b) => b.toString(16).padStart(2, '0')).join('');
}
