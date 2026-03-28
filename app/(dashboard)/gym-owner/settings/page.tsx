'use client';

import { useAuth } from '@/components/auth-context';
import { Button } from '@ui/button';
import { Card } from '@ui/card';
import { Input } from '@ui/input';
import { Label } from '@ui/label';
import {
  AlertCircle,
  Building2,
  CheckCircle,
  CreditCard,
  Loader2,
  Lock,
  User,
} from 'lucide-react';
import { useEffect, useState } from 'react';

import GymsAPI from '@/lib/api/gyms';
import UsersAPI from '@/lib/api/users';

interface GymData {
  id: string;
  name: string;
  description: string | null;
  address: string;
  city: string;
  region: string;
  phone: string | null;
  email: string | null;
  website: string | null;
}

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

export default function SettingsPage() {
  const { userData, updateUser } = useAuth();

  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [profileStatus, setProfileStatus] = useState<SaveStatus>('idle');
  const [profileError, setProfileError] = useState('');
  const [gym, setGym] = useState<GymData | null>(null);
  const [gymForm, setGymForm] = useState({
    name: '',
    description: '',
    address: '',
    city: '',
    region: '',
    phone: '',
    email: '',
    website: '',
  });
  const [gymStatus, setGymStatus] = useState<SaveStatus>('idle');
  const [gymError, setGymError] = useState('');
  const [gymLoading, setGymLoading] = useState(true);
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [passwordStatus, setPasswordStatus] = useState<SaveStatus>('idle');
  const [passwordError, setPasswordError] = useState('');

  useEffect(() => {
    if (userData?.profile) {
      setFirstName(userData.profile.firstName || '');
      setLastName(userData.profile.lastName || '');
    }
  }, [userData]);

  useEffect(() => {
    const load = async () => {
      try {
        const { owned } = await GymsAPI.getMyGyms();
        if (owned.length > 0) {
          const g = owned[0];
          setGym(g);
          setGymForm({
            name: g.name || '',
            description: g.description || '',
            address: g.address || '',
            city: g.city || '',
            region: g.region || '',
            phone: g.phone || '',
            email: g.email || '',
            website: g.website || '',
          });
        }
      } catch (err) {
        console.error('Failed to load gym:', err);
      } finally {
        setGymLoading(false);
      }
    };
    load();
  }, []);

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

  const handleSaveGym = async () => {
    if (!gym) return;

    setGymStatus('saving');
    setGymError('');
    try {
      const payload: any = {};
      if (gymForm.name) payload.name = gymForm.name;
      if (gymForm.description) payload.description = gymForm.description;
      if (gymForm.address) payload.address = gymForm.address;
      if (gymForm.city) payload.city = gymForm.city;
      if (gymForm.region) payload.region = gymForm.region;
      if (gymForm.phone) payload.phone = gymForm.phone;
      if (gymForm.email) payload.email = gymForm.email;
      if (gymForm.website) payload.website = gymForm.website;

      await GymsAPI.updateGym(gym.id, payload);
      setGymStatus('success');
      setTimeout(() => setGymStatus('idle'), 3000);
    } catch (err: any) {
      setGymError(err.message || 'Failed to update gym');
      setGymStatus('error');
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
        <p className="text-muted-foreground">
          Manage your gym and account settings
        </p>
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
          <Building2 className="w-5 h-5 text-primary" />
          <h2 className="text-lg font-semibold text-foreground">Gym Details</h2>
        </div>

        {gymLoading ? (
          <div className="flex items-center justify-center py-8">
            <Loader2 className="w-6 h-6 animate-spin text-primary" />
          </div>
        ) : !gym ? (
          <p className="text-sm text-muted-foreground">
            No gym found. Create one from your dashboard.
          </p>
        ) : (
          <div className="space-y-4">
            <div>
              <Label
                htmlFor="gymName"
                className="mb-1 block"
              >
                Gym Name
              </Label>
              <Input
                id="gymName"
                value={gymForm.name}
                onChange={(e) =>
                  setGymForm({ ...gymForm, name: e.target.value })
                }
                placeholder="Gym name"
              />
            </div>
            <div>
              <Label
                htmlFor="gymDescription"
                className="mb-1 block"
              >
                Description
              </Label>
              <textarea
                id="gymDescription"
                value={gymForm.description}
                onChange={(e) =>
                  setGymForm({ ...gymForm, description: e.target.value })
                }
                placeholder="Brief description of your gym"
                className="w-full px-3 py-2 border border-border rounded-md bg-background text-foreground text-sm min-h-20 resize-none focus:outline-none focus:ring-2 focus:ring-primary/50"
              />
            </div>
            <div>
              <Label
                htmlFor="gymAddress"
                className="mb-1 block"
              >
                Address
              </Label>
              <Input
                id="gymAddress"
                value={gymForm.address}
                onChange={(e) =>
                  setGymForm({ ...gymForm, address: e.target.value })
                }
                placeholder="Street address"
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label
                  htmlFor="gymCity"
                  className="mb-1 block"
                >
                  City
                </Label>
                <Input
                  id="gymCity"
                  value={gymForm.city}
                  onChange={(e) =>
                    setGymForm({ ...gymForm, city: e.target.value })
                  }
                  placeholder="City"
                />
              </div>
              <div>
                <Label
                  htmlFor="gymRegion"
                  className="mb-1 block"
                >
                  Region
                </Label>
                <Input
                  id="gymRegion"
                  value={gymForm.region}
                  onChange={(e) =>
                    setGymForm({ ...gymForm, region: e.target.value })
                  }
                  placeholder="Region"
                />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label
                  htmlFor="gymPhone"
                  className="mb-1 block"
                >
                  Phone
                </Label>
                <Input
                  id="gymPhone"
                  value={gymForm.phone}
                  onChange={(e) =>
                    setGymForm({ ...gymForm, phone: e.target.value })
                  }
                  placeholder="+233..."
                />
              </div>
              <div>
                <Label
                  htmlFor="gymEmail"
                  className="mb-1 block"
                >
                  Gym Email
                </Label>
                <Input
                  id="gymEmail"
                  type="email"
                  value={gymForm.email}
                  onChange={(e) =>
                    setGymForm({ ...gymForm, email: e.target.value })
                  }
                  placeholder="gym@example.com"
                />
              </div>
            </div>
            <div>
              <Label
                htmlFor="gymWebsite"
                className="mb-1 block"
              >
                Website
              </Label>
              <Input
                id="gymWebsite"
                value={gymForm.website}
                onChange={(e) =>
                  setGymForm({ ...gymForm, website: e.target.value })
                }
                placeholder="https://yourgym.com"
              />
            </div>
            <div className="flex items-center justify-between">
              <StatusMessage
                status={gymStatus}
                message={gymError}
              />
              <Button
                onClick={handleSaveGym}
                disabled={gymStatus === 'saving'}
                className="bg-primary hover:bg-primary/90 ml-auto"
              >
                {gymStatus === 'saving' && (
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                )}
                Save Gym Details
              </Button>
            </div>
          </div>
        )}
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
            FitnessGH processes all payments via{' '}
            <span className="text-foreground font-medium">Paystack</span>.
            Members pay for memberships and services directly through Paystack's
            secure checkout.
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
