'use client';

import { useAuth } from '@/components/auth-context';
import UsersAPI, { type UpdateProfileData } from '@/lib/api/users';
import { Button } from '@ui/button';
import { Card } from '@ui/card';
import { Input } from '@ui/input';
import { Label } from '@ui/label';
import {
  AlertCircle,
  Bell,
  CheckCircle,
  Loader2,
  Lock,
  User,
} from 'lucide-react';
import { useEffect, useState } from 'react';

type SaveStatus = 'idle' | 'saving' | 'success' | 'error';

function StatusMessage({
  status,
  message,
}: {
  status: SaveStatus;
  message?: string;
}) {
  if (status === 'saving')
    return (
      <div className="flex items-center gap-2 text-sm text-muted-foreground">
        <Loader2 className="w-4 h-4 animate-spin" /> Saving...
      </div>
    );
  if (status === 'success')
    return (
      <div className="flex items-center gap-2 text-sm text-green-500">
        <CheckCircle className="w-4 h-4" /> Saved successfully
      </div>
    );
  if (status === 'error')
    return (
      <div className="flex items-center gap-2 text-sm text-destructive">
        <AlertCircle className="w-4 h-4" /> {message || 'Something went wrong'}
      </div>
    );
  return null;
}

export default function CustomerSettingsPage() {
  const [saving, setSaving] = useState(false);
  const [loadingData, setLoadingData] = useState(false);
  const [profileData, setProfileData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
  });
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [passwordStatus, setPasswordStatus] = useState<SaveStatus>('idle');
  const [passwordError, setPasswordError] = useState('');

  const { user, userData, refreshUserData, isLoading } = useAuth();

  useEffect(() => {
    const fetchUserData = async () => {
      if (userData || isLoading) return;

      if (!user) return;

      try {
        setLoadingData(true);
        await refreshUserData();
      } catch (error: any) {
        console.error('Failed to fetch user data:', error);
        setError('Failed to load profile data');
      } finally {
        setLoadingData(false);
      }
    };

    fetchUserData();
  }, [user, userData, isLoading, refreshUserData]);

  useEffect(() => {
    if (userData) {
      setProfileData({
        firstName: userData.profile?.firstName || '',
        lastName: userData.profile?.lastName || '',
        email: userData.account.email || '',
        phone: userData.account.phone || '',
      });
    } else if (user) {
      const nameParts = user.name.split(' ');
      setProfileData({
        firstName: nameParts[0] || '',
        lastName: nameParts.slice(1).join(' ') || '',
        email: user.email || '',
        phone: '',
      });
    }
  }, [userData, user]);

  const handleSave = async () => {
    if (!userData || !userData.profile) return;

    try {
      setSaving(true);
      setError(null);
      setSuccess(false);

      const updateData: UpdateProfileData = {
        firstName: profileData.firstName || undefined,
        lastName: profileData.lastName || undefined,
      };

      await UsersAPI.updateProfile(userData.profile.id, updateData);
      await refreshUserData();

      setSuccess(true);
      setTimeout(() => setSuccess(false), 3000);
    } catch (error: any) {
      console.error('Failed to update profile:', error);
      setError(error.message || 'Failed to update profile');
    } finally {
      setSaving(false);
    }
  };

  const handleChangePassword = async () => {
    if (newPassword !== confirmPassword) {
      setPasswordError('Passwords do not match');
      setPasswordStatus('error');
      return;
    }
    if (newPassword.length < 8) {
      setPasswordError('Password must be at least 8 characters');
      setPasswordStatus('error');
      return;
    }

    setPasswordStatus('saving');
    setPasswordError('');
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5001'}/api/v1/auth/change-password`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${localStorage.getItem('accessToken') || sessionStorage.getItem('accessToken') || ''}`,
          },
          body: JSON.stringify({ currentPassword, newPassword }),
        },
      );

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.message || 'Failed to change password');
      }

      setCurrentPassword('');
      setNewPassword('');
      setConfirmPassword('');
      setPasswordStatus('success');
      setTimeout(() => setPasswordStatus('idle'), 3000);
    } catch (err: any) {
      setPasswordError(err.message || 'Failed to change password');
      setPasswordStatus('error');
    }
  };

  if (isLoading || loadingData) {
    return (
      <div className="p-6 flex items-center justify-center min-h-100">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  if (!user) {
    return (
      <div className="p-6 flex items-center justify-center min-h-100">
        <p className="text-muted-foreground">
          Please log in to access settings
        </p>
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

      <Card className="p-6 border-border/50 space-y-5">
        <div className="flex items-center gap-3 pb-4 border-b border-border">
          <Lock className="w-5 h-5 text-primary" />
          <h2 className="text-lg font-semibold text-foreground">Security</h2>
        </div>

        <div className="space-y-4">
          <div>
            <Label
              htmlFor="currentPassword"
              className="mb-1 block"
            >
              Current Password
            </Label>
            <Input
              id="currentPassword"
              type="password"
              value={currentPassword}
              onChange={(e) => setCurrentPassword(e.target.value)}
              placeholder="Current password"
            />
          </div>
          <div>
            <Label
              htmlFor="newPassword"
              className="mb-1 block"
            >
              New Password
            </Label>
            <Input
              id="newPassword"
              type="password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              placeholder="New password (min. 8 characters)"
            />
          </div>
          <div>
            <Label
              htmlFor="confirmPassword"
              className="mb-1 block"
            >
              Confirm New Password
            </Label>
            <Input
              id="confirmPassword"
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="Confirm new password"
            />
          </div>
          <div className="flex items-center justify-between">
            <StatusMessage
              status={passwordStatus}
              message={passwordError}
            />
            <Button
              onClick={handleChangePassword}
              disabled={
                passwordStatus === 'saving' ||
                !currentPassword ||
                !newPassword ||
                !confirmPassword
              }
              className="bg-primary hover:bg-primary/90 ml-auto"
            >
              {passwordStatus === 'saving' && (
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
              )}
              Update Password
            </Button>
          </div>
        </div>
      </Card>
    </div>
  );
}
