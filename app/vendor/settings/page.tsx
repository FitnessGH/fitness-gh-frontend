'use client';

import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { DollarSign, Lock, User } from 'lucide-react';

export default function VendorSettingsPage() {
  return (
    <div className="p-6 space-y-6 max-w-2xl">
      <div>
        <h1 className="text-3xl font-bold text-foreground">Settings</h1>
        <p className="text-muted-foreground">Manage your vendor account</p>
      </div>

      <Card className="p-6 border-border/50 space-y-6">
        <div className="flex items-center gap-3 pb-6 border-b border-border">
          <User className="w-5 h-5 text-primary" />
          <h2 className="text-lg font-semibold text-foreground">
            Business Profile
          </h2>
        </div>

        <div className="space-y-4">
          <div>
            <Label htmlFor="businessName">Business Name</Label>
            <Input
              id="businessName"
              placeholder="Business name"
              defaultValue="Elite Supplements"
            />
          </div>
          <div>
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              placeholder="Email"
              defaultValue="vendor@elitesupplements.com"
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="phone">Phone</Label>
              <Input
                id="phone"
                placeholder="Phone"
                defaultValue="(555) 555-5555"
              />
            </div>
            <div>
              <Label htmlFor="website">Website</Label>
              <Input
                id="website"
                placeholder="Website"
                defaultValue="elitesupplements.com"
              />
            </div>
          </div>
          <Button className="bg-primary hover:bg-primary/90 w-full">
            Save Changes
          </Button>
        </div>
      </Card>

      <Card className="p-6 border-border/50 space-y-6">
        <div className="flex items-center gap-3 pb-6 border-b border-border">
          <DollarSign className="w-5 h-5 text-primary" />
          <h2 className="text-lg font-semibold text-foreground">
            Payment Methods
          </h2>
        </div>

        <div className="space-y-4">
          <p className="text-sm text-muted-foreground">
            Current: Stripe Account Connected
          </p>
          <div className="p-4 bg-muted/30 border border-border rounded-lg">
            <p className="text-sm font-medium text-foreground">
              stripe_acct_1A2B3C...
            </p>
            <p className="text-xs text-muted-foreground mt-1">
              Connected on Jan 10, 2025
            </p>
          </div>
          <Button
            variant="outline"
            className="w-full bg-transparent"
          >
            Reconnect Stripe
          </Button>
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
