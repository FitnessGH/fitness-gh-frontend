// Base URL for API
const BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5001';
const API_BASE_URL = `${BASE_URL}/api/v1`;

export type MembershipStatus = 'ACTIVE' | 'INACTIVE' | 'SUSPENDED' | 'CANCELLED' | 'EXPIRED';
export type DurationUnit = 'DAY' | 'WEEK' | 'MONTH' | 'YEAR';

export interface SubscriptionPlan {
  id: string;
  gymId: string;
  name: string;
  description: string | null;
  price: number;
  currency: string;
  duration: number;
  durationUnit: DurationUnit;
  features: any;
  maxVisits: number | null;
  isActive: boolean;
  sortOrder: number;
  createdAt: string;
  updatedAt: string;
}

export interface Membership {
  id: string;
  profileId: string;
  gymId: string;
  planId: string;
  status: MembershipStatus;
  startDate: string | null;
  endDate: string | null;
  autoRenew: boolean;
  visitsUsed: number;
  createdAt: string;
  updatedAt: string;
  plan: SubscriptionPlan;
  profile?: {
    id: string;
    username: string;
    firstName: string | null;
    lastName: string | null;
    avatarUrl: string | null;
  };
}

class SubscriptionsAPI {
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
   * Get current user's memberships
   */
  static async getMyMemberships(accessToken: string): Promise<Membership[]> {
    const response = await fetch(`${API_BASE_URL}/subscriptions/memberships/my`, {
      method: 'GET',
      headers: this.getAuthHeaders(accessToken),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || 'Failed to get memberships');
    }

    return this.parseResponse<Membership[]>(response);
  }

  /**
   * Get gym memberships (for gym owners/managers)
   */
  static async getGymMemberships(
    gymId: string,
    accessToken: string,
  ): Promise<Membership[]> {
    const response = await fetch(`${API_BASE_URL}/subscriptions/gyms/${gymId}/memberships`, {
      method: 'GET',
      headers: this.getAuthHeaders(accessToken),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || 'Failed to get gym memberships');
    }

    return this.parseResponse<Membership[]>(response);
  }
}

export default SubscriptionsAPI;
