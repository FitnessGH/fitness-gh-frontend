'use client';

import type React from 'react';

import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Bell, DollarSign, ImageIcon, Lock, Upload, User } from 'lucide-react';
import { useState } from 'react';

export default function SettingsPage() {
  const [uploadedImages, setUploadedImages] = useState<string[]>([]);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files) {
      const newImages = Array.from(files).map((file) =>
        URL.createObjectURL(file),
      );
      setUploadedImages((prev) => [...prev, ...newImages]);
    }
  };

  return (
    <div className="p-6 space-y-6 max-w-2xl">
      <div>
        <h1 className="text-3xl font-bold text-foreground">Settings</h1>
        <p className="text-muted-foreground">
          Manage your gym and account settings
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
          <div>
            <Label htmlFor="gymName">Gym Name</Label>
            <Input
              id="gymName"
              placeholder="Your gym name"
              defaultValue="FitClub Downtown"
            />
          </div>
          <div>
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              placeholder="Email"
              defaultValue="owner@fitclub.com"
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="phone">Phone</Label>
              <Input
                id="phone"
                placeholder="Phone number"
                defaultValue="(555) 123-4567"
              />
            </div>
            <div>
              <Label htmlFor="website">Website</Label>
              <Input
                id="website"
                placeholder="Website"
                defaultValue="fitclub.com"
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
          <ImageIcon className="w-5 h-5 text-primary" />
          <h2 className="text-lg font-semibold text-foreground">Gym Images</h2>
        </div>

        <div className="space-y-4">
          <div className="border-2 border-dashed border-border/50 rounded-lg p-8 text-center cursor-pointer hover:border-primary/50 transition-colors">
            <input
              type="file"
              multiple
              accept="image/*"
              onChange={handleImageUpload}
              className="hidden"
              id="imageUpload"
            />
            <label
              htmlFor="imageUpload"
              className="cursor-pointer block"
            >
              <Upload className="w-8 h-8 text-muted-foreground mx-auto mb-2" />
              <p className="text-sm text-foreground font-medium">
                Click to upload gym images
              </p>
              <p className="text-xs text-muted-foreground">
                PNG, JPG up to 10MB
              </p>
            </label>
          </div>

          {uploadedImages.length > 0 && (
            <div>
              <p className="text-sm font-medium text-foreground mb-3">
                Uploaded Images ({uploadedImages.length})
              </p>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {uploadedImages.map((img, i) => (
                  <div
                    key={i}
                    className="relative rounded-lg overflow-hidden bg-muted"
                  >
                    <img
                      src={img || '/placeholder.svg'}
                      alt={`Gym ${i + 1}`}
                      className="w-full h-32 object-cover"
                    />
                    <button
                      onClick={() =>
                        setUploadedImages((prev) =>
                          prev.filter((_, idx) => idx !== i),
                        )
                      }
                      className="absolute top-2 right-2 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center hover:bg-red-600"
                    >
                      ×
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          <Button className="bg-primary hover:bg-primary/90 w-full">
            Save Images
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
            { label: 'New member signups', enabled: true },
            { label: 'Membership renewals', enabled: true },
            { label: 'Payment confirmations', enabled: true },
            { label: 'Weekly reports', enabled: false },
          ].map((notification, i) => (
            <div
              key={i}
              className="flex items-center justify-between"
            >
              <p className="text-foreground">{notification.label}</p>
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
          <DollarSign className="w-5 h-5 text-primary" />
          <h2 className="text-lg font-semibold text-foreground">
            Payment Methods
          </h2>
        </div>

        <Button
          variant="outline"
          className="w-full bg-transparent"
        >
          Connect Stripe Account
        </Button>
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
