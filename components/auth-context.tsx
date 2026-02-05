'use client';

import { AuthAPI, type AuthResponse } from '@/lib/api/auth';
import { DataTransformer } from '@/lib/api/data-transformers';
import type { AuthUser, UserRole } from '@/lib/auth';
import { registerUser, validateCredentials } from '@/lib/auth';
import React, { createContext, useCallback, useContext, useState } from 'react';

interface AuthContextType {
  user: AuthUser | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  switchRole: (role: UserRole) => void;
  updateUser: (updates: Partial<AuthUser>) => void;
  signup: (data: {
    name: string;
    email: string;
    password: string;
    userType: 'athlete' | 'vendor' | 'owner';
    gymName?: string;
    businessName?: string;
  }) => Promise<AuthUser>;
}

const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const login = useCallback(async (email: string, password: string) => {
    setIsLoading(true);
    try {
      await new Promise((resolve) => setTimeout(resolve, 500));

      const authUser = validateCredentials(email, password);
      if (!authUser) {
        throw new Error('Invalid credentials');
      }

      setUser(authUser);
      sessionStorage.setItem('user', JSON.stringify(authUser));
    } finally {
      setIsLoading(false);
    }
  }, []);

  const logout = useCallback(() => {
    setUser(null);
    sessionStorage.removeItem('user');
  }, []);

  const switchRole = useCallback(
    (role: UserRole) => {
      if (user) {
        const updatedUser = { ...user, role };
        setUser(updatedUser);
        sessionStorage.setItem('user', JSON.stringify(updatedUser));
      }
    },
    [user],
  );

  const updateUser = useCallback(
    (updates: Partial<AuthUser>) => {
      if (user) {
        const updatedUser = { ...user, ...updates };
        setUser(updatedUser);
      }
    },
    [user],
  );

  const signup = useCallback(
    async (data: {
      name: string;
      email: string;
      password: string;
      userType: 'athlete' | 'vendor' | 'owner';
      gymName?: string;
      businessName?: string;
    }) => {
      setIsLoading(true);
      try {
        // Transform data based on user type
        let registrationData;
        switch (data.userType) {
          case 'owner':
            registrationData = DataTransformer.transformGymOwnerData({
              name: data.name,
              email: data.email,
              password: data.password,
              gymName: data.gymName || '',
            });
            break;
          case 'athlete':
            registrationData = DataTransformer.transformCustomerData({
              name: data.name,
              email: data.email,
              password: data.password,
            });
            break;
          case 'vendor':
            registrationData = DataTransformer.transformVendorData({
              name: data.name,
              email: data.email,
              password: data.password,
              businessName: data.businessName || '',
            });
            break;
          default:
            throw new Error('Invalid user type');
        }

        // Call real API
        const authResponse = await AuthAPI.register(registrationData);

        if (!authResponse?.account) {
          console.error('Signup response missing account:', authResponse);
          throw new Error('Signup failed: missing account data');
        }

        // Transform response to match frontend AuthUser format
        const authUser: AuthUser = {
          id: authResponse.account.id,
          email: authResponse.account.email,
          name: `${authResponse.profile?.firstName || ''} ${authResponse.profile?.lastName || ''}`.trim(),
          role: authResponse.account.userType.toLowerCase() as UserRole,
          avatar: authResponse.profile?.firstName?.slice(0, 2).toUpperCase() || 'U',
          approvalStatus: authResponse.account.userType === 'GYM_OWNER' ? 'approved' : undefined,
        };

        // Store tokens only if issued (email verified)
        if (typeof window !== 'undefined' && authResponse.tokens) {
          localStorage.setItem('accessToken', authResponse.tokens.accessToken);
          localStorage.setItem('refreshToken', authResponse.tokens.refreshToken);
        }

        setUser(authUser);
        if (typeof window !== 'undefined') {
          sessionStorage.setItem('user', JSON.stringify(authUser));
        }
        
        return authUser;
      } catch (error) {
        console.error('Signup error:', error);
        throw error;
      } finally {
        setIsLoading(false);
      }
    },
    [setUser],
  );

  React.useEffect(() => {
    const stored = sessionStorage.getItem('user');
    if (stored) {
      try {
        setUser(JSON.parse(stored));
      } catch (e) {
        sessionStorage.removeItem('user');
      }
    }
    setIsLoading(false);
  }, []);

  return (
    <AuthContext.Provider
      value={{
        user,
        isLoading,
        isAuthenticated: !!user,
        login,
        logout,
        switchRole,
        updateUser,
        signup,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return context;
}
