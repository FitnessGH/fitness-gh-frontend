import type { RegistrationData, FrontendUserType } from './auth';
import { mapUserType } from './auth';

// Transform frontend data to backend format
export class DataTransformer {
  
  // Transform gym owner signup data
  static transformGymOwnerData(frontendData: {
    name: string;
    email: string;
    password: string;
    gymName: string;
  }): RegistrationData {
    const nameParts = frontendData.name.trim().split(' ');
    const firstName = nameParts[0] || '';
    const lastName = nameParts.slice(1).join(' ') || undefined;
    
    // Generate username from name and email
    const baseUsername = firstName.toLowerCase().replace(/[^a-z0-9]/g, '');
    const emailPrefix = frontendData.email.split('@')[0];
    const username = `${baseUsername}_${emailPrefix}_${Date.now()}`.slice(0, 50);

    return {
      email: frontendData.email,
      password: frontendData.password,
      username,
      firstName: firstName || undefined,
      lastName: lastName || undefined,
      userType: 'GYM_OWNER',
      gymName: frontendData.gymName,
    };
  }

  // Transform customer signup data
  static transformCustomerData(frontendData: {
    name: string;
    email: string;
    password: string;
  }): RegistrationData {
    const nameParts = frontendData.name.trim().split(' ');
    const firstName = nameParts[0] || '';
    const lastName = nameParts.slice(1).join(' ') || undefined;
    
    // Generate username
    const baseUsername = firstName.toLowerCase().replace(/[^a-z0-9]/g, '');
    const emailPrefix = frontendData.email.split('@')[0];
    const username = `${baseUsername}_${emailPrefix}_${Date.now()}`.slice(0, 50);

    return {
      email: frontendData.email,
      password: frontendData.password,
      username,
      firstName: firstName || undefined,
      lastName: lastName || undefined,
      userType: 'MEMBER',
    };
  }

  // Transform vendor signup data
  static transformVendorData(frontendData: {
    name: string;
    email: string;
    password: string;
    businessName: string;
  }): RegistrationData {
    const nameParts = frontendData.name.trim().split(' ');
    const firstName = nameParts[0] || '';
    const lastName = nameParts.slice(1).join(' ') || undefined;
    
    // Generate username
    const baseUsername = firstName.toLowerCase().replace(/[^a-z0-9]/g, '');
    const emailPrefix = frontendData.email.split('@')[0];
    const username = `${baseUsername}_${emailPrefix}_${Date.now()}`.slice(0, 50);

    return {
      email: frontendData.email,
      password: frontendData.password,
      username,
      firstName: firstName || undefined,
      lastName: lastName || undefined,
      userType: 'EMPLOYEE', // Vendors are treated as employees in the system
      businessName: frontendData.businessName,
    };
  }

  // Generate a unique username
  static generateUsername(firstName: string, email: string): string {
    const baseUsername = firstName.toLowerCase().replace(/[^a-z0-9]/g, '');
    const emailPrefix = email.split('@')[0];
    const timestamp = Date.now();
    return `${baseUsername}_${emailPrefix}_${timestamp}`.slice(0, 50);
  }

  // Validate password complexity
  static validatePassword(password: string): { isValid: boolean; errors: string[] } {
    const errors: string[] = [];
    
    if (password.length < 8) {
      errors.push('Password must be at least 8 characters');
    }
    
    if (password.length > 100) {
      errors.push('Password must not exceed 100 characters');
    }
    
    if (!/(?=.*[a-z])/.test(password)) {
      errors.push('Password must contain at least one lowercase letter');
    }
    
    if (!/(?=.*[A-Z])/.test(password)) {
      errors.push('Password must contain at least one uppercase letter');
    }
    
    if (!/(?=.*\d)/.test(password)) {
      errors.push('Password must contain at least one number');
    }
    
    return {
      isValid: errors.length === 0,
      errors
    };
  }

  // Validate email format
  static validateEmail(email: string): boolean {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }

  // Validate username format
  static validateUsername(username: string): { isValid: boolean; errors: string[] } {
    const errors: string[] = [];
    
    if (username.length < 3) {
      errors.push('Username must be at least 3 characters');
    }
    
    if (username.length > 50) {
      errors.push('Username must not exceed 50 characters');
    }
    
    if (!/^\w+$/.test(username)) {
      errors.push('Username can only contain letters, numbers, and underscores');
    }
    
    return {
      isValid: errors.length === 0,
      errors
    };
  }
}
