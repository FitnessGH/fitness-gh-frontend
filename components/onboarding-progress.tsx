'use client';

import { useAuth } from '@/components/auth-context';
import { Button } from '@ui/button';
import { Card } from '@ui/card';
import { Progress } from '@ui/progress';
import {
  ArrowRight,
  CheckCircle2,
  Clock,
  Dumbbell,
  MapPin,
  Settings,
  Users,
} from 'lucide-react';

import Link from 'next/link';

interface OnboardingItem {
  id: string;
  label: string;
  icon: React.ReactNode;
  path: string;
  completed: boolean;
}

export function OnboardingProgress() {
  const { user } = useAuth();

  const items: OnboardingItem[] = [
    {
      id: 'gym-info',
      label: 'Gym Details',
      icon: <MapPin className="w-4 h-4" />,
      path: '/gym-owner/settings',
      completed: !!user?.gymDetails?.location,
    },
    {
      id: 'amenities',
      label: 'Amenities',
      icon: <Dumbbell className="w-4 h-4" />,
      path: '/gym-owner/settings',
      completed: !!user?.gymDetails?.amenities?.length,
    },
    {
      id: 'plans',
      label: 'Membership Plans',
      icon: <Settings className="w-4 h-4" />,
      path: '/gym-owner/settings',
      completed: !!user?.gymDetails?.plans?.length,
    },
    {
      id: 'employees',
      label: 'Team Members',
      icon: <Users className="w-4 h-4" />,
      path: '/gym-owner/employees',
      completed: !!user?.gymDetails?.employees?.length,
    },
  ];

  const completedCount = items.filter((item) => item.completed).length;
  const progressPercentage = (completedCount / items.length) * 100;

  return (
    <Card className="p-6 bg-linear-to-br from-primary/5 to-primary/10 border-primary/20 rounded-2xl">
      <div className="space-y-6">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <Clock className="w-4 h-4 text-primary" />
            <h3 className="font-semibold text-foreground">Setup Progress</h3>
          </div>
          <p className="text-sm text-muted-foreground">
            {completedCount} of {items.length} steps completed
          </p>
        </div>

        <div className="space-y-2">
          <Progress
            value={progressPercentage}
            className="h-2"
          />
          <p className="text-xs text-muted-foreground text-right">
            {Math.round(progressPercentage)}% Complete
          </p>
        </div>

        <div className="space-y-3">
          {items.map((item) => (
            <div
              key={item.id}
              className={`flex items-center gap-3 p-3 rounded-lg transition-colors ${
                item.completed
                  ? 'bg-green-500/10 border border-green-500/20'
                  : 'bg-background/40 border border-border/50'
              }`}
            >
              <div
                className={`w-5 h-5 rounded-full flex items-center justify-center shrink-0 ${
                  item.completed
                    ? 'bg-green-500 text-white'
                    : 'bg-muted text-muted-foreground'
                }`}
              >
                {item.completed ? (
                  <CheckCircle2 className="w-3 h-3" />
                ) : (
                  item.icon
                )}
              </div>
              <span
                className={`text-sm flex-1 ${
                  item.completed
                    ? 'text-foreground font-medium line-through opacity-60'
                    : 'text-foreground'
                }`}
              >
                {item.label}
              </span>
              {!item.completed && (
                <Link href={item.path}>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="h-7 gap-1 px-2"
                  >
                    <span className="text-xs">Complete</span>
                    <ArrowRight className="w-3 h-3" />
                  </Button>
                </Link>
              )}
            </div>
          ))}
        </div>

        {completedCount === items.length && (
          <div className="p-4 rounded-lg bg-green-500/10 border border-green-500/30 text-center">
            <p className="text-sm font-semibold text-green-600">
              🎉 Setup Complete! Your gym is all set up.
            </p>
          </div>
        )}

        {completedCount < items.length && (
          <Link
            href="/gym-owner/settings"
            className="block"
          >
            <Button className="w-full bg-primary hover:bg-primary/90 gap-2">
              <span>Continue Setup</span>
              <ArrowRight className="w-4 h-4" />
            </Button>
          </Link>
        )}
      </div>
    </Card>
  );
}
