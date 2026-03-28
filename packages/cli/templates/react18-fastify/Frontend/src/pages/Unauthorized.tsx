import { useNavigate } from 'react-router-dom';
import { ShieldX, ArrowLeft, LogIn } from 'lucide-react';
import { Button } from '@/components/UI/Buttons/Button';
import { useAuthStore } from '@/store/authStore';

/**
 * Unauthorized page — shown when a user doesn't have required role/permission
 */
export function Unauthorized() {
  const navigate = useNavigate();
  const { user, isAuthenticated } = useAuthStore();

  return (
    <div className="min-h-[60vh] flex items-center justify-center px-4">
      <div className="text-center max-w-md">
        <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-red-500/10 mb-6">
          <ShieldX className="w-10 h-10 text-red-500" />
        </div>

        <h1 className="text-3xl font-bold text-(--color-text) mb-2">Access Denied</h1>
        <p className="text-(--color-text-muted) mb-2">
          You don&apos;t have permission to access this page.
        </p>

        {isAuthenticated && user && (
          <p className="text-sm text-(--color-text-muted) mb-6">
            Signed in as <span className="font-medium text-(--color-text)">{user.email}</span>
            {user.roles.length > 0 && (
              <span className="block mt-1">
                Role{user.roles.length > 1 ? 's' : ''}:{' '}
                {user.roles.map((r) => (
                  <span
                    key={r}
                    className="inline-block px-2 py-0.5 text-xs rounded-full bg-(--color-brand)/10 text-(--color-brand) mr-1"
                  >
                    {r}
                  </span>
                ))}
              </span>
            )}
          </p>
        )}

        <div className="flex justify-center gap-3">
          <Button variant="outline" leftIcon={<ArrowLeft className="w-4 h-4" />} onClick={() => navigate(-1)}>
            Go Back
          </Button>
          {!isAuthenticated && (
            <Button variant="primary" leftIcon={<LogIn className="w-4 h-4" />} onClick={() => navigate('/login')}>
              Sign In
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}
