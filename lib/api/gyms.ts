import { tokenStorage } from '../utils/token-storage';

// Base URL for API
const BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5001';
const API_BASE_URL = `${BASE_URL}/api/v1`;

export interface Gym {
  id: string;
  name: string;
  slug: string;
  description: string | null;
  address: string;
  city: string;
  region: string;
  country: string;
  latitude: number | null;
  longitude: number | null;
  phone: string | null;
  email: string | null;
  website: string | null;
  logoUrl: string | null;
  coverUrl: string | null;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface GymWithOwner extends Gym {
  owner: {
    id: string;
    username: string;
    firstName: string | null;
    lastName: string | null;
    avatarUrl: string | null;
  };
}

class GymsAPI {
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
   * Get all gyms (public)
   * @param includeOwner - Include owner information in response
   */
  static async getAllGyms(includeOwner?: boolean): Promise<Gym[] | GymWithOwner[]> {
    const url = new URL(`${API_BASE_URL}/gyms`);
    if (includeOwner) {
      url.searchParams.append('includeOwner', 'true');
    }
    
    const response = await fetch(url.toString(), {
      method: 'GET',
      headers: this.getHeaders(),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || 'Failed to get gyms');
    }

    return this.parseResponse<Gym[] | GymWithOwner[]>(response);
  }

  /**
   * Get gym by slug (public)
   */
  static async getGymBySlug(slug: string): Promise<GymWithOwner> {
    const response = await fetch(`${API_BASE_URL}/gyms/${slug}`, {
      method: 'GET',
      headers: this.getHeaders(),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || 'Failed to get gym');
    }

    return this.parseResponse<GymWithOwner>(response);
  }

  /**
   * Get my gyms (authenticated)
   * Returns both owned and employed gyms
   * If accessToken is not provided, gets it from tokenStorage
   */
  static async getMyGyms(accessToken?: string): Promise<{ owned: Gym[]; employed: Gym[] }> {
    const token = accessToken || tokenStorage.getAccessToken();
    if (!token) {
      throw new Error('No access token available');
    }

    const response = await fetch(`${API_BASE_URL}/gyms/my/all`, {
      method: 'GET',
      headers: this.getAuthHeaders(token),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || 'Failed to get my gyms');
    }

    return this.parseResponse<{ owned: Gym[]; employed: Gym[] }>(response);
  }
}

export default GymsAPI;
