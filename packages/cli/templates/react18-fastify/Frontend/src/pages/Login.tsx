import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { LogIn, Mail, Lock, Loader2 } from 'lucide-react';
import { useAuthStore } from '@/store/authStore';
import { authApi } from '@/services/authService';
import { Input } from '@/components/UI/Input';
import { Button } from '@/components/UI/Buttons/Button';
import { toast } from '@/components/UI/Feedback/Toast';
import { APP_CONFIG } from '@/config/app';

const loginSchema = z.object({
  email: z.string().email('Please enter a valid email'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
});

type LoginForm = z.infer<typeof loginSchema>;

export function Login() {
  const navigate = useNavigate();
  const { loginSuccess } = useAuthStore();
  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginForm>({
    resolver: zodResolver(loginSchema),
    defaultValues: { email: '', password: '' },
  });

  const onSubmit = async (data: LoginForm) => {
    setIsLoading(true);
    try {
      const response = await authApi.login(data);
      if (response.success && response.data) {
        const { user, accessToken, refreshToken } = response.data;
        loginSuccess(user, accessToken, refreshToken);
        toast.success(`Welcome back, ${user.firstName}!`);
        navigate('/', { replace: true });
      } else {
        toast.error(response.message || 'Login failed');
      }
    } catch (err: any) {
      const message =
        err.response?.data?.message || 'Unable to connect to server. Please try again.';
      toast.error(message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-(--color-bg) px-4">
      {/* Background blobs */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="blob blob-primary w-125 h-125 -top-32 -left-32" />
        <div className="blob blob-primary w-100 h-100 -bottom-48 right-0 blob-delay-4s" />
      </div>

      <div className="relative z-10 w-full max-w-md">
        {/* Logo / Title */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-(--color-brand) text-white mb-4">
            <LogIn className="w-8 h-8" />
          </div>
          <h1 className="text-3xl font-bold text-(--color-text)">{APP_CONFIG.name}</h1>
          <p className="text-(--color-text-muted) mt-2">Sign in to your account</p>
        </div>

        {/* Login Card */}
        <div className="glass-strong rounded-2xl p-8 border border-(--color-border)">
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
            <Input
              label="Email Address"
              type="email"
              placeholder="you@example.com"
              leftIcon={<Mail className="w-5 h-5" />}
              error={errors.email?.message}
              required
              {...register('email')}
            />

            <Input
              label="Password"
              type="password"
              placeholder="••••••••"
              leftIcon={<Lock className="w-5 h-5" />}
              error={errors.password?.message}
              required
              {...register('password')}
            />

            <Button
              type="submit"
              variant="primary"
              fullWidth
              isLoading={isLoading}
              leftIcon={!isLoading ? <LogIn className="w-4 h-4" /> : undefined}
            >
              {isLoading ? 'Signing in...' : 'Sign In'}
            </Button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-sm text-(--color-text-muted)">
              Don&apos;t have an account?{' '}
              <Link
                to="/register"
                className="text-(--color-brand) hover:underline font-medium"
              >
                Create one
              </Link>
            </p>
          </div>
        </div>

        {/* Footer */}
        <p className="text-center text-xs text-(--color-text-muted) mt-6">
          {APP_CONFIG.name} &copy; {new Date().getFullYear()}
        </p>
      </div>
    </div>
  );
}
