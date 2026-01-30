'use client';

import { useAuth } from '@/components/auth-context';
import { Button } from '@ui/button';
import { Card } from '@ui/card';
import { CheckCircle2, Clock, LogOut } from 'lucide-react';

export default function ApprovalPendingPage() {
  const { user, logout } = useAuth();

  return (
    <div className="min-h-screen bg-linear-to-br from-background to-secondary/10 flex items-center justify-center p-6">
      <Card className="max-w-md w-full p-8 text-center space-y-6 border-0 shadow-2xl">
        <div className="flex justify-center">
          <div className="relative">
            <div className="w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center animate-pulse">
              <Clock className="w-10 h-10 text-primary" />
            </div>
            <div className="absolute -bottom-1 -right-1 bg-background rounded-full p-1 border-2 border-primary/20">
              <div className="w-4 h-4 rounded-full bg-yellow-500 animate-ping" />
            </div>
          </div>
        </div>

        <div className="space-y-2">
          <h1 className="text-3xl font-bold tracking-tight">
            Approval in Progress
          </h1>
          <p className="text-muted-foreground">
            Thanks for submitting your gym details,{' '}
            <strong>{user?.name}</strong>! Our admins are currently reviewing
            your application.
          </p>
        </div>

        <div className="bg-muted/50 rounded-xl p-4 text-left space-y-3">
          <div className="flex items-start gap-3">
            <CheckCircle2 className="w-5 h-5 text-green-500 mt-0.5" />
            <div>
              <p className="text-sm font-semibold">Account Created</p>
              <p className="text-xs text-muted-foreground">
                Successfully registered as a gym owner
              </p>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <CheckCircle2 className="w-5 h-5 text-green-500 mt-0.5" />
            <div>
              <p className="text-sm font-semibold">Gym Details Submitted</p>
              <p className="text-xs text-muted-foreground">
                Wait for our team to verify your business license
              </p>
            </div>
          </div>
          <div className="flex items-start gap-3 opacity-50">
            <div className="w-5 h-5 flex items-center justify-center">
              <div className="w-2 h-2 rounded-full bg-primary" />
            </div>
            <div>
              <p className="text-sm font-semibold">Admin Approval</p>
              <p className="text-xs text-muted-foreground">
                You will gain access to the dashboard once approved
              </p>
            </div>
          </div>
        </div>

        <div className="pt-4 space-y-3">
          <p className="text-xs text-muted-foreground">
            Typically takes 24-48 hours. We'll notify you via email.
          </p>
          <div className="flex flex-col gap-2">
            <Button
              variant="outline"
              onClick={() => logout()}
              className="w-full gap-2"
            >
              <LogOut className="w-4 h-4" /> Sign Out
            </Button>
          </div>
        </div>
      </Card>
    </div>
  );
}
