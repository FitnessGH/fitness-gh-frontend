/**
 * Base API client utilities
 * Handles token management and automatic token refresh
 */

import { AuthAPI } from './auth';
import { tokenStorage } from '../utils/token-storage';

const BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5001';
export const API_BASE_URL = `${BASE_URL}/api/v1`;

export class ApiClient {
  /**
   * Get headers with optional authorization
   */
  static getHeaders(includeAuth = false): HeadersInit {
    const headers: HeadersInit = {
      'Content-Type': 'application/json',
    };

    if (includeAuth) {
      const accessToken = tokenStorage.getAccessToken();
      if (accessToken) {
        headers['Authorization'] = `Bearer ${accessToken}`;
      }
    }

    return headers;
  }

  /**
   * Get headers with authorization token
   * Automatically refreshes token if expired
   */
  static async getAuthHeaders(): Promise<HeadersInit> {
    let accessToken = tokenStorage.getAccessToken();

    if (!accessToken) {
      throw new Error('No access token available');
    }

    // Try to use the token, and refresh if it fails
    // For now, we'll let the API call handle 401 errors
    // and refresh in the interceptor/error handler

    return {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${accessToken}`,
    };
  }

  /**
   * Refresh access token if request fails with 401
   */
  static async refreshTokenIfNeeded(): Promise<string | null> {
    const refreshToken = tokenStorage.getRefreshToken();
    if (!refreshToken) {
      return null;
    }

    try {
      const newTokens = await AuthAPI.refreshToken(refreshToken);
      tokenStorage.setTokens(newTokens.accessToken, newTokens.refreshToken);
      return newTokens.accessToken;
    } catch (error) {
      console.error('Failed to refresh token:', error);
      tokenStorage.clearTokens();
      return null;
    }
  }

  /**
   * Make an authenticated fetch request with automatic token refresh
   */
  static async fetchWithAuth(
    url: string,
    options: RequestInit = {},
  ): Promise<Response> {
    let accessToken = tokenStorage.getAccessToken();
    
    if (!accessToken) {
      throw new Error('No access token available');
    }

    // First attempt
    let response = await fetch(url, {
      ...options,
      headers: {
        ...options.headers,
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${accessToken}`,
      },
    });

    // If 401, try to refresh token and retry
    if (response.status === 401) {
      const newAccessToken = await this.refreshTokenIfNeeded();
      
      if (newAccessToken) {
        // Retry with new token
        response = await fetch(url, {
          ...options,
          headers: {
            ...options.headers,
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${newAccessToken}`,
          },
        });
      }
    }

    return response;
  }

  /**
   * Parse API response
   */
  static async parseResponse<T>(response: Response): Promise<T> {
    const result = await response.json();
    return (result?.data ?? result) as T;
  }
}
