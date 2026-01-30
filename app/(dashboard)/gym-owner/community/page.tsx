'use client';

import { Button } from '@ui/button';
import { Card } from '@ui/card';
import { Input } from '@ui/input';
import { MessageCircle, Plus, Users } from 'lucide-react';

export default function CommunityPage() {
  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Community</h1>
          <p className="text-muted-foreground">
            Manage your gym community and groups
          </p>
        </div>
        <Button className="bg-primary hover:bg-primary/90 gap-2">
          <Plus className="w-4 h-4" />
          Create Group
        </Button>
      </div>

      <div className="relative">
        <Input
          placeholder="Search groups..."
          className="pl-10"
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {[
          {
            name: 'General Discussion',
            members: 234,
            posts: 456,
            description: 'General gym discussions',
          },
          {
            name: 'Workout Tips',
            members: 189,
            posts: 234,
            description: 'Share workout routines',
          },
          {
            name: 'Nutrition & Diet',
            members: 156,
            posts: 178,
            description: 'Nutrition advice',
          },
        ].map((group, i) => (
          <Card
            key={i}
            className="p-4 border-border/50 hover:border-primary/50 cursor-pointer transition-colors"
          >
            <div className="flex items-start justify-between mb-3">
              <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                <MessageCircle className="w-5 h-5 text-primary" />
              </div>
              <Button
                variant="outline"
                size="sm"
              >
                Manage
              </Button>
            </div>
            <h3 className="font-semibold text-foreground mb-1">{group.name}</h3>
            <p className="text-sm text-muted-foreground mb-4">
              {group.description}
            </p>
            <div className="flex gap-4 text-xs text-muted-foreground">
              <div className="flex items-center gap-1">
                <Users className="w-3 h-3" />
                {group.members} members
              </div>
              <div className="flex items-center gap-1">
                <MessageCircle className="w-3 h-3" />
                {group.posts} posts
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}
