'use client';

import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Bell, Lock, User } from 'lucide-react';

export default function CustomerSettingsPage() {
  return (
    <div className="p-6 space-y-6 max-w-2xl">
      <div>
        <h1 className="text-3xl font-bold text-foreground">Settings</h1>
        <p className="text-muted-foreground">
          Manage your account and preferences
        </p>
      </div>

      <Card className="p-6 border-border/50 space-y-6">
        <div className="flex items-center gap-3 pb-6 border-b border-border">
          <User className="w-5 h-5 text-primary" />
          <h2 className="text-lg font-semibold text-foreground">
            Profile Settings
          </h2>
        </div>

        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="firstName">First Name</Label>
              <Input
                id="firstName"
                placeholder="Sarah"
                defaultValue="Sarah"
              />
            </div>
            <div>
              <Label htmlFor="lastName">Last Name</Label>
              <Input
                id="lastName"
                placeholder="Johnson"
                defaultValue="Johnson"
              />
            </div>
          </div>
          <div>
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              placeholder="Email"
              defaultValue="sarah@example.com"
            />
          </div>
          <div>
            <Label htmlFor="phone">Phone</Label>
            <Input
              id="phone"
              placeholder="Phone number"
              defaultValue="(555) 123-4567"
            />
          </div>
          <Button className="bg-primary hover:bg-primary/90 w-full">
            Save Changes
          </Button>
        </div>
      </Card>

      <Card className="p-6 border-border/50 space-y-6">
        <div className="flex items-center gap-3 pb-6 border-b border-border">
          <Bell className="w-5 h-5 text-primary" />
          <h2 className="text-lg font-semibold text-foreground">
            Notifications
          </h2>
        </div>

        <div className="space-y-4">
          {[
            { label: 'Membership renewal reminders', enabled: true },
            { label: 'Event notifications', enabled: true },
            { label: 'Community posts', enabled: false },
            { label: 'New offers', enabled: true },
          ].map((notification, i) => (
            <div
              key={i}
              className="flex items-center justify-between"
            >
              <p className="text-foreground text-sm">{notification.label}</p>
              <input
                type="checkbox"
                defaultChecked={notification.enabled}
                className="w-4 h-4"
              />
            </div>
          ))}
        </div>
      </Card>

      <Card className="p-6 border-border/50 space-y-6">
        <div className="flex items-center gap-3 pb-6 border-b border-border">
          <Lock className="w-5 h-5 text-primary" />
          <h2 className="text-lg font-semibold text-foreground">Security</h2>
        </div>

        <div className="space-y-4">
          <div>
            <Label htmlFor="password">Change Password</Label>
            <Input
              id="password"
              type="password"
              placeholder="New password"
            />
          </div>
          <Button className="bg-primary hover:bg-primary/90 w-full">
            Update Password
          </Button>
        </div>
      </Card>
    </div>
  );
}
