import { tokenStorage } from '../utils/token-storage';

// Base URL for API
const BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5001';
const API_BASE_URL = `${BASE_URL}/api/v1`;

export interface UserProfile {
  id: string;
  accountId: string;
  username: string;
  firstName: string | null;
  lastName: string | null;
  avatarUrl: string | null;
  height: number | null;
  weight: number | null;
  age: number | null;
  gender: 'MALE' | 'FEMALE' | 'OTHER' | null;
  preferences: any;
  createdAt: string;
  updatedAt: string;
}

export interface UpdateProfileData {
  firstName?: string;
  lastName?: string;
  avatarUrl?: string;
  height?: number;
  weight?: number;
  age?: number;
  gender?: 'MALE' | 'FEMALE' | 'OTHER';
}

class UsersAPI {
  private static getHeaders(): HeadersInit {
    return {
      'Content-Type': 'application/json',
    };
  }

  private static getAuthHeaders(accessToken: string): HeadersInit {
    return {
      ...this.getHeaders(),
      'Authorization': `Bearer ${accessToken}`,
    };
  }

  private static async parseResponse<T>(response: Response): Promise<T> {
    const result = await response.json();
    return (result?.data ?? result) as T;
  }

  /**
   * Get all users with account information (for admin)
   * If accessToken is not provided, gets it from tokenStorage
   */
  static async getAllUsers(accessToken?: string): Promise<UserWithAccount[]> {
    const token = accessToken || tokenStorage.getAccessToken();
    if (!token) {
      throw new Error('No access token available');
    }

    const response = await fetch(`${API_BASE_URL}/users?withAccounts=true`, {
      method: 'GET',
      headers: this.getAuthHeaders(token),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || 'Failed to get users');
    }

    return this.parseResponse<UserWithAccount[]>(response);
  }

  /**
   * Update user profile
   * If accessToken is not provided, gets it from tokenStorage
   */
  static async updateProfile(
    profileId: string,
    data: UpdateProfileData,
    accessToken?: string,
  ): Promise<UserProfile> {
    const token = accessToken || tokenStorage.getAccessToken();
    if (!token) {
      throw new Error('No access token available');
    }

    const response = await fetch(`${API_BASE_URL}/users/${profileId}`, {
      method: 'PUT',
      headers: this.getAuthHeaders(token),
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || 'Failed to update profile');
    }

    return this.parseResponse<UserProfile>(response);
  }
}

export interface UserWithAccount {
  id: string;
  email: string;
  phone: string | null;
  emailVerified: boolean;
  phoneVerified: boolean;
  userType: 'SUPER_ADMIN' | 'GYM_OWNER' | 'EMPLOYEE' | 'MEMBER';
  isActive: boolean;
  lastLoginAt: string | null;
  createdAt: string;
  updatedAt: string;
  profile: {
    id: string;
    username: string;
    firstName: string | null;
    lastName: string | null;
    avatarUrl: string | null;
    createdAt: string;
  } | null;
}

export default UsersAPI;
