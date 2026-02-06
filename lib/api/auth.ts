import { z } from 'zod';

// Base URL for API - should be in environment variables
const BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5001';
const API_BASE_URL = `${BASE_URL}/api/v1`;

// API response types
export interface AuthResponse {
  account: {
    id: string;
    email: string;
    phone?: string;
    userType: string;
    emailVerified?: boolean;
    isActive: boolean;
    lastLoginAt?: string;
    createdAt: string;
    updatedAt: string;
  };
  profile: {
    id: string;
    accountId: string;
    username: string;
    firstName?: string;
    lastName?: string;
    phone?: string;
    avatar?: string;
    bio?: string;
    dateOfBirth?: string;
    gender?: string;
    emergencyContactName?: string;
    emergencyContactPhone?: string;
    createdAt: string;
    updatedAt: string;
  } | null;
  tokens: {
    accessToken: string;
    refreshToken: string;
  } | null;
}

export interface OTPResponse {
  success: boolean;
  message: string;
}

// Registration data types for different user types
export interface BaseRegistrationData {
  email: string;
  password: string;
  username: string;
  firstName?: string;
  lastName?: string;
  phone?: string;
}

export interface GymOwnerRegistrationData extends BaseRegistrationData {
  userType: 'GYM_OWNER';
  gymName: string;
}

export interface CustomerRegistrationData extends BaseRegistrationData {
  userType: 'MEMBER';
}

export interface VendorRegistrationData extends BaseRegistrationData {
  userType: 'EMPLOYEE'; // Vendors might be employees in the system
  businessName: string;
}

export type RegistrationData = 
  | GymOwnerRegistrationData 
  | CustomerRegistrationData 
  | VendorRegistrationData;

// Frontend user types mapping
export type FrontendUserType = 'athlete' | 'vendor' | 'owner';

// Helper function to map frontend user types to backend user types
export const mapUserType = (frontendType: FrontendUserType): 'GYM_OWNER' | 'MEMBER' | 'EMPLOYEE' => {
  switch (frontendType) {
    case 'owner':
      return 'GYM_OWNER';
    case 'athlete':
      return 'MEMBER';
    case 'vendor':
      return 'EMPLOYEE';
    default:
      throw new Error(`Unknown user type: ${frontendType}`);
  }
};

// Validation schemas
export const baseRegistrationSchema = z.object({
  email: z.string().email('Invalid email address'),
  password: z.string()
    .min(8, 'Password must be at least 8 characters')
    .max(100, 'Password must not exceed 100 characters')
    .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/, 
      'Password must contain at least one uppercase letter, one lowercase letter, and one number'),
  username: z.string()
    .min(3, 'Username must be at least 3 characters')
    .max(50, 'Username must not exceed 50 characters')
    .regex(/^\w+$/, 'Username can only contain letters, numbers, and underscores'),
  firstName: z.string().min(1, 'First name cannot be empty').max(100, 'First name must not exceed 100 characters').optional(),
  lastName: z.string().min(1, 'Last name cannot be empty').max(100, 'Last name must not exceed 100 characters').optional(),
  phone: z.string().regex(/^\+?[\d\s-]+$/, 'Invalid phone number format').optional(),
});

export const gymOwnerRegistrationSchema = baseRegistrationSchema.extend({
  userType: z.literal('GYM_OWNER'),
  gymName: z.string().min(2, 'Gym name must be at least 2 characters').max(100, 'Gym name must not exceed 100 characters'),
});

export const customerRegistrationSchema = baseRegistrationSchema.extend({
  userType: z.literal('MEMBER'),
});

export const vendorRegistrationSchema = baseRegistrationSchema.extend({
  userType: z.literal('EMPLOYEE'),
  businessName: z.string().min(2, 'Business name must be at least 2 characters').max(100, 'Business name must not exceed 100 characters'),
});

// API class
export class AuthAPI {
  private static getHeaders() {
    return {
      'Content-Type': 'application/json',
    };
  }

  private static async parseResponse<T>(response: Response): Promise<T> {
    const result = await response.json();
    return (result?.data ?? result) as T;
  }

  static async sendOTP(email: string): Promise<OTPResponse> {
    const response = await fetch(`${API_BASE_URL}/auth/send-otp`, {
      method: 'POST',
      headers: this.getHeaders(),
      body: JSON.stringify({ email }),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || 'Failed to send OTP');
    }

    return this.parseResponse<OTPResponse>(response);
  }

  static async verifyOTP(email: string, otp: string): Promise<OTPResponse> {
    const response = await fetch(`${API_BASE_URL}/auth/verify-otp`, {
      method: 'POST',
      headers: this.getHeaders(),
      body: JSON.stringify({ email, otp }),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || 'Failed to verify OTP');
    }

    return this.parseResponse<OTPResponse>(response);
  }

  static async register(data: RegistrationData): Promise<AuthResponse> {
    const response = await fetch(`${API_BASE_URL}/auth/register`, {
      method: 'POST',
      headers: this.getHeaders(),
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || 'Registration failed');
    }

    return this.parseResponse<AuthResponse>(response);
  }

  static async login(email: string, password: string): Promise<AuthResponse> {
    const response = await fetch(`${API_BASE_URL}/auth/login`, {
      method: 'POST',
      headers: this.getHeaders(),
      body: JSON.stringify({ email, password }),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || 'Login failed');
    }

    return this.parseResponse<AuthResponse>(response);
  }

  static async refreshToken(refreshToken: string): Promise<{ accessToken: string; refreshToken: string }> {
    const response = await fetch(`${API_BASE_URL}/auth/refresh`, {
      method: 'POST',
      headers: this.getHeaders(),
      body: JSON.stringify({ refreshToken }),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || 'Token refresh failed');
    }

    return this.parseResponse<{ accessToken: string; refreshToken: string }>(response);
  }

  static async logout(refreshToken: string): Promise<void> {
    const response = await fetch(`${API_BASE_URL}/auth/logout`, {
      method: 'POST',
      headers: this.getHeaders(),
      body: JSON.stringify({ refreshToken }),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || 'Logout failed');
    }
  }

  static async getMe(accessToken: string): Promise<AuthResponse> {
    const response = await fetch(`${API_BASE_URL}/auth/me`, {
      method: 'GET',
      headers: {
        ...this.getHeaders(),
        'Authorization': `Bearer ${accessToken}`,
      },
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || 'Failed to get user profile');
    }

    return this.parseResponse<AuthResponse>(response);
  }

  static async changePassword(
    accessToken: string, 
    currentPassword: string, 
    newPassword: string
  ): Promise<void> {
    const response = await fetch(`${API_BASE_URL}/auth/change-password`, {
      method: 'POST',
      headers: {
        ...this.getHeaders(),
        'Authorization': `Bearer ${accessToken}`,
      },
      body: JSON.stringify({ currentPassword, newPassword }),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || 'Failed to change password');
    }
  }
}

// Validation helpers
export const validateRegistration = (data: RegistrationData) => {
  switch (data.userType) {
    case 'GYM_OWNER':
      return gymOwnerRegistrationSchema.parse(data);
    case 'MEMBER':
      return customerRegistrationSchema.parse(data);
    case 'EMPLOYEE':
      return vendorRegistrationSchema.parse(data);
    default:
      throw new Error('Invalid user type');
  }
};
