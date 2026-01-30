'use client';

import { Button } from '@ui/button';
import { Card } from '@ui/card';
import { Input } from '@ui/input';
import { Label } from '@ui/label';
import { Bell, Lock, Settings } from 'lucide-react';

export default function AdminSettingsPage() {
  return (
    <div className="p-6 space-y-6 max-w-2xl">
      <div>
        <h1 className="text-3xl font-bold text-foreground">Admin Settings</h1>
        <p className="text-muted-foreground">
          Manage system-wide configuration
        </p>
      </div>

      <Card className="p-6 border-border/50 space-y-6">
        <div className="flex items-center gap-3 pb-6 border-b border-border">
          <Settings className="w-5 h-5 text-primary" />
          <h2 className="text-lg font-semibold text-foreground">
            System Configuration
          </h2>
        </div>

        <div className="space-y-4">
          <div>
            <Label htmlFor="platformName">Platform Name</Label>
            <Input
              id="platformName"
              placeholder="Platform name"
              defaultValue="FitnessGH"
            />
          </div>
          <div>
            <Label htmlFor="supportEmail">Support Email</Label>
            <Input
              id="supportEmail"
              type="email"
              placeholder="Support email"
              defaultValue="support@FitnessGH.com"
            />
          </div>
          <div>
            <Label htmlFor="siteName">Site URL</Label>
            <Input
              id="siteName"
              placeholder="Site URL"
              defaultValue="https://FitnessGH.com"
            />
          </div>
          <Button className="bg-primary hover:bg-primary/90 w-full">
            Save Settings
          </Button>
        </div>
      </Card>

      <Card className="p-6 border-border/50 space-y-6">
        <div className="flex items-center gap-3 pb-6 border-b border-border">
          <Bell className="w-5 h-5 text-primary" />
          <h2 className="text-lg font-semibold text-foreground">
            Alerts & Notifications
          </h2>
        </div>

        <div className="space-y-4">
          {[
            { label: 'Dispute escalations', enabled: true },
            { label: 'New gym registrations', enabled: true },
            { label: 'Vendor account changes', enabled: true },
            { label: 'Daily summary report', enabled: false },
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
          <h2 className="text-lg font-semibold text-foreground">
            Security Settings
          </h2>
        </div>

        <div className="space-y-4">
          <div>
            <Label htmlFor="password">Admin Password</Label>
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
