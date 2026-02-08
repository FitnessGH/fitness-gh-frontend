/**
 * Token storage utility
 * Uses sessionStorage for tokens (more secure than localStorage)
 * Falls back to localStorage if sessionStorage is not available
 */

const ACCESS_TOKEN_KEY = 'accessToken';
const REFRESH_TOKEN_KEY = 'refreshToken';

// Use localStorage for persistence across page refreshes
// sessionStorage is cleared when tab closes, which causes issues on refresh
// We use localStorage as primary storage for better reliability
const storage = typeof window !== 'undefined' ? localStorage : null;
const fallbackStorage = typeof window !== 'undefined' ? sessionStorage : null;

export const tokenStorage = {
  /**
   * Get access token
   */
  getAccessToken(): string | null {
    if (!storage) return null;
    try {
      return storage.getItem(ACCESS_TOKEN_KEY) || fallbackStorage?.getItem(ACCESS_TOKEN_KEY) || null;
    } catch (e) {
      console.error('Error getting access token:', e);
      return null;
    }
  },

  /**
   * Get refresh token
   */
  getRefreshToken(): string | null {
    if (!storage) return null;
    try {
      return storage.getItem(REFRESH_TOKEN_KEY) || fallbackStorage?.getItem(REFRESH_TOKEN_KEY) || null;
    } catch (e) {
      console.error('Error getting refresh token:', e);
      return null;
    }
  },

  /**
   * Set access token
   */
  setAccessToken(token: string): void {
    if (!storage) return;
    try {
      storage.setItem(ACCESS_TOKEN_KEY, token);
      // Also store in fallback for compatibility
      if (fallbackStorage) {
        fallbackStorage.setItem(ACCESS_TOKEN_KEY, token);
      }
    } catch (e) {
      console.error('Error setting access token:', e);
    }
  },

  /**
   * Set refresh token
   */
  setRefreshToken(token: string): void {
    if (!storage) return;
    try {
      storage.setItem(REFRESH_TOKEN_KEY, token);
      // Also store in fallback for compatibility
      if (fallbackStorage) {
        fallbackStorage.setItem(REFRESH_TOKEN_KEY, token);
      }
    } catch (e) {
      console.error('Error setting refresh token:', e);
    }
  },

  /**
   * Set both tokens
   */
  setTokens(accessToken: string, refreshToken: string): void {
    this.setAccessToken(accessToken);
    this.setRefreshToken(refreshToken);
  },

  /**
   * Clear all tokens
   */
  clearTokens(): void {
    if (!storage) return;
    try {
      storage.removeItem(ACCESS_TOKEN_KEY);
      storage.removeItem(REFRESH_TOKEN_KEY);
      if (fallbackStorage) {
        fallbackStorage.removeItem(ACCESS_TOKEN_KEY);
        fallbackStorage.removeItem(REFRESH_TOKEN_KEY);
      }
    } catch (e) {
      console.error('Error clearing tokens:', e);
    }
  },

  /**
   * Check if tokens exist
   */
  hasTokens(): boolean {
    return !!this.getAccessToken() && !!this.getRefreshToken();
  },
};
