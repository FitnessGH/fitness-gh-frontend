'use client';

import { Button } from '@ui/button';
import { Card } from '@ui/card';
import { Input } from '@ui/input';
import { Label } from '@ui/label';
import { Textarea } from '@ui/textarea';
import { Bell, Globe, Image, Lock, Settings, Upload } from 'lucide-react';
import { useState } from 'react';

export default function AdminSettingsPage() {
  const [landingPageContent, setLandingPageContent] = useState({
    heroTitle: 'Turn every session into a story your members share.',
    heroDescription:
      'Run memberships, classes, staff, payments, and community in one place. FitnessGH gives you real-time control without slowing the floor.',
    heroVideoUrl: '/videos/gym-new.mp4',
    memberRetention: '92%',
    staffOpsView: '24/7',
    ownerRating: '4.9★',
    activeAthletes: '5,890',
    joinedThisMonth: '+2,000',
  });

  const handleLandingPageSave = () => {
    // TODO: Implement API call to save landing page content
    console.log('Saving landing page content:', landingPageContent);
    alert('Landing page content saved! (API integration pending)');
  };

  return (
    <div className="p-6 space-y-6 max-w-4xl">
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

      <Card className="p-6 border-border/50 space-y-6">
        <div className="flex items-center gap-3 pb-6 border-b border-border">
          <Globe className="w-5 h-5 text-primary" />
          <h2 className="text-lg font-semibold text-foreground">
            Landing Page Content
          </h2>
        </div>

        <div className="space-y-6">
          <div>
            <Label htmlFor="heroTitle">Hero Title</Label>
            <Textarea
              id="heroTitle"
              placeholder="Main headline"
              value={landingPageContent.heroTitle}
              onChange={(e) =>
                setLandingPageContent({
                  ...landingPageContent,
                  heroTitle: e.target.value,
                })
              }
              rows={2}
            />
          </div>

          <div>
            <Label htmlFor="heroDescription">Hero Description</Label>
            <Textarea
              id="heroDescription"
              placeholder="Subheadline description"
              value={landingPageContent.heroDescription}
              onChange={(e) =>
                setLandingPageContent({
                  ...landingPageContent,
                  heroDescription: e.target.value,
                })
              }
              rows={3}
            />
          </div>

          <div>
            <Label htmlFor="heroVideoUrl">Hero Video URL</Label>
            <div className="flex gap-2">
              <Input
                id="heroVideoUrl"
                placeholder="/videos/gym-new.mp4"
                value={landingPageContent.heroVideoUrl}
                onChange={(e) =>
                  setLandingPageContent({
                    ...landingPageContent,
                    heroVideoUrl: e.target.value,
                  })
                }
              />
              <Button variant="outline" size="icon" title="Upload video">
                <Upload className="w-4 h-4" />
              </Button>
            </div>
            <p className="text-xs text-muted-foreground mt-1">
              Upload video file to /public/videos/ directory
            </p>
          </div>

          <div className="grid grid-cols-3 gap-4">
            <div>
              <Label htmlFor="memberRetention">Member Retention</Label>
              <Input
                id="memberRetention"
                placeholder="92%"
                value={landingPageContent.memberRetention}
                onChange={(e) =>
                  setLandingPageContent({
                    ...landingPageContent,
                    memberRetention: e.target.value,
                  })
                }
              />
            </div>
            <div>
              <Label htmlFor="staffOpsView">Staff Ops View</Label>
              <Input
                id="staffOpsView"
                placeholder="24/7"
                value={landingPageContent.staffOpsView}
                onChange={(e) =>
                  setLandingPageContent({
                    ...landingPageContent,
                    staffOpsView: e.target.value,
                  })
                }
              />
            </div>
            <div>
              <Label htmlFor="ownerRating">Owner Rating</Label>
              <Input
                id="ownerRating"
                placeholder="4.9★"
                value={landingPageContent.ownerRating}
                onChange={(e) =>
                  setLandingPageContent({
                    ...landingPageContent,
                    ownerRating: e.target.value,
                  })
                }
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="activeAthletes">Active Athletes</Label>
              <Input
                id="activeAthletes"
                placeholder="5,890"
                value={landingPageContent.activeAthletes}
                onChange={(e) =>
                  setLandingPageContent({
                    ...landingPageContent,
                    activeAthletes: e.target.value,
                  })
                }
              />
            </div>
            <div>
              <Label htmlFor="joinedThisMonth">Joined This Month</Label>
              <Input
                id="joinedThisMonth"
                placeholder="+2,000"
                value={landingPageContent.joinedThisMonth}
                onChange={(e) =>
                  setLandingPageContent({
                    ...landingPageContent,
                    joinedThisMonth: e.target.value,
                  })
                }
              />
            </div>
          </div>

          <Button
            className="bg-primary hover:bg-primary/90 w-full"
            onClick={handleLandingPageSave}
          >
            Save Landing Page Content
          </Button>
        </div>
      </Card>
    </div>
  );
}
