'use client';

import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Mail, ShieldCheck } from 'lucide-react';
import { useState } from 'react';

interface OTPVerificationProps {
  email: string;
  onVerified: () => void;
  onBack: () => void;
}

export default function OTPVerification({ email, onVerified, onBack }: OTPVerificationProps) {
  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [isResending, setIsResending] = useState(false);
  const [resendSuccess, setResendSuccess] = useState('');

  const inputRefs = Array.from({ length: 6 }, () => ({ current: null as HTMLInputElement | null }));

  const handleInputChange = (index: number, value: string) => {
    if (value.length > 1) {
      value = value.slice(0, 1);
    }

    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    // Auto-focus next input
    if (value && index < 5) {
      inputRefs[index + 1]?.current?.focus();
    }

    // Clear error when user starts typing
    if (error) setError('');
    if (resendSuccess) setResendSuccess('');
  };

  const handleKeyDown = (index: number, e: React.KeyboardEvent) => {
    if (e.key === 'Backspace' && !otp[index] && index > 0) {
      inputRefs[index - 1]?.current?.focus();
    }
  };

  const handlePaste = (e: React.ClipboardEvent) => {
    e.preventDefault();
    const pastedData = e.clipboardData.getData('text').slice(0, 6);
    const newOtp = pastedData.split('').map((char, index) => (index < 6 ? char : ''));
    setOtp(newOtp);
    
    // Focus the last filled input
    const lastFilledIndex = newOtp.findIndex(char => !char);
    const focusIndex = lastFilledIndex === -1 ? 5 : lastFilledIndex;
    inputRefs[focusIndex]?.current?.focus();
  };

  const handleVerify = async () => {
    const otpValue = otp.join('');
    
    if (otpValue.length !== 6) {
      setError('Please enter all 6 digits');
      return;
    }

    setIsLoading(true);
    setError('');

    try {
      const { AuthAPI } = await import('@/lib/api/auth');
      await AuthAPI.verifyOTP(email, otpValue);
      onVerified();
    } catch (err: any) {
      setError(err.message || 'Failed to verify OTP');
    } finally {
      setIsLoading(false);
    }
  };

  const handleResend = async () => {
    setIsResending(true);
    setError('');
    setResendSuccess('');

    try {
      const { AuthAPI } = await import('@/lib/api/auth');
      await AuthAPI.sendOTP(email);
      setResendSuccess('OTP sent successfully!');
      setOtp(['', '', '', '', '', '']);
      inputRefs[0]?.current?.focus();
    } catch (err: any) {
      setError(err.message || 'Failed to resend OTP');
    } finally {
      setIsResending(false);
    }
  };

  const isComplete = otp.every(digit => digit !== '');

  return (
    <Card className="p-8 border-border bg-card/70 backdrop-blur-sm shadow-2xl shadow-primary/10">
      <div className="text-center mb-8 space-y-4">
        <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-primary/10 text-primary">
          <Mail className="w-6 h-6" />
        </div>
        <div>
          <h2 className="text-2xl font-bold">Verify Your Email</h2>
          <p className="text-sm text-muted-foreground mt-2">
            We've sent a 6-digit code to<br />
            <span className="font-medium text-foreground">{email}</span>
          </p>
        </div>
      </div>

      <div className="space-y-6">
        <div className="space-y-2">
          <Label htmlFor="otp" className="text-sm font-medium">
            Enter Verification Code
          </Label>
          <div className="flex gap-2 justify-center">
            {otp.map((digit, index) => (
              <Input
                key={index}
                ref={inputRefs[index]}
                type="text"
                inputMode="numeric"
                pattern="[0-9]*"
                maxLength={1}
                value={digit}
                onChange={(e) => handleInputChange(index, e.target.value)}
                onKeyDown={(e) => handleKeyDown(index, e)}
                onPaste={index === 0 ? handlePaste : undefined}
                className="w-12 h-12 text-center text-lg font-semibold"
                disabled={isLoading}
              />
            ))}
          </div>
        </div>

        {error && (
          <div className="p-3 rounded-lg bg-red-500/10 border border-red-500/30 text-red-500 text-sm">
            {error}
          </div>
        )}

        {resendSuccess && (
          <div className="p-3 rounded-lg bg-green-500/10 border border-green-500/30 text-green-500 text-sm">
            {resendSuccess}
          </div>
        )}

        <Button
          onClick={handleVerify}
          disabled={!isComplete || isLoading}
          className="w-full bg-primary hover:bg-primary/90 font-bold shadow-lg shadow-primary/20 cursor-pointer"
        >
          {isLoading ? 'Verifying...' : 'Verify Email'}
        </Button>

        <div className="text-center space-y-2">
          <p className="text-sm text-muted-foreground">
            Didn't receive the code?
          </p>
          <Button
            variant="link"
            onClick={handleResend}
            disabled={isResending}
            className="text-primary hover:text-primary/80 p-0 h-auto font-normal"
          >
            {isResending ? 'Resending...' : 'Resend Code'}
          </Button>
        </div>

        <Button
          variant="outline"
          onClick={onBack}
          disabled={isLoading}
          className="w-full"
        >
          Back to Signup
        </Button>

        <div className="flex items-center justify-center gap-2 text-xs text-muted-foreground">
          <ShieldCheck className="w-3 h-3" />
          <span>Code expires in 10 minutes</span>
        </div>
      </div>
    </Card>
  );
}
