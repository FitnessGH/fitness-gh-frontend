'use client';

import { useAuth } from '@/components/auth-context';
import { AuthAPI, type AuthResponse } from '@/lib/api/auth';
import UsersAPI, { type UpdateProfileData } from '@/lib/api/users';
import { Button } from '@ui/button';
import { Card } from '@ui/card';
import { Input } from '@ui/input';
import { Label } from '@ui/label';
import { Bell, Lock, User, Loader2 } from 'lucide-react';
import { useEffect, useState } from 'react';

export default function CustomerSettingsPage() {
  const { user, setUserFromAuthResponse } = useAuth();
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [userData, setUserData] = useState<AuthResponse | null>(null);
  const [profileData, setProfileData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
  });
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    const fetchUserData = async () => {
      if (!user) return;

      const accessToken = typeof window !== 'undefined' ? localStorage.getItem('accessToken') : null;
      if (!accessToken) {
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        const authData = await AuthAPI.getMe(accessToken);
        setUserData(authData);
        
        // Populate form with real data
        setProfileData({
          firstName: authData.profile?.firstName || '',
          lastName: authData.profile?.lastName || '',
          email: authData.account.email || '',
          phone: authData.account.phone || '',
        });
      } catch (error: any) {
        console.error('Failed to fetch user data:', error);
        setError(error.message || 'Failed to load profile data');
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, [user]);

  const handleSave = async () => {
    if (!userData || !userData.profile) return;

    const accessToken = typeof window !== 'undefined' ? localStorage.getItem('accessToken') : null;
    if (!accessToken) {
      setError('Not authenticated');
      return;
    }

    try {
      setSaving(true);
      setError(null);
      setSuccess(false);

      const updateData: UpdateProfileData = {
        firstName: profileData.firstName || undefined,
        lastName: profileData.lastName || undefined,
      };

      await UsersAPI.updateProfile(userData.profile.id, updateData, accessToken);
      
      // Refresh user data
      const updatedAuthData = await AuthAPI.getMe(accessToken);
      setUserData(updatedAuthData);
      
      // Update auth context to reflect changes immediately
      setUserFromAuthResponse(updatedAuthData);
      
      // Update form data
      setProfileData({
        firstName: updatedAuthData.profile?.firstName || '',
        lastName: updatedAuthData.profile?.lastName || '',
        email: updatedAuthData.account.email || '',
        phone: updatedAuthData.account.phone || '',
      });
      
      setSuccess(true);
      setTimeout(() => setSuccess(false), 3000);
    } catch (error: any) {
      console.error('Failed to update profile:', error);
      setError(error.message || 'Failed to update profile');
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="p-6 flex items-center justify-center min-h-[400px]">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="p-6 space-y-6 max-w-2xl">
      <div>
        <h1 className="text-3xl font-bold text-foreground">Settings</h1>
        <p className="text-muted-foreground">
          Manage your account and preferences
        </p>
      </div>

      {error && (
        <div className="p-4 bg-red-500/10 border border-red-500/20 rounded-md text-red-600 text-sm">
          {error}
        </div>
      )}

      {success && (
        <div className="p-4 bg-green-500/10 border border-green-500/20 rounded-md text-green-600 text-sm">
          Profile updated successfully!
        </div>
      )}

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
                placeholder="First Name"
                value={profileData.firstName}
                onChange={(e) =>
                  setProfileData({ ...profileData, firstName: e.target.value })
                }
                disabled={saving}
              />
            </div>
            <div>
              <Label htmlFor="lastName">Last Name</Label>
              <Input
                id="lastName"
                placeholder="Last Name"
                value={profileData.lastName}
                onChange={(e) =>
                  setProfileData({ ...profileData, lastName: e.target.value })
                }
                disabled={saving}
              />
            </div>
          </div>
          <div>
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              placeholder="Email"
              value={profileData.email}
              disabled
              className="bg-muted cursor-not-allowed"
            />
            <p className="text-xs text-muted-foreground mt-1">
              Email cannot be changed
            </p>
          </div>
          <div>
            <Label htmlFor="phone">Phone</Label>
            <Input
              id="phone"
              placeholder="Phone number"
              value={profileData.phone}
              disabled
              className="bg-muted cursor-not-allowed"
            />
            <p className="text-xs text-muted-foreground mt-1">
              Phone number cannot be changed here
            </p>
          </div>
          <Button
            className="bg-primary hover:bg-primary/90 w-full"
            onClick={handleSave}
            disabled={saving}
          >
            {saving ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Saving...
              </>
            ) : (
              'Save Changes'
            )}
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
