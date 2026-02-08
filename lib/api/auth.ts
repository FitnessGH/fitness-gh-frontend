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

  static async verifyOTP(email: string, otp: string): Promise<AuthResponse> {
    const response = await fetch(`${API_BASE_URL}/auth/verify-otp`, {
      method: 'POST',
      headers: this.getHeaders(),
      body: JSON.stringify({ email, otp }),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || 'Failed to verify OTP');
    }

    return this.parseResponse<AuthResponse>(response);
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

}

