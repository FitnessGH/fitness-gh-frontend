'use client';

import { useAuth } from '@/components/auth-context';
import { BebasFont } from '@/constant';
import { Button } from '@ui/button';
import { Progress } from '@ui/progress';
import {
  ArrowRight,
  CheckCircle2,
  Dumbbell,
  MapPin,
  Rocket,
  Settings,
  Sparkles,
  Users,
} from 'lucide-react';
import Link from 'next/link';

interface OnboardingItem {
  id: string;
  label: string;
  description: string;
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
      description: 'Add location, hours & contact info',
      icon: <MapPin className="w-5 h-5" />,
      path: '/gym-owner/settings',
      completed: !!user?.gymDetails?.location,
    },
    {
      id: 'amenities',
      label: 'Amenities',
      description: 'List equipment & facilities',
      icon: <Dumbbell className="w-5 h-5" />,
      path: '/gym-owner/settings',
      completed: !!user?.gymDetails?.amenities?.length,
    },
    {
      id: 'plans',
      label: 'Membership Plans',
      description: 'Set up pricing & packages',
      icon: <Settings className="w-5 h-5" />,
      path: '/gym-owner/settings',
      completed: !!user?.gymDetails?.plans?.length,
    },
    {
      id: 'employees',
      label: 'Team Members',
      description: 'Invite trainers & staff',
      icon: <Users className="w-5 h-5" />,
      path: '/gym-owner/employees',
      completed: !!user?.gymDetails?.employees?.length,
    },
  ];

  const completedCount = items.filter((item) => item.completed).length;
  const progressPercentage = (completedCount / items.length) * 100;
  const isComplete = completedCount === items.length;

  if (isComplete) {
    return null;
  }

  return (
    <div className="rounded-3xl border border-primary/30 bg-linear-to-br from-primary/10 via-card to-card p-6 mb-6">
      <div className="flex items-start justify-between gap-4 mb-6">
        <div className="flex items-center gap-3">
          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-primary/20">
            <Rocket className="h-6 w-6 text-primary" />
          </div>
          <div>
            <h3 className={`${BebasFont.className} text-2xl text-foreground`}>
              Complete Your Setup
            </h3>
            <p className="text-sm text-muted-foreground">
              {completedCount} of {items.length} steps done
            </p>
          </div>
        </div>
        <div className="text-right">
          <p className={`${BebasFont.className} text-3xl text-primary`}>
            {Math.round(progressPercentage)}%
          </p>
        </div>
      </div>

      <div className="mb-6">
        <Progress
          value={progressPercentage}
          className="h-2 bg-muted"
        />
      </div>

      <div className="grid gap-3 sm:grid-cols-2">
        {items.map((item, index) => (
          <Link
            key={item.id}
            href={item.path}
            className={`group relative flex items-center gap-4 rounded-2xl border p-4 transition-all ${
              item.completed
                ? 'border-green-500/30 bg-green-500/5'
                : 'border-border bg-background/50 hover:border-primary/50 hover:bg-primary/5'
            }`}
          >
            <div
              className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl ${
                item.completed
                  ? 'bg-green-500 text-white'
                  : 'bg-muted text-muted-foreground group-hover:bg-primary/20 group-hover:text-primary'
              }`}
            >
              {item.completed ? (
                <CheckCircle2 className="h-5 w-5" />
              ) : (
                item.icon
              )}
            </div>

            <div className="flex-1 min-w-0">
              <p
                className={`font-medium ${
                  item.completed
                    ? 'text-green-600 line-through'
                    : 'text-foreground'
                }`}
              >
                {item.label}
              </p>
              <p className="text-xs text-muted-foreground truncate">
                {item.description}
              </p>
            </div>

            {!item.completed && (
              <ArrowRight className="h-4 w-4 text-muted-foreground opacity-0 transition-opacity group-hover:opacity-100" />
            )}
          </Link>
        ))}
      </div>

      <div className="mt-6 flex items-center justify-between gap-4">
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <Sparkles className="h-4 w-4 text-primary" />
          <span>Complete setup to unlock all features</span>
        </div>
        <Link href="/gym-owner/settings">
          <Button className="bg-primary hover:bg-primary/90 gap-2">
            Continue Setup
            <ArrowRight className="h-4 w-4" />
          </Button>
        </Link>
      </div>
    </div>
  );
}
