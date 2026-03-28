'use client';

import { useAuth } from '@/components/auth-context';
import UsersAPI from '@/lib/api/users';
import { Button } from '@ui/button';
import { Card } from '@ui/card';
import { Input } from '@ui/input';
import { Label } from '@ui/label';
import {
  AlertCircle,
  CheckCircle,
  CreditCard,
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

export default function VendorSettingsPage() {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [profileStatus, setProfileStatus] = useState<SaveStatus>('idle');
  const [profileError, setProfileError] = useState('');
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [passwordStatus, setPasswordStatus] = useState<SaveStatus>('idle');
  const [passwordError, setPasswordError] = useState('');

  const { userData, updateUser } = useAuth();

  useEffect(() => {
    if (userData?.profile) {
      setFirstName(userData.profile.firstName || '');
      setLastName(userData.profile.lastName || '');
    }
  }, [userData]);

  const handleSaveProfile = async () => {
    const profileId = userData?.profile?.id;
    if (!profileId) return;

    setProfileStatus('saving');
    setProfileError('');
    try {
      await UsersAPI.updateProfile(profileId, { firstName, lastName });
      updateUser({ name: `${firstName} ${lastName}`.trim() });
      setProfileStatus('success');
      setTimeout(() => setProfileStatus('idle'), 3000);
    } catch (err: any) {
      setProfileError(err.message || 'Failed to update profile');
      setProfileStatus('error');
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

  const paystackPublicKey = process.env.NEXT_PUBLIC_PAYSTACK_PUBLIC_KEY;

  return (
    <div className="p-6 space-y-6 max-w-2xl">
      <div>
        <h1 className="text-3xl font-bold text-foreground">Settings</h1>
        <p className="text-muted-foreground">Manage your seller account</p>
      </div>

      <Card className="p-6 border-border/50 space-y-5">
        <div className="flex items-center gap-3 pb-4 border-b border-border">
          <User className="w-5 h-5 text-primary" />
          <h2 className="text-lg font-semibold text-foreground">Profile</h2>
        </div>

        <div className="space-y-4">
          <div>
            <Label
              htmlFor="email"
              className="mb-1 block"
            >
              Email
            </Label>
            <Input
              id="email"
              type="email"
              value={userData?.account.email || ''}
              disabled
              className="opacity-60 cursor-not-allowed"
            />
            <p className="text-xs text-muted-foreground mt-1">
              Email cannot be changed
            </p>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label
                htmlFor="firstName"
                className="mb-1 block"
              >
                First Name
              </Label>
              <Input
                id="firstName"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                placeholder="First name"
              />
            </div>
            <div>
              <Label
                htmlFor="lastName"
                className="mb-1 block"
              >
                Last Name
              </Label>
              <Input
                id="lastName"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                placeholder="Last name"
              />
            </div>
          </div>
          <div className="flex items-center justify-between">
            <StatusMessage
              status={profileStatus}
              message={profileError}
            />
            <Button
              onClick={handleSaveProfile}
              disabled={profileStatus === 'saving'}
              className="bg-primary hover:bg-primary/90 ml-auto"
            >
              {profileStatus === 'saving' && (
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
              )}
              Save Profile
            </Button>
          </div>
        </div>
      </Card>

      <Card className="p-6 border-border/50 space-y-5">
        <div className="flex items-center gap-3 pb-4 border-b border-border">
          <CreditCard className="w-5 h-5 text-primary" />
          <h2 className="text-lg font-semibold text-foreground">
            Payment (Paystack)
          </h2>
        </div>

        <div className="space-y-4">
          <div className="rounded-xl bg-primary/10 border border-primary/20 p-4 text-sm text-muted-foreground">
            FitnessGH processes all marketplace payments via{' '}
            <span className="text-foreground font-medium">Paystack</span>.
            Customers pay securely at checkout and your earnings are settled
            through Paystack.
          </div>

          <div>
            <Label className="mb-1 block">Paystack Public Key</Label>
            <Input
              value={
                paystackPublicKey
                  ? `${paystackPublicKey.slice(0, 16)}...`
                  : 'Not configured'
              }
              disabled
              className="opacity-60 cursor-not-allowed font-mono text-sm"
            />
            <p className="text-xs text-muted-foreground mt-1">
              Set{' '}
              <code className="bg-muted px-1 rounded text-xs">
                NEXT_PUBLIC_PAYSTACK_PUBLIC_KEY
              </code>{' '}
              in your environment variables.
            </p>
          </div>

          <div className="flex items-center gap-2 text-sm">
            <div
              className={`w-2 h-2 rounded-full ${paystackPublicKey ? 'bg-green-500' : 'bg-yellow-500'}`}
            />
            <span className="text-muted-foreground">
              {paystackPublicKey
                ? 'Paystack is configured and active'
                : 'Paystack key not set — payments will not work'}
            </span>
          </div>
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
