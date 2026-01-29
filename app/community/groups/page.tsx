'use client';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Lock, Plus, Users } from 'lucide-react';

interface Group {
  id: string;
  name: string;
  description: string;
  members: number;
  posts: number;
  icon: string;
  isPrivate: boolean;
  isMember: boolean;
}

const mockGroups: Group[] = [
  {
    id: '1',
    name: 'General Discussion',
    description: 'Share thoughts, ideas, and general fitness discussion',
    members: 234,
    posts: 456,
    icon: '💬',
    isPrivate: false,
    isMember: true,
  },
  {
    id: '2',
    name: 'Workout Tips',
    description: 'Share workout routines, exercises, and training advice',
    members: 189,
    posts: 234,
    icon: '💪',
    isPrivate: false,
    isMember: true,
  },
  {
    id: '3',
    name: 'Nutrition & Diet',
    description: 'Discuss nutrition, meal plans, and healthy eating',
    members: 156,
    posts: 178,
    icon: '🥗',
    isPrivate: false,
    isMember: false,
  },
  {
    id: '4',
    name: 'Accountability Partners',
    description: 'Find your fitness buddy and stay motivated together',
    members: 98,
    posts: 145,
    icon: '🤝',
    isPrivate: true,
    isMember: true,
  },
  {
    id: '5',
    name: 'Weight Loss Journey',
    description: 'Support group for members working on weight loss goals',
    members: 203,
    posts: 567,
    icon: '⚖️',
    isPrivate: false,
    isMember: false,
  },
  {
    id: '6',
    name: 'Strength Training',
    description: 'Advanced strength training tips and progress tracking',
    members: 142,
    posts: 234,
    icon: '🏋️',
    isPrivate: false,
    isMember: false,
  },
];

export default function GroupsPage() {
  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">
            Community Groups
          </h1>
          <p className="text-muted-foreground">
            Browse and join community groups
          </p>
        </div>
        <Button className="bg-primary hover:bg-primary/90 gap-2">
          <Plus className="w-4 h-4" />
          Create Group
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {mockGroups.map((group) => (
          <Card
            key={group.id}
            className="p-6 border-border/50 hover:border-primary/50 transition-colors cursor-pointer"
          >
            <div className="flex items-start justify-between mb-3">
              <div className="text-3xl">{group.icon}</div>
              {group.isPrivate && (
                <Badge className="bg-blue-100 text-blue-700 flex items-center gap-1">
                  <Lock className="w-3 h-3" />
                  Private
                </Badge>
              )}
            </div>

            <h3 className="font-semibold text-foreground mb-2 text-lg">
              {group.name}
            </h3>
            <p className="text-sm text-muted-foreground mb-4">
              {group.description}
            </p>

            <div className="flex items-center gap-4 text-sm text-muted-foreground mb-4 pt-4 border-t border-border">
              <div className="flex items-center gap-1">
                <Users className="w-4 h-4" />
                <span>{group.members} members</span>
              </div>
              <div className="flex items-center gap-1">
                <span>{group.posts} posts</span>
              </div>
            </div>

            <Button
              className={
                group.isMember
                  ? 'w-full bg-primary/20 text-primary'
                  : 'w-full bg-primary hover:bg-primary/90'
              }
            >
              {group.isMember ? 'Joined' : 'Join Group'}
            </Button>
          </Card>
        ))}
      </div>
    </div>
  );
}
