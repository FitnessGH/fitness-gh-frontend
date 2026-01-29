'use client';

import { useAuth } from '@/components/auth-context';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { ArrowLeft, Dumbbell } from 'lucide-react';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';

interface SignupData {
  name: string;
  email: string;
  password: string;
  gymName: string;
}

export default function ApplyPage() {
  const router = useRouter();
  const { signup } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [signupData, setSignupData] = useState<SignupData>({
    name: '',
    email: '',
    password: '',
    gymName: '',
  });

  const handleChange = (field: keyof SignupData, value: string) => {
    setSignupData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      if (
        !signupData.name ||
        !signupData.email ||
        !signupData.password ||
        !signupData.gymName
      ) {
        throw new Error('Please fill in all fields');
      }

      if (signupData.password.length < 6) {
        throw new Error('Password must be at least 6 characters');
      }

      await signup({
        name: signupData.name,
        email: signupData.email,
        role: 'gym_owner',
      });

      router.push('/gym-owner');
    } catch (err: any) {
      setError(err.message || 'Failed to create account');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-linear-to-br from-background via-secondary/5 to-background p-6 flex items-center justify-center">
      <div className="max-w-md w-full">
        <div className="mb-8">
          <Button
            variant="ghost"
            onClick={() => router.push('/')}
            className="text-muted-foreground hover:text-foreground"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Home
          </Button>
        </div>

        <Card className="p-8 border-border bg-card/50 backdrop-blur-sm shadow-2xl">
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-primary/10 text-primary mb-4">
              <Dumbbell className="w-6 h-6" />
            </div>
            <h1 className="text-3xl font-bold text-foreground mb-2">
              Join <span className="text-primary">FitnessGH</span>
            </h1>
            <p className="text-muted-foreground">
              Create your gym account and start managing your business
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
                placeholder="John Doe"
                value={signupData.name}
                onChange={(e) => handleChange('name', e.target.value)}
                disabled={isLoading}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="email">Email Address</Label>
              <Input
                id="email"
                type="email"
                placeholder="john@example.com"
                value={signupData.email}
                onChange={(e) => handleChange('email', e.target.value)}
                disabled={isLoading}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="gymName">Gym Name</Label>
              <Input
                id="gymName"
                placeholder="Legacy Fitness"
                value={signupData.gymName}
                onChange={(e) => handleChange('gymName', e.target.value)}
                disabled={isLoading}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                placeholder="••••••••"
                value={signupData.password}
                onChange={(e) => handleChange('password', e.target.value)}
                disabled={isLoading}
              />
              <p className="text-xs text-muted-foreground">
                At least 6 characters
              </p>
            </div>

            <Button
              type="submit"
              disabled={isLoading}
              className="w-full bg-primary hover:bg-primary/90 font-bold shadow-lg shadow-primary/20"
            >
              {isLoading
                ? 'Creating Account...'
                : 'Create Account & Access Dashboard'}
            </Button>

            <p className="text-xs text-center text-muted-foreground">
              By signing up, you agree to our Terms of Service
            </p>
          </form>
        </Card>

        <div className="mt-8 p-6 rounded-lg bg-secondary/20 border border-border/50">
          <h3 className="font-semibold text-foreground mb-3">What's Next?</h3>
          <ul className="space-y-2 text-sm text-muted-foreground">
            <li className="flex gap-2">
              <span className="text-primary font-bold">✓</span>
              <span>Get instant dashboard access</span>
            </li>
            <li className="flex gap-2">
              <span className="text-primary font-bold">✓</span>
              <span>Complete setup at your own pace</span>
            </li>
            <li className="flex gap-2">
              <span className="text-primary font-bold">✓</span>
              <span>Start exploring features immediately</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
