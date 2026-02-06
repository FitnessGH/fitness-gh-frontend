'use client';

import { AuthAPI, type AuthResponse } from '@/lib/api/auth';
import { DataTransformer } from '@/lib/api/data-transformers';
import type { AuthUser, UserRole } from '@/lib/auth';
import { mapBackendUserTypeToRole } from '@/lib/auth';
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

  const buildAuthUser = useCallback((authResponse: AuthResponse): AuthUser => {
    return {
      id: authResponse.account.id,
      email: authResponse.account.email,
      name: `${authResponse.profile?.firstName || ''} ${authResponse.profile?.lastName || ''}`.trim() || authResponse.account.email,
      role: mapBackendUserTypeToRole(authResponse.account.userType),
      avatar: authResponse.profile?.firstName?.slice(0, 2).toUpperCase() || 'U',
      approvalStatus: authResponse.account.userType === 'GYM_OWNER' ? 'approved' : undefined,
      emailVerified: authResponse.account.emailVerified ?? true,
    };
  }, []);

  const login = useCallback(async (email: string, password: string) => {
    setIsLoading(true);
    try {
      const authResponse = await AuthAPI.login(email, password);

      if (!authResponse?.account) {
        throw new Error('Login failed: missing account data');
      }
      if (authResponse.account.emailVerified === false) {
        await AuthAPI.sendOTP(authResponse.account.email);
        const error = new Error('EMAIL_NOT_VERIFIED');
        (error as Error & { code?: string; email?: string }).code = 'EMAIL_NOT_VERIFIED';
        (error as Error & { code?: string; email?: string }).email = authResponse.account.email;
        throw error;
      }

      const authUser = buildAuthUser(authResponse);

      if (typeof window !== 'undefined' && authResponse.tokens) {
        localStorage.setItem('accessToken', authResponse.tokens.accessToken);
        localStorage.setItem('refreshToken', authResponse.tokens.refreshToken);
      }

      setUser(authUser);
      sessionStorage.setItem('user', JSON.stringify(authUser));
    } finally {
      setIsLoading(false);
    }
  }, [buildAuthUser]);

  const logout = useCallback(() => {
    setUser(null);
    sessionStorage.removeItem('user');
    if (typeof window !== 'undefined') {
      localStorage.removeItem('accessToken');
      localStorage.removeItem('refreshToken');
    }
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
        const authUser = buildAuthUser(authResponse);

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
    [buildAuthUser, setUser],
  );

  React.useEffect(() => {
    const hydrateUser = async () => {
      if (typeof window === 'undefined') {
        setIsLoading(false);
        return;
      }

      const accessToken = localStorage.getItem('accessToken');
      if (accessToken) {
        try {
          const authResponse = await AuthAPI.getMe(accessToken);
          const authUser = buildAuthUser(authResponse);
          setUser(authUser);
          sessionStorage.setItem('user', JSON.stringify(authUser));
          setIsLoading(false);
          return;
        } catch (error) {
          localStorage.removeItem('accessToken');
          localStorage.removeItem('refreshToken');
        }
      }

      const stored = sessionStorage.getItem('user');
      if (stored) {
        try {
          setUser(JSON.parse(stored));
        } catch (e) {
          sessionStorage.removeItem('user');
        }
      }

      setIsLoading(false);
    };

    void hydrateUser();
  }, [buildAuthUser]);

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
