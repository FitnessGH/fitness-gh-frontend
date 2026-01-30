'use client';

import { BebasFont } from '@/constant';
import { getDashboardPath } from '@/lib/auth';
import { Button } from '@ui/button';
import { Input } from '@ui/input';
import { Label } from '@ui/label';
import { AlertCircle, Dumbbell } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { useAuth } from './auth-context';

import Link from 'next/link';

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
      const stored = sessionStorage.getItem('user');
      const user = stored ? JSON.parse(stored) : null;
      router.push(getDashboardPath(user?.role || 'customer'));
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Login failed');
    }
  };

  return (
    <div className="space-y-6">
      <div className="text-center space-y-2">
        <div className="inline-flex items-center justify-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-4 py-2 text-xs uppercase tracking-[0.25em] text-primary">
          Sign in
        </div>
        <div className="flex items-center justify-center gap-2">
          <Dumbbell className="w-6 h-6 text-primary" />
          <h1 className={`${BebasFont.className} text-3xl tracking-wide`}>
            FitnessGH
          </h1>
        </div>
        <p className="text-sm text-muted-foreground">
          Welcome back. Your gym operations are one login away.
        </p>
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
            placeholder="name@gym.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            disabled={isLoading}
          />
        </div>

        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <Label htmlFor="password">Password</Label>
            <Link
              href="/support"
              className="text-xs text-muted-foreground hover:text-foreground"
            >
              Forgot password?
            </Link>
          </div>
          <Input
            id="password"
            type="password"
            placeholder="••••••••"
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

      <div className="flex flex-wrap items-center justify-between gap-2 text-xs text-muted-foreground">
        <span>New here?</span>
        <div className="flex flex-wrap gap-3">
          <Link
            href="/signup/customer"
            className="text-primary hover:text-primary/80"
          >
            Create Member Account
          </Link>
          <Link
            href="/signup/vendor"
            className="text-primary hover:text-primary/80"
          >
            Create Vendor Account
          </Link>
        </div>
      </div>

      <div className="rounded-2xl border border-border bg-background/70 p-4">
        <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground">
          Demo accounts
        </p>
        <div className="mt-3 space-y-2 text-xs text-muted-foreground font-mono">
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
  );
}
