'use client';

import { useAuth } from '@/components/auth-context';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { BebasFont } from '@/constant';
import { getDashboardPath } from '@/lib/auth';
import { Dumbbell, Eye, EyeOff, Sparkles, Users } from 'lucide-react';
import { useRouter } from 'next/navigation';
import type { FormEvent } from 'react';
import { useState } from 'react';

import Link from 'next/link';

interface SignupData {
  name: string;
  email: string;
  password: string;
}

interface ValidationErrors {
  name?: string;
  email?: string;
  password?: string;
}

export default function AthleteSignupPage() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [validationErrors, setValidationErrors] = useState<ValidationErrors>({});
  const [signupData, setSignupData] = useState<SignupData>({
    name: '',
    email: '',
    password: '',
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
        if (value.trim().length < 2) {
          return 'Name must be at least 2 characters';
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
        userType: 'athlete',
      });

      router.push('/customer');
    } catch (err: any) {
      setError(err.message || 'Failed to create account');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background text-foreground relative overflow-hidden">
      <div className="absolute -top-40 -left-40 h-96 w-96 rounded-full bg-primary/20 blur-3xl" />
      <div className="absolute top-32 -right-30 h-80 w-80 rounded-full bg-secondary/30 blur-3xl" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(50,176,176,0.18),transparent_55%)]" />

      <div className="relative z-10 mx-auto grid min-h-screen max-w-6xl items-center gap-12 px-6 py-12 lg:grid-cols-[1fr_1fr]">
        <div className="space-y-8 animate-in fade-in slide-in-from-bottom-6 duration-700">
          <div className="inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-4 py-2 text-xs uppercase tracking-[0.25em] text-primary">
            Member access
          </div>
          <div className="space-y-4">
            <h1 className={`text-5xl md:text-6xl`}>
              Join classes, track progress, and stay connected.
            </h1>
            <p className="text-lg text-muted-foreground">
              Your membership hub puts schedules, community updates, and
              marketplace perks in one place.
            </p>
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            {[
              ['Class reminders', 'Never miss a session again.'],
              ['Member perks', 'Unlock rewards and offers.'],
              ['Progress logs', 'Track workouts and streaks.'],
              ['Community groups', 'Find your training crew.'],
            ].map(([title, desc]) => (
              <div
                key={title}
                className="rounded-2xl border border-border bg-card/70 p-4"
              >
                <div className="flex items-center gap-2 text-primary">
                  <Users className="h-4 w-4" />
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
              <Dumbbell className="w-6 h-6" />
            </div>
            <h2 className={`${BebasFont.className} text-3xl`}>
              Create Member Account
            </h2>
            <p className="text-sm text-muted-foreground">
              Start your membership journey today.
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
                placeholder="Ama Mensah"
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
                placeholder="you@email.com"
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
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                  disabled={isLoading}
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
              className="w-full bg-primary hover:bg-primary/90 font-bold shadow-lg shadow-primary/20 cursor-pointer"
            >
              {isLoading ? 'Creating Account...' : 'Create Member Account'}
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

          <div className="mt-6 rounded-2xl border border-primary/30 bg-primary/10 p-4 text-xs text-muted-foreground">
            <div className="flex items-center gap-2 text-primary">
              <Sparkles className="h-4 w-4" />
              Member perks unlock after your first check-in.
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}
