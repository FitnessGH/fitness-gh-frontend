import { tokenStorage } from '../utils/token-storage';

// Base URL for API
const BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5001';
const API_BASE_URL = `${BASE_URL}/api/v1`;

export type EmployeeRole = 'MANAGER' | 'TRAINER' | 'RECEPTIONIST' | 'STAFF';

export interface Employee {
  id: string;
  profileId: string;
  gymId: string;
  role: EmployeeRole;
  isActive: boolean;
  startDate: string;
  endDate: string | null;
  createdAt: string;
  profile: {
    id: string;
    username: string;
    firstName: string | null;
    lastName: string | null;
    avatarUrl: string | null;
  };
}

class EmployeesAPI {
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
   * Get gym employees (authenticated)
   * If accessToken is not provided, gets it from tokenStorage
   */
  static async getGymEmployees(
    gymId: string,
    accessToken?: string,
  ): Promise<Employee[]> {
    const token = accessToken || tokenStorage.getAccessToken();
    if (!token) {
      throw new Error('No access token available');
    }

    const response = await fetch(`${API_BASE_URL}/gyms/${gymId}/employees`, {
      method: 'GET',
      headers: this.getAuthHeaders(token),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || 'Failed to get employees');
    }

    return this.parseResponse<Employee[]>(response);
  }
}

export default EmployeesAPI;
