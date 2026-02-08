'use client';

import { AuthAPI, type AuthResponse } from '@/lib/api/auth';
import { DataTransformer } from '@/lib/api/data-transformers';
import type { AuthUser, UserRole } from '@/lib/auth';
import { mapBackendUserTypeToRole } from '@/lib/auth';
import { tokenStorage } from '@/lib/utils/token-storage';
import React, { createContext, useCallback, useContext, useState } from 'react';

interface AuthContextType {
  user: AuthUser | null;
  userData: AuthResponse | null; // Full auth response with account, profile, tokens
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
  setUserFromAuthResponse: (authResponse: AuthResponse) => void;
  refreshUserData: () => Promise<void>; // Refresh user data from API
}

const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [userData, setUserData] = useState<AuthResponse | null>(null);
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

      if (authResponse.tokens) {
        tokenStorage.setTokens(
          authResponse.tokens.accessToken,
          authResponse.tokens.refreshToken,
        );
      }

      setUser(authUser);
      setUserData(authResponse);
      sessionStorage.setItem('user', JSON.stringify(authUser));
    } finally {
      setIsLoading(false);
    }
  }, [buildAuthUser]);

  const logout = useCallback(() => {
    setUser(null);
    setUserData(null);
    sessionStorage.removeItem('user');
    tokenStorage.clearTokens();
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
        if (authResponse.tokens) {
          tokenStorage.setTokens(
            authResponse.tokens.accessToken,
            authResponse.tokens.refreshToken,
          );
        }

        setUser(authUser);
        setUserData(authResponse);
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

  const setUserFromAuthResponse = useCallback((authResponse: AuthResponse) => {
    if (!authResponse?.account) {
      console.error('Invalid auth response:', authResponse);
      return;
    }

    const authUser = buildAuthUser(authResponse);

    // Store tokens if available
    if (authResponse.tokens) {
      tokenStorage.setTokens(
        authResponse.tokens.accessToken,
        authResponse.tokens.refreshToken,
      );
    }

    setUser(authUser);
    setUserData(authResponse);
    if (typeof window !== 'undefined') {
      sessionStorage.setItem('user', JSON.stringify(authUser));
    }
  }, [buildAuthUser]);

  const refreshUserData = useCallback(async () => {
    if (typeof window === 'undefined') return;

    const accessToken = tokenStorage.getAccessToken();
    if (!accessToken) return;

    try {
      const authResponse = await AuthAPI.getMe(accessToken);
      const authUser = buildAuthUser(authResponse);
      setUser(authUser);
      setUserData(authResponse);
      sessionStorage.setItem('user', JSON.stringify(authUser));
    } catch (error: any) {
      console.error('Failed to refresh user data:', error);
      
      // If access token expired, try to refresh it
      if (error?.message?.includes('Unauthorized') || error?.message?.includes('expired')) {
        const refreshToken = tokenStorage.getRefreshToken();
        if (refreshToken) {
          try {
            const newTokens = await AuthAPI.refreshToken(refreshToken);
            tokenStorage.setTokens(newTokens.accessToken, newTokens.refreshToken);
            
            // Retry getting user data with new token
            const authResponse = await AuthAPI.getMe(newTokens.accessToken);
            const authUser = buildAuthUser(authResponse);
            setUser(authUser);
            setUserData(authResponse);
            sessionStorage.setItem('user', JSON.stringify(authUser));
            return;
          } catch (refreshError) {
            console.error('Failed to refresh token:', refreshError);
            // Clear tokens if refresh fails
            tokenStorage.clearTokens();
            setUser(null);
            setUserData(null);
            sessionStorage.removeItem('user');
          }
        }
      }
    }
  }, [buildAuthUser]);

  React.useEffect(() => {
    const hydrateUser = async () => {
      if (typeof window === 'undefined') {
        setIsLoading(false);
        return;
      }

      const accessToken = tokenStorage.getAccessToken();
      if (accessToken) {
        try {
          const authResponse = await AuthAPI.getMe(accessToken);
          const authUser = buildAuthUser(authResponse);
          setUser(authUser);
          setUserData(authResponse);
          sessionStorage.setItem('user', JSON.stringify(authUser));
          setIsLoading(false);
          return;
        } catch (error: any) {
          console.error('Failed to hydrate user with access token:', error);
          
          // Try to refresh token if access token is invalid
          const refreshToken = tokenStorage.getRefreshToken();
          if (refreshToken) {
            try {
              const newTokens = await AuthAPI.refreshToken(refreshToken);
              tokenStorage.setTokens(newTokens.accessToken, newTokens.refreshToken);
              
              // Retry with new access token
              const authResponse = await AuthAPI.getMe(newTokens.accessToken);
              const authUser = buildAuthUser(authResponse);
              setUser(authUser);
              setUserData(authResponse);
              sessionStorage.setItem('user', JSON.stringify(authUser));
              setIsLoading(false);
              return;
            } catch (refreshError) {
              console.error('Failed to refresh token on hydration:', refreshError);
              tokenStorage.clearTokens();
            }
          } else {
            tokenStorage.clearTokens();
          }
        }
      }

      // Fallback to sessionStorage user data if available
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
        userData,
        isLoading,
        isAuthenticated: !!user,
        login,
        logout,
        switchRole,
        updateUser,
        signup,
        setUserFromAuthResponse,
        refreshUserData,
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
