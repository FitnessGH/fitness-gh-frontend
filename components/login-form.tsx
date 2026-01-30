'use client';

import { Button } from '@ui/button';
import { Card } from '@ui/card';
import { Input } from '@ui/input';
import { Label } from '@ui/label';
import { AlertCircle, Dumbbell } from 'lucide-react';
import { useRouter } from 'next/navigation';
import type React from 'react';
import { useState } from 'react';
import { useAuth } from './auth-context';

export function LoginForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const router = useRouter();
  const { login, isLoading } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    try {
      await login(email, password);
      router.push('/dashboard');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Login failed');
    }
  };

  return (
    <Card className="w-full max-w-md border-0 shadow-lg">
      <div className="p-8">
        <div className="mb-8 text-center">
          <div className="flex items-center justify-center gap-2 mb-2">
            <Dumbbell className="w-6 h-6 text-primary" />
            <h1 className="text-2xl font-bold text-primary">FitnessGH</h1>
          </div>
          <p className="text-muted-foreground">Gym Management Platform</p>
        </div>

        <form
          onSubmit={handleSubmit}
          className="space-y-4"
        >
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              disabled={isLoading}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="password">Password</Label>
            <Input
              id="password"
              type="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              disabled={isLoading}
            />
          </div>

          {error && (
            <div className="flex items-center gap-2 text-destructive text-sm bg-destructive/10 p-3 rounded-md">
              <AlertCircle className="w-4 h-4" />
              <span>{error}</span>
            </div>
          )}

          <Button
            type="submit"
            className="w-full bg-primary hover:bg-primary/90"
            disabled={isLoading}
          >
            {isLoading ? 'Signing in...' : 'Sign In'}
          </Button>
        </form>

        <div className="mt-6 pt-6 border-t border-border">
          <p className="text-sm text-muted-foreground mb-3">Demo Accounts:</p>
          <div className="space-y-2 text-xs text-muted-foreground font-mono">
            <p>
              <span className="text-primary">Gym Owner:</span> owner@fitclub.com
            </p>
            <p>
              <span className="text-primary">Athlete:</span> member@email.com
            </p>
            <p>
              <span className="text-primary">Vendor:</span> vendor@shop.com
            </p>
            <p>
              <span className="text-primary">Admin:</span> admin@fitclub.com
            </p>
          </div>
          <p className="text-xs text-muted-foreground mt-3">
            Password: any value works
          </p>
        </div>
      </div>
    </Card>
  );
}
