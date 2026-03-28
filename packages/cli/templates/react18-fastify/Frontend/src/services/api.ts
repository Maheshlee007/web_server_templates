import axios from 'axios';
import { APP_CONFIG } from '../config/app';
import { useAuthStore } from '../store/authStore';

/**
 * Axios instance pre-configured with:
 * - Base URL from app config
 * - JWT Authorization header auto-injection
 * - 401 response interceptor (auto-logout on token expiry)
 */
const api = axios.create({
  baseURL: APP_CONFIG.apiBaseUrl,
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 15000,
});

// ──── Request Interceptor: Attach JWT ────
api.interceptors.request.use(
  (config) => {
    const token = useAuthStore.getState().accessToken;
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// ──── Response Interceptor: Handle 401 ────
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    // If 401 and we haven't already retried
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      const refreshToken = useAuthStore.getState().refreshToken;
      if (refreshToken) {
        try {
          // Try to refresh the token
          const { data } = await axios.post(`${APP_CONFIG.apiBaseUrl}/auth/refresh`, {
            refreshToken,
          });

          if (data.success && data.data) {
            const { accessToken, refreshToken: newRefreshToken, user } = data.data;
            useAuthStore.getState().setTokens(accessToken, newRefreshToken);
            useAuthStore.getState().setUser(user);

            // Retry the original request with new token
            originalRequest.headers.Authorization = `Bearer ${accessToken}`;
            return api(originalRequest);
          }
        } catch {
          // Refresh failed — force logout
        }
      }

      // No refresh token or refresh failed → logout
      useAuthStore.getState().logout();
    }

    return Promise.reject(error);
  }
);

export { api };
