'use client';

import { useAuth } from '@/components/auth-context';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { BebasFont } from '@/constant';
import { getDashboardPath } from '@/lib/auth';
import { Package, ShieldCheck, ShoppingBag, Eye, EyeOff } from 'lucide-react';
import { useRouter } from 'next/navigation';
import type { FormEvent } from 'react';
import { useState } from 'react';

import Link from 'next/link';

interface SignupData {
  name: string;
  email: string;
  password: string;
  businessName: string;
}

interface ValidationErrors {
  name?: string;
  email?: string;
  password?: string;
  businessName?: string;
}

export default function VendorSignupPage() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [validationErrors, setValidationErrors] = useState<ValidationErrors>({});
  const [signupData, setSignupData] = useState<SignupData>({
    name: '',
    email: '',
    password: '',
    businessName: '',
  });

  const router = useRouter();
  const { signup } = useAuth();

  const validateField = (field: keyof SignupData, value: string): string => {
    if (!value || value.trim() === '') {
      return `${field.charAt(0).toUpperCase() + field.slice(1)} is required`;
    }

    switch (field) {
      case 'email':
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(value)) {
          return 'Please enter a valid email address';
        }
        break;
      case 'password':
        const passwordValidation = {
          length: value.length >= 8,
          hasUpper: /[A-Z]/.test(value),
          hasLower: /[a-z]/.test(value),
          hasNumber: /\d/.test(value),
        };

        if (value.length < 8) {
          return 'Password must be at least 8 characters';
        }
        if (!passwordValidation.hasUpper) {
          return 'Password must contain at least one uppercase letter';
        }
        if (!passwordValidation.hasLower) {
          return 'Password must contain at least one lowercase letter';
        }
        if (!passwordValidation.hasNumber) {
          return 'Password must contain at least one number';
        }
        break;
      case 'name':
      case 'businessName':
        if (value.trim().length < 2) {
          return `${field === 'name' ? 'Name' : 'Business name'} must be at least 2 characters`;
        }
        break;
    }

    return '';
  };

  const handleChange = (field: keyof SignupData, value: string) => {
    setSignupData((prev) => ({ ...prev, [field]: value }));
    
    // Validate field in real-time
    const errorMessage = validateField(field, value);
    setValidationErrors((prev) => ({
      ...prev,
      [field]: errorMessage || undefined,
    }));
    
    // Clear general error when user starts typing
    if (error) {
      setError('');
    }
  };

  const handleSignup = async (e: FormEvent) => {
    e.preventDefault();
    setError('');
    
    // Validate all fields
    const errors: ValidationErrors = {};
    Object.keys(signupData).forEach((field) => {
      const errorMessage = validateField(field as keyof SignupData, signupData[field as keyof SignupData]);
      if (errorMessage) {
        errors[field as keyof ValidationErrors] = errorMessage;
      }
    });
    
    setValidationErrors(errors);
    
    // Check if there are any validation errors
    if (Object.keys(errors).length > 0) {
      return;
    }
    
    setIsLoading(true);

    try {
      await signup({
        name: signupData.name,
        email: signupData.email,
        password: signupData.password,
        userType: 'vendor',
        businessName: signupData.businessName,
      });

      router.push('/vendor');
    } catch (err: any) {
      setError(err.message || 'Failed to create account');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background text-foreground relative overflow-hidden">
      <div className="absolute -top-40 -right-30 h-96 w-96 rounded-full bg-primary/20 blur-3xl" />
      <div className="absolute top-24 -left-20 h-72 w-72 rounded-full bg-secondary/30 blur-3xl" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(50,176,176,0.18),transparent_55%)]" />

      <div className="relative z-10 mx-auto grid min-h-screen max-w-6xl items-center gap-12 px-6 py-12 lg:grid-cols-[1fr_1fr]">
        <div className="space-y-8 animate-in fade-in slide-in-from-bottom-6 duration-700">
          <div className="inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-4 py-2 text-xs uppercase tracking-[0.25em] text-primary">
            Vendor access
          </div>
          <div className="space-y-4">
            <h1 className={`text-5xl md:text-6xl`}>
              Stock your products inside the gyms that need them.
            </h1>
            <p className="text-lg text-muted-foreground">
              List inventory, track orders, and reach members without managing
              multiple storefronts.
            </p>
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            {[
              ['Vendor storefront', 'Launch a branded listing hub.'],
              ['Order tracking', 'Manage fulfillment in one view.'],
              ['Gym partnerships', 'Connect to active gyms.'],
              ['Payout insights', 'See revenue by product.'],
            ].map(([title, desc]) => (
              <div
                key={title}
                className="rounded-2xl border border-border bg-card/70 p-4"
              >
                <div className="flex items-center gap-2 text-primary">
                  <Package className="h-4 w-4" />
                  <p className="text-sm font-semibold">{title}</p>
                </div>
                <p className="text-xs text-muted-foreground mt-2">{desc}</p>
              </div>
            ))}
          </div>
        </div>

        <Card className="p-8 border-border bg-card/70 backdrop-blur-sm shadow-2xl shadow-primary/10 animate-in fade-in slide-in-from-bottom-8 duration-700 delay-150">
          <div className="text-center mb-8 space-y-2">
            <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-primary/10 text-primary">
              <ShoppingBag className="w-6 h-6" />
            </div>
            <h2 className={`${BebasFont.className} text-3xl`}>
              Create Vendor Account
            </h2>
            <p className="text-sm text-muted-foreground">
              Start listing products for gyms and members.
            </p>
          </div>

          <form
            onSubmit={handleSignup}
            className="space-y-4"
          >
            {error && (
              <div className="p-3 rounded-lg bg-red-500/10 border border-red-500/30 text-red-500 text-sm">
                {error}
              </div>
            )}

            <div className="space-y-2">
              <Label htmlFor="name">Full Name</Label>
              <Input
                id="name"
                placeholder="Kojo Asare"
                value={signupData.name}
                onChange={(e) => handleChange('name', e.target.value)}
                disabled={isLoading}
                className={validationErrors.name ? 'border-red-500' : ''}
              />
              {validationErrors.name && (
                <p className="text-xs text-red-500">{validationErrors.name}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="email">Email Address</Label>
              <Input
                id="email"
                type="email"
                placeholder="vendor@shop.com"
                value={signupData.email}
                onChange={(e) => handleChange('email', e.target.value)}
                disabled={isLoading}
                className={validationErrors.email ? 'border-red-500' : ''}
              />
              {validationErrors.email && (
                <p className="text-xs text-red-500">{validationErrors.email}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="businessName">Business Name</Label>
              <Input
                id="businessName"
                placeholder="Elite Supplements"
                value={signupData.businessName}
                onChange={(e) => handleChange('businessName', e.target.value)}
                disabled={isLoading}
                className={validationErrors.businessName ? 'border-red-500' : ''}
              />
              {validationErrors.businessName && (
                <p className="text-xs text-red-500">{validationErrors.businessName}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <div className="relative">
                <Input
                  id="password"
                  type={showPassword ? 'text' : 'password'}
                  placeholder="••••••••"
                  value={signupData.password}
                  onChange={(e) => handleChange('password', e.target.value)}
                  disabled={isLoading}
                  className={`pr-10 ${validationErrors.password ? 'border-red-500' : ''}`}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                  disabled={isLoading}
                  aria-label={showPassword ? 'Hide password' : 'Show password'}
                >
                  {showPassword ? (
                    <EyeOff className="w-4 h-4" />
                  ) : (
                    <Eye className="w-4 h-4" />
                  )}
                </button>
              </div>
              {validationErrors.password && (
                <p className="text-xs text-red-500">{validationErrors.password}</p>
              )}
              <p className="text-xs text-muted-foreground">
                At least 8 characters with uppercase, lowercase, and number
              </p>
            </div>

            <Button
              type="submit"
              disabled={isLoading}
              className="w-full bg-primary hover:bg-primary/90 font-bold shadow-lg shadow-primary/20"
            >
              {isLoading ? 'Creating Account...' : 'Create Vendor Account'}
            </Button>

            <p className="text-xs text-center text-muted-foreground">
              By signing up, you agree to our Terms of Service
            </p>
          </form>

          <div className="mt-6 flex items-center justify-between text-xs text-muted-foreground">
            <span>Already have access?</span>
            <Link
              href="/login"
              className="text-primary hover:text-primary/80"
            >
              Sign in
            </Link>
          </div>

          <div className="mt-6 rounded-2xl border border-border bg-background/70 p-4 text-xs text-muted-foreground">
            <div className="flex items-center gap-2 text-primary">
              <ShieldCheck className="h-4 w-4" />
              Payouts are verified after your first order.
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}
