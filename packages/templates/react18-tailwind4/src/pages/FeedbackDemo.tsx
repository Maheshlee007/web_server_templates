import { useState } from 'react';
import { 
  Card, 
  CardHeader, 
  CardTitle, 
  CardDescription,
  CardBody 
} from '@/components/UI/Card';
import { Button } from '@/components/UI/Buttons/Button';
import { 
  Spinner,
  Skeleton,
  SkeletonText,
  SkeletonCard,
  SkeletonAvatar,
  SkeletonButton,
  Progress,
  CircularProgress,
  toast,
  Toaster
} from '@/components/UI/Feedback';
import { Dialog } from '@/components/UI/radix/Dialog';
import { 
  CheckCircle, 
  XCircle, 
  AlertTriangle, 
  Info,
  Loader2,
  Download,
  Upload,
  Save,
  RefreshCw
} from 'lucide-react';

export default function FeedbackDemo() {
  const [progress, setProgress] = useState(45);
  const [loading, setLoading] = useState(false);
  const [alertOpen, setAlertOpen] = useState(false);
  const [alertType, setAlertType] = useState<'success' | 'error' | 'warning' | 'info'>('success');

  const simulateProgress = () => {
    setProgress(0);
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          return 100;
        }
        return prev + 10;
      });
    }, 300);
  };

  const simulateLoading = () => {
    setLoading(true);
    setTimeout(() => setLoading(false), 2000);
  };

  const showAlert = (type: 'success' | 'error' | 'warning' | 'info') => {
    setAlertType(type);
    setAlertOpen(true);
  };

  const alertConfig = {
    success: {
      title: 'Success!',
      description: 'Your changes have been saved successfully.',
      icon: <CheckCircle className="w-6 h-6 text-green-500" />,
    },
    error: {
      title: 'Error',
      description: 'Failed to save changes. Please try again.',
      icon: <XCircle className="w-6 h-6 text-red-500" />,
    },
    warning: {
      title: 'Warning',
      description: 'Your session will expire in 5 minutes.',
      icon: <AlertTriangle className="w-6 h-6 text-amber-500" />,
    },
    info: {
      title: 'Information',
      description: 'A new update is available. Restart to apply.',
      icon: <Info className="w-6 h-6 text-blue-500" />,
    },
  };

  return (
    <div className="min-h-screen bg-(--color-bg) p-8">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Header */}
        <div>
          <h1 className="text-4xl font-bold text-(--color-text) mb-2">
            Feedback Components 🔔
          </h1>
          <p className="text-(--color-text-secondary)">
            Toast notifications, alerts, loading states, and progress indicators
          </p>
        </div>

        {/* Toast Notifications */}
        <Card>
          <CardHeader>
            <CardTitle>Toast Notifications (Sonner)</CardTitle>
            <CardDescription>
              Non-intrusive notifications that appear temporarily
            </CardDescription>
          </CardHeader>
          <CardBody>
            <div className="flex flex-wrap gap-3">
              <Button
                variant="success"
                onClick={() => toast.success('Operation completed!', {
                  description: 'Your changes have been saved successfully.'
                })}
              >
                Success Toast
              </Button>
              
              <Button
                variant="danger"
                onClick={() => toast.error('Something went wrong!', {
                  description: 'Failed to save changes. Please try again.'
                })}
              >
                Error Toast
              </Button>
              
              <Button
                variant="warning"
                onClick={() => toast.warning('Session expiring soon', {
                  description: 'You will be logged out in 5 minutes.'
                })}
              >
                Warning Toast
              </Button>
              
              <Button
                variant="secondary"
                onClick={() => toast.info('New update available', {
                  description: 'Version 2.0.0 is ready to install.'
                })}
              >
                Info Toast
              </Button>

              <Button
                variant="outline"
                onClick={() => {
                  const loadingToast = toast.loading('Saving...');
                  setTimeout(() => {
                    toast.dismiss(loadingToast);
                    toast.success('Saved successfully!');
                  }, 2000);
                }}
              >
                Loading Toast
              </Button>

              <Button
                variant="gradient"
                onClick={() => {
                  toast.promise(
                    new Promise((resolve) => setTimeout(resolve, 2000)),
                    {
                      loading: 'Uploading file...',
                      success: 'File uploaded successfully!',
                      error: 'Failed to upload file',
                    }
                  );
                }}
              >
                Promise Toast
              </Button>

              <Button
                variant="ghost"
                onClick={() => toast.custom('Custom notification', {
                  action: {
                    label: 'Undo',
                    onClick: () => toast.info('Undo clicked!'),
                  },
                })}
              >
                With Action
              </Button>
            </div>
          </CardBody>
        </Card>

        {/* Alert Dialogs */}
        <Card>
          <CardHeader>
            <CardTitle>Alert Dialogs</CardTitle>
            <CardDescription>
              Important messages that require user attention (using Dialog component)
            </CardDescription>
          </CardHeader>
          <CardBody>
            <div className="flex flex-wrap gap-3">
              <Button variant="success" onClick={() => showAlert('success')}>
                Success Alert
              </Button>
              <Button variant="danger" onClick={() => showAlert('error')}>
                Error Alert
              </Button>
              <Button variant="warning" onClick={() => showAlert('warning')}>
                Warning Alert
              </Button>
              <Button variant="secondary" onClick={() => showAlert('info')}>
                Info Alert
              </Button>
            </div>

            <Dialog
              open={alertOpen}
              onOpenChange={setAlertOpen}
              title={alertConfig[alertType].title}
              description={alertConfig[alertType].description}
              size="sm"
            >
              <div className="flex flex-col items-center gap-4 py-4">
                {alertConfig[alertType].icon}
                <div className="text-center space-y-2">
                  <h3 className="text-lg font-semibold text-(--color-text)">
                    {alertConfig[alertType].title}
                  </h3>
                  <p className="text-sm text-(--color-text-secondary)">
                    {alertConfig[alertType].description}
                  </p>
                </div>
                <div className="flex gap-2 w-full">
                  <Button 
                    variant="ghost" 
                    fullWidth 
                    onClick={() => setAlertOpen(false)}
                  >
                    Cancel
                  </Button>
                  <Button 
                    fullWidth 
                    onClick={() => {
                      toast.success('Confirmed!');
                      setAlertOpen(false);
                    }}
                  >
                    Confirm
                  </Button>
                </div>
              </div>
            </Dialog>
          </CardBody>
        </Card>

        {/* Spinners */}
        <Card>
          <CardHeader>
            <CardTitle>Spinners</CardTitle>
            <CardDescription>Loading indicators for async operations</CardDescription>
          </CardHeader>
          <CardBody>
            <div className="space-y-6">
              {/* Sizes */}
              <div>
                <h4 className="text-sm font-medium text-(--color-text) mb-3">Sizes</h4>
                <div className="flex items-end gap-4">
                  <Spinner size="xs" />
                  <Spinner size="sm" />
                  <Spinner size="md" />
                  <Spinner size="lg" />
                  <Spinner size="xl" />
                </div>
              </div>

              {/* Variants */}
              <div>
                <h4 className="text-sm font-medium text-(--color-text) mb-3">Variants</h4>
                <div className="flex items-center gap-6">
                  <Spinner variant="primary" />
                  <Spinner variant="secondary" />
                  <div className="bg-blue-600 p-3 rounded">
                    <Spinner variant="white" />
                  </div>
                </div>
              </div>

              {/* With Label */}
              <div>
                <h4 className="text-sm font-medium text-(--color-text) mb-3">With Label</h4>
                <div className="flex flex-wrap gap-4">
                  <Spinner label="Loading..." />
                  <Spinner label="Please wait..." size="lg" />
                </div>
              </div>

              {/* In Buttons */}
              <div>
                <h4 className="text-sm font-medium text-(--color-text) mb-3">In Buttons</h4>
                <div className="flex flex-wrap gap-3">
                  <Button isLoading>Saving...</Button>
                  <Button variant="secondary" isLoading>Processing</Button>
                  <Button 
                    variant="outline" 
                    isLoading={loading}
                    onClick={simulateLoading}
                  >
                    {loading ? 'Loading...' : 'Click Me'}
                  </Button>
                </div>
              </div>
            </div>
          </CardBody>
        </Card>

        {/* Progress Bars */}
        <Card>
          <CardHeader>
            <CardTitle>Progress Bars</CardTitle>
            <CardDescription>Show completion status of operations</CardDescription>
          </CardHeader>
          <CardBody>
            <div className="space-y-8">
              {/* Linear Progress */}
              <div>
                <h4 className="text-sm font-medium text-(--color-text) mb-4">Linear Progress</h4>
                <div className="space-y-6">
                  <Progress value={progress} showLabel={false} label="Upload Progress" />
                  <Progress value={75} variant="success" showLabel label="Success" />
                  <Progress value={50} variant="warning" showLabel label="Warning" />
                  <Progress value={25} variant="error" showLabel label="Error" />
                  <Progress value={90} variant="gradient" showLabel label="Gradient" size="lg" />
                  <Progress showLabel label="Indeterminate" /> {/* No value = indeterminate */}
                  
                  <Button onClick={simulateProgress} size="sm">
                    Simulate Progress
                  </Button>
                </div>
              </div>

              {/* Circular Progress */}
              <div>
                <h4 className="text-sm font-medium text-(--color-text) mb-4">Circular Progress</h4>
                <div className="flex flex-wrap items-center gap-8">
                  <CircularProgress value={progress} showLabel size={64} />
                  <CircularProgress value={75} variant="success" showLabel size={72} strokeWidth={6} />
                  <CircularProgress value={50} variant="warning" showLabel />
                  <CircularProgress value={25} variant="error" showLabel />
                  <CircularProgress size={56} /> {/* Indeterminate */}
                </div>
              </div>
            </div>
          </CardBody>
        </Card>

        {/* Skeleton Loaders */}
        <Card>
          <CardHeader>
            <CardTitle>Skeleton Loaders</CardTitle>
            <CardDescription>
              Content placeholders for better perceived performance
            </CardDescription>
          </CardHeader>
          <CardBody>
            <div className="grid md:grid-cols-2 gap-6">
              {/* Basic Skeletons */}
              <div className="space-y-4">
                <h4 className="text-sm font-medium text-(--color-text)">Basic Shapes</h4>
                <Skeleton variant="rectangular" height={100} />
                <Skeleton variant="circular" width={60} height={60} />
                <Skeleton variant="text" />
                <SkeletonText lines={3} />
              </div>

              {/* Compound Skeletons */}
              <div className="space-y-4">
                <h4 className="text-sm font-medium text-(--color-text)">Compound Components</h4>
                <div className="flex items-center gap-3">
                  <SkeletonAvatar size={48} />
                  <div className="flex-1 space-y-1">
                    <Skeleton variant="text" width="80%" />
                    <Skeleton variant="text" width="40%" />
                  </div>
                </div>
                <SkeletonButton />
              </div>

              {/* Card Skeleton */}
              <div className="md:col-span-2">
                <h4 className="text-sm font-medium text-(--color-text) mb-3">Card Skeleton</h4>
                <SkeletonCard className="border border-(--color-border) rounded-lg" />
              </div>

              {/* Wave Animation */}
              <div className="md:col-span-2">
                <h4 className="text-sm font-medium text-(--color-text) mb-3">Wave Animation</h4>
                <Skeleton variant="rectangular" height={80} animation="wave"  className='bg-gray/50'/>
              </div>
            </div>
          </CardBody>
        </Card>

        {/* Loading States in Context */}
        <Card>
          <CardHeader>
            <CardTitle>Real-World Examples</CardTitle>
            <CardDescription>
              Loading states in common UI patterns
            </CardDescription>
          </CardHeader>
          <CardBody>
            <div className="grid md:grid-cols-2 gap-6">
              {/* Form Loading */}
              <div className="space-y-3">
                <h4 className="text-sm font-medium text-(--color-text) mb-3">
                  Form Submission
                </h4>
                <div className="space-y-3 p-4 border border-(--color-border) rounded-lg">
                  <SkeletonText lines={1} />
                  <Skeleton variant="rectangular" height={40} />
                  <SkeletonButton />
                </div>
              </div>

              {/* List Loading */}
              <div className="space-y-3">
                <h4 className="text-sm font-medium text-(--color-text) mb-3">
                  List Loading
                </h4>
                <div className="space-y-3">
                  {[1, 2, 3].map((i) => (
                    <div key={i} className="flex items-center gap-3 p-3 border border-(--color-border) rounded-lg">
                      <SkeletonAvatar />
                      <div className="flex-1">
                        <Skeleton variant="text" width="70%" />
                        <Skeleton variant="text" width="40%" />
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="space-y-3">
                <h4 className="text-sm font-medium text-(--color-text) mb-3">
                  Action Buttons
                </h4>
                <div className="flex flex-wrap gap-2">
                  <Button leftIcon={<Download className="w-4 h-4" />}>
                    Download
                  </Button>
                  <Button 
                    variant="secondary" 
                    leftIcon={<Upload className="w-4 h-4" />}
                    isLoading
                  >
                    Uploading...
                  </Button>
                  <Button 
                    variant="outline" 
                    leftIcon={<Save className="w-4 h-4" />}
                  >
                    Save
                  </Button>
                  <Button 
                    variant="ghost" 
                    leftIcon={<RefreshCw className="w-4 h-4" />}
                  >
                    Refresh
                  </Button>
                </div>
              </div>
            </div>
          </CardBody>
        </Card>
      </div>      
    </div>
  );
}
