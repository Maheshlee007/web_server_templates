import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { UserPlus, Mail, Lock, User } from 'lucide-react';
import { useAuthStore } from '@/store/authStore';
import { authApi } from '@/services/authService';
import { Input } from '@/components/UI/Input';
import { Button } from '@/components/UI/Buttons/Button';
import { toast } from '@/components/UI/Feedback/Toast';
import { APP_CONFIG } from '@/config/app';

const registerSchema = z
  .object({
    firstName: z.string().min(1, 'First name is required').max(100),
    lastName: z.string().min(1, 'Last name is required').max(100),
    email: z.string().email('Please enter a valid email'),
    password: z
      .string()
      .min(8, 'Password must be at least 8 characters')
      .regex(/[A-Z]/, 'Must contain an uppercase letter')
      .regex(/[a-z]/, 'Must contain a lowercase letter')
      .regex(/[0-9]/, 'Must contain a number'),
    confirmPassword: z.string().min(1, 'Please confirm your password'),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'Passwords do not match',
    path: ['confirmPassword'],
  });

type RegisterForm = z.infer<typeof registerSchema>;

export function Register() {
  const navigate = useNavigate();
  const { loginSuccess } = useAuthStore();
  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterForm>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      firstName: '',
      lastName: '',
      email: '',
      password: '',
      confirmPassword: '',
    },
  });

  const onSubmit = async (data: RegisterForm) => {
    setIsLoading(true);
    try {
      const response = await authApi.register({
        email: data.email,
        password: data.password,
        firstName: data.firstName,
        lastName: data.lastName,
      });

      if (response.success && response.data) {
        const { user, accessToken, refreshToken } = response.data;
        loginSuccess(user, accessToken, refreshToken);
        toast.success(`Welcome, ${user.firstName}! Your account has been created.`);
        navigate('/', { replace: true });
      } else {
        toast.error(response.message || 'Registration failed');
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
    <div className="min-h-screen flex items-center justify-center bg-(--color-bg) px-4 py-12">
      {/* Background blobs */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="blob blob-primary w-125 h-125 -top-32 -right-32" />
        <div className="blob blob-primary w-100 h-100 -bottom-48 -left-16 blob-delay-4s" />
      </div>

      <div className="relative z-10 w-full max-w-md">
        {/* Logo / Title */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-(--color-brand) text-white mb-4">
            <UserPlus className="w-8 h-8" />
          </div>
          <h1 className="text-3xl font-bold text-(--color-text)">{APP_CONFIG.name}</h1>
          <p className="text-(--color-text-muted) mt-2">Create your account</p>
        </div>

        {/* Register Card */}
        <div className="glass-strong rounded-2xl p-8 border border-(--color-border)">
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <Input
                label="First Name"
                type="text"
                placeholder="John"
                leftIcon={<User className="w-5 h-5" />}
                error={errors.firstName?.message}
                required
                {...register('firstName')}
              />
              <Input
                label="Last Name"
                type="text"
                placeholder="Doe"
                error={errors.lastName?.message}
                required
                {...register('lastName')}
              />
            </div>

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
              placeholder="Min 8 chars, 1 upper, 1 lower, 1 number"
              leftIcon={<Lock className="w-5 h-5" />}
              error={errors.password?.message}
              required
              {...register('password')}
            />

            <Input
              label="Confirm Password"
              type="password"
              placeholder="••••••••"
              leftIcon={<Lock className="w-5 h-5" />}
              error={errors.confirmPassword?.message}
              required
              {...register('confirmPassword')}
            />

            <Button
              type="submit"
              variant="primary"
              fullWidth
              isLoading={isLoading}
              leftIcon={!isLoading ? <UserPlus className="w-4 h-4" /> : undefined}
            >
              {isLoading ? 'Creating Account...' : 'Create Account'}
            </Button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-sm text-(--color-text-muted)">
              Already have an account?{' '}
              <Link
                to="/login"
                className="text-(--color-brand) hover:underline font-medium"
              >
                Sign in
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
