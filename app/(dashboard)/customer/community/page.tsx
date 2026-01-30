'use client';

import { Button } from '@ui/button';
import { Card } from '@ui/card';
import { Heart, MessageCircle, Plus, Users } from 'lucide-react';

export default function CustomerCommunityPage() {
  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Community</h1>
          <p className="text-muted-foreground">
            Connect with other gym members
          </p>
        </div>
        <Button className="bg-primary hover:bg-primary/90 gap-2">
          <Plus className="w-4 h-4" />
          Create Post
        </Button>
      </div>

      <Card className="p-6 border-border/50">
        <h2 className="text-lg font-semibold mb-4 text-foreground">
          Your Groups
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {[
            { name: 'General Discussion', members: 234 },
            { name: 'Workout Tips', members: 189 },
          ].map((group, i) => (
            <div
              key={i}
              className="p-4 border border-border rounded-lg hover:border-primary/50 cursor-pointer transition-colors"
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-semibold text-foreground">{group.name}</p>
                  <p className="text-sm text-muted-foreground flex items-center gap-1 mt-1">
                    <Users className="w-3 h-3" />
                    {group.members} members
                  </p>
                </div>
                <MessageCircle className="w-5 h-5 text-primary" />
              </div>
            </div>
          ))}
        </div>
      </Card>

      <Card className="p-6 border-border/50">
        <h2 className="text-lg font-semibold mb-4 text-foreground">
          Recent Posts
        </h2>
        <div className="space-y-4">
          {[
            {
              author: 'Sarah M.',
              group: 'Workout Tips',
              content: 'Just completed my first 5K run! Feeling amazing 💪',
              likes: 24,
              replies: 5,
            },
            {
              author: 'Mike K.',
              group: 'General Discussion',
              content: 'New spinning class starting next Monday at 6 PM!',
              likes: 18,
              replies: 3,
            },
            {
              author: 'Emma W.',
              group: 'Workout Tips',
              content: 'Share your favorite post-workout meal ideas!',
              likes: 42,
              replies: 12,
            },
          ].map((post, i) => (
            <div
              key={i}
              className="p-4 border border-border rounded-lg hover:border-primary/50 transition-colors"
            >
              <div className="flex items-start justify-between mb-2">
                <div>
                  <p className="font-semibold text-foreground">{post.author}</p>
                  <p className="text-xs text-muted-foreground">{post.group}</p>
                </div>
              </div>
              <p className="text-sm text-foreground mb-3">{post.content}</p>
              <div className="flex gap-4 text-xs text-muted-foreground">
                <button className="flex items-center gap-1 hover:text-primary transition-colors">
                  <Heart className="w-3 h-3" />
                  {post.likes} likes
                </button>
                <button className="flex items-center gap-1 hover:text-primary transition-colors">
                  <MessageCircle className="w-3 h-3" />
                  {post.replies} replies
                </button>
              </div>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}
