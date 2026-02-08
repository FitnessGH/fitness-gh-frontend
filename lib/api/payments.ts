import { tokenStorage } from '../utils/token-storage';

// Base URL for API
const BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5001';
const API_BASE_URL = `${BASE_URL}/api/v1`;

export type PaymentStatus = 'PENDING' | 'COMPLETED' | 'FAILED' | 'REFUNDED';

export interface Payment {
  id: string;
  profileId: string;
  gymId: string;
  membershipId: string | null;
  amount: number;
  currency: string;
  reference: string;
  provider: string;
  channel: string | null;
  status: PaymentStatus;
  createdAt: string;
  updatedAt: string;
  paidAt: string | null;
  profile?: {
    id: string;
    username: string;
    firstName: string | null;
    lastName: string | null;
    avatarUrl: string | null;
  };
  gym?: {
    id: string;
    name: string;
    slug: string;
  };
  membership?: {
    id: string;
    plan: {
      id: string;
      name: string;
    };
  };
}

class PaymentsAPI {
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
   * Get my payments (authenticated user)
   * If accessToken is not provided, gets it from tokenStorage
   */
  static async getMyPayments(accessToken?: string): Promise<Payment[]> {
    const token = accessToken || tokenStorage.getAccessToken();
    if (!token) {
      throw new Error('No access token available');
    }

    const response = await fetch(`${API_BASE_URL}/payments/my`, {
      method: 'GET',
      headers: this.getAuthHeaders(token),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || 'Failed to get payments');
    }

    return this.parseResponse<Payment[]>(response);
  }

  /**
   * Get gym payments (gym owner/manager)
   * If accessToken is not provided, gets it from tokenStorage
   */
  static async getGymPayments(
    gymId: string,
    accessToken?: string,
  ): Promise<Payment[]> {
    const token = accessToken || tokenStorage.getAccessToken();
    if (!token) {
      throw new Error('No access token available');
    }

    const response = await fetch(`${API_BASE_URL}/payments/gyms/${gymId}`, {
      method: 'GET',
      headers: this.getAuthHeaders(token),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || 'Failed to get gym payments');
    }

    return this.parseResponse<Payment[]>(response);
  }
}

export default PaymentsAPI;
