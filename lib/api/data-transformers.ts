import type { RegistrationData } from './auth';

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

}
