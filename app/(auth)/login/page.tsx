import { LoginForm } from '@/components/login-form';

export const Login = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-secondary/10 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <LoginForm />
      </div>
    </div>
  );
};
