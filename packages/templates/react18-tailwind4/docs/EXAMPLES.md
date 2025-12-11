# Component Examples

Real-world examples of component combinations and patterns.

---

## 📋 Table of Contents

- [Form Patterns](#form-patterns)
- [Card Layouts](#card-layouts)
- [Modal Patterns](#modal-patterns)
- [List Patterns](#list-patterns)
- [Dashboard Patterns](#dashboard-patterns)
- [Loading States](#loading-states)

---

## Form Patterns

### Login Form

```tsx
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from '@/components/UI/Card';
import { Input } from '@/components/UI/Input';
import { Button } from '@/components/UI/Buttons';
import { Mail, Lock } from 'lucide-react';
import { toast } from '@/components/UI/Feedback';

function LoginForm() {
  const [isLoading, setIsLoading] = useState(false);
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    try {
      await login(email, password);
      toast.success('Welcome back!');
      navigate('/dashboard');
    } catch (error) {
      toast.error('Invalid credentials');
    } finally {
      setIsLoading(false);
    }
  };
  
  return (
    <Card size="md" variant="elevated" className="mx-auto mt-20">
      <CardHeader>
        <CardTitle>Sign In</CardTitle>
      </CardHeader>
      <form onSubmit={handleSubmit}>
        <CardContent>
          <div className="space-y-4">
            <Input
              label="Email"
              type="email"
              leftIcon={<Mail className="w-5 h-5" />}
              placeholder="you@example.com"
              required
            />
            <Input
              label="Password"
              type="password"
              leftIcon={<Lock className="w-5 h-5" />}
              placeholder="••••••••"
              required
            />
          </div>
        </CardContent>
        <CardFooter>
          <Button 
            type="submit" 
            fullWidth 
            isLoading={isLoading}
          >
            {isLoading ? 'Signing in...' : 'Sign In'}
          </Button>
        </CardFooter>
      </form>
    </Card>
  );
}
```

### Contact Form with Validation

```tsx
import { Input } from '@/components/UI/Input';
import { Button } from '@/components/UI/Buttons';
import { toast } from '@/components/UI/Feedback';

function ContactForm() {
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    
    // Validation
    const newErrors = {};
    if (!formData.get('name')) {
      newErrors.name = 'Name is required';
    }
    if (!formData.get('email')?.includes('@')) {
      newErrors.email = 'Valid email required';
    }
    if (formData.get('message')?.length < 10) {
      newErrors.message = 'Message must be at least 10 characters';
    }
    
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }
    
    setIsSubmitting(true);
    try {
      await submitContact(formData);
      toast.success('Message sent successfully!');
      e.target.reset();
      setErrors({});
    } catch (error) {
      toast.error('Failed to send message');
    } finally {
      setIsSubmitting(false);
    }
  };
  
  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <Input
        name="name"
        label="Name"
        placeholder="John Doe"
        error={errors.name}
        required
      />
      <Input
        name="email"
        label="Email"
        type="email"
        placeholder="john@example.com"
        error={errors.email}
        required
      />
      <Input
        name="message"
        label="Message"
        multiline
        rows={6}
        maxLength={500}
        showCharCount
        placeholder="Your message..."
        error={errors.message}
        required
      />
      <Button 
        type="submit" 
        size="lg" 
        fullWidth
        isLoading={isSubmitting}
      >
        {isSubmitting ? 'Sending...' : 'Send Message'}
      </Button>
    </form>
  );
}
```

### Multi-Step Form

```tsx
import { Progress } from '@/components/UI/Feedback';
import { Button } from '@/components/UI/Buttons';
import { Input } from '@/components/UI/Input';

function MultiStepForm() {
  const [step, setStep] = useState(1);
  const totalSteps = 3;
  const progress = (step / totalSteps) * 100;
  
  return (
    <div className="max-w-2xl mx-auto">
      {/* Progress indicator */}
      <div className="mb-8">
        <div className="flex justify-between text-sm mb-2">
          <span>Step {step} of {totalSteps}</span>
          <span>{Math.round(progress)}%</span>
        </div>
        <Progress value={progress} variant="success" />
      </div>
      
      {/* Step content */}
      <Card>
        <CardHeader>
          <CardTitle>
            {step === 1 && 'Personal Information'}
            {step === 2 && 'Contact Details'}
            {step === 3 && 'Review & Submit'}
          </CardTitle>
        </CardHeader>
        <CardContent>
          {step === 1 && (
            <div className="space-y-4">
              <Input label="First Name" required />
              <Input label="Last Name" required />
              <Input label="Date of Birth" type="date" required />
            </div>
          )}
          {step === 2 && (
            <div className="space-y-4">
              <Input label="Email" type="email" required />
              <Input label="Phone" type="tel" required />
              <Input label="Address" multiline rows={3} />
            </div>
          )}
          {step === 3 && (
            <div className="space-y-2">
              <p>Review your information...</p>
            </div>
          )}
        </CardContent>
        <CardFooter>
          {step > 1 && (
            <Button 
              variant="outline" 
              onClick={() => setStep(step - 1)}
            >
              Previous
            </Button>
          )}
          {step < totalSteps ? (
            <Button onClick={() => setStep(step + 1)}>
              Next
            </Button>
          ) : (
            <Button>Submit</Button>
          )}
        </CardFooter>
      </Card>
    </div>
  );
}
```

---

## Card Layouts

### Product Grid

```tsx
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/UI/Card';
import { Button } from '@/components/UI/Buttons';
import { ShoppingCart } from 'lucide-react';

function ProductGrid({ products }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {products.map(product => (
        <Card key={product.id} variant="elevated" hoverable>
          <CardHeader>
            <img 
              src={product.image} 
              alt={product.name}
              className="w-full h-48 object-cover rounded-lg mb-4"
            />
            <CardTitle>{product.name}</CardTitle>
            <CardDescription>${product.price}</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-(--color-text-secondary)">
              {product.description}
            </p>
          </CardContent>
          <CardFooter>
            <Button 
              fullWidth 
              icon={<ShoppingCart className="w-4 h-4" />}
              onClick={() => addToCart(product.id)}
            >
              Add to Cart
            </Button>
          </CardFooter>
        </Card>
      ))}
    </div>
  );
}
```

### Stats Dashboard

```tsx
import { Card, CardHeader, CardTitle, CardContent } from '@/components/UI/Card';
import { TrendingUp, Users, DollarSign, ShoppingBag } from 'lucide-react';

function StatsDashboard() {
  const stats = [
    { 
      title: 'Total Revenue', 
      value: '$45,231', 
      change: '+12.5%',
      icon: <DollarSign className="w-6 h-6" />,
      trend: 'up'
    },
    { 
      title: 'Active Users', 
      value: '2,345', 
      change: '+8.2%',
      icon: <Users className="w-6 h-6" />,
      trend: 'up'
    },
    { 
      title: 'Total Orders', 
      value: '892', 
      change: '-3.1%',
      icon: <ShoppingBag className="w-6 h-6" />,
      trend: 'down'
    },
    { 
      title: 'Growth Rate', 
      value: '23.5%', 
      change: '+5.2%',
      icon: <TrendingUp className="w-6 h-6" />,
      trend: 'up'
    },
  ];
  
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {stats.map(stat => (
        <Card key={stat.title} variant="outline">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="text-sm font-medium">
                {stat.title}
              </CardTitle>
              <div className="text-(--color-text-muted)">
                {stat.icon}
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{stat.value}</div>
            <p className={`text-sm ${
              stat.trend === 'up' ? 'text-green-500' : 'text-red-500'
            }`}>
              {stat.change} from last month
            </p>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
```

### Profile Card

```tsx
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/UI/Card';
import { Button } from '@/components/UI/Buttons';
import { Mail, MapPin, Calendar } from 'lucide-react';

function ProfileCard({ user }) {
  return (
    <Card variant="glass" size="md">
      <CardHeader>
        <div className="flex items-center gap-4">
          <img 
            src={user.avatar} 
            alt={user.name}
            className="w-20 h-20 rounded-full"
          />
          <div>
            <CardTitle>{user.name}</CardTitle>
            <CardDescription>{user.role}</CardDescription>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          <div className="flex items-center gap-2 text-sm">
            <Mail className="w-4 h-4 text-(--color-text-muted)" />
            <span>{user.email}</span>
          </div>
          <div className="flex items-center gap-2 text-sm">
            <MapPin className="w-4 h-4 text-(--color-text-muted)" />
            <span>{user.location}</span>
          </div>
          <div className="flex items-center gap-2 text-sm">
            <Calendar className="w-4 h-4 text-(--color-text-muted)" />
            <span>Joined {user.joinDate}</span>
          </div>
        </div>
      </CardContent>
      <CardFooter>
        <Button variant="outline" fullWidth>
          View Profile
        </Button>
      </CardFooter>
    </Card>
  );
}
```

---

## Modal Patterns

### Confirmation Dialog

```tsx
import { Dialog } from '@/components/UI/radix';
import { Button } from '@/components/UI/Buttons';
import { AlertTriangle } from 'lucide-react';

function DeleteConfirmation() {
  const [open, setOpen] = useState(false);
  
  const handleDelete = () => {
    // Perform delete
    toast.success('Item deleted');
    setOpen(false);
  };
  
  return (
    <>
      <Button 
        variant="danger" 
        onClick={() => setOpen(true)}
      >
        Delete Item
      </Button>
      
      <Dialog
        open={open}
        onOpenChange={setOpen}
        title="Delete Item"
        description="This action cannot be undone"
        size="sm"
      >
        <div className="flex flex-col items-center gap-4 p-6">
          <AlertTriangle className="w-12 h-12 text-red-500" />
          <p className="text-center">
            Are you sure you want to delete this item? 
            This action is permanent.
          </p>
          <div className="flex gap-2 w-full">
            <Button 
              variant="outline" 
              fullWidth
              onClick={() => setOpen(false)}
            >
              Cancel
            </Button>
            <Button 
              variant="danger" 
              fullWidth
              onClick={handleDelete}
            >
              Delete
            </Button>
          </div>
        </div>
      </Dialog>
    </>
  );
}
```

### Form in Modal

```tsx
import { Dialog } from '@/components/UI/radix';
import { Input } from '@/components/UI/Input';
import { Button } from '@/components/UI/Buttons';
import { Select } from '@/components/UI/radix';

function CreateProjectModal() {
  const [open, setOpen] = useState(false);
  
  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission
    toast.success('Project created!');
    setOpen(false);
  };
  
  return (
    <>
      <Button onClick={() => setOpen(true)}>
        New Project
      </Button>
      
      <Dialog
        open={open}
        onOpenChange={setOpen}
        title="Create New Project"
        size="lg"
      >
        <form onSubmit={handleSubmit} className="p-6">
          <div className="space-y-4">
            <Input 
              label="Project Name" 
              placeholder="My Awesome Project"
              required 
            />
            <Input 
              label="Description" 
              multiline 
              rows={4}
              placeholder="Project description..."
            />
            <Select
              label="Template"
              value={template}
              onValueChange={setTemplate}
              options={templateOptions}
            />
            <div className="flex gap-2 justify-end pt-4">
              <Button 
                type="button"
                variant="outline" 
                onClick={() => setOpen(false)}
              >
                Cancel
              </Button>
              <Button type="submit">
                Create Project
              </Button>
            </div>
          </div>
        </form>
      </Dialog>
    </>
  );
}
```

---

## List Patterns

### User List with Actions

```tsx
import { Card } from '@/components/UI/Card';
import { Button } from '@/components/UI/Buttons';
import { ContextMenu } from '@/components/UI/radix';
import { Edit, Trash, Mail } from 'lucide-react';

function UserList({ users }) {
  const menuItems = (userId) => [
    { 
      id: 'edit', 
      label: 'Edit', 
      icon: <Edit className="w-4 h-4" />,
      onClick: () => handleEdit(userId)
    },
    { 
      id: 'email', 
      label: 'Send Email', 
      icon: <Mail className="w-4 h-4" />,
      onClick: () => handleEmail(userId)
    },
    { id: 'sep', type: 'separator', label: '' },
    { 
      id: 'delete', 
      label: 'Delete', 
      icon: <Trash className="w-4 h-4" />,
      onClick: () => handleDelete(userId)
    },
  ];
  
  return (
    <div className="space-y-3">
      {users.map(user => (
        <ContextMenu key={user.id} items={menuItems(user.id)}>
          <Card variant="outline" padding="sm" hoverable>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <img 
                  src={user.avatar} 
                  alt={user.name}
                  className="w-12 h-12 rounded-full"
                />
                <div>
                  <div className="font-medium">{user.name}</div>
                  <div className="text-sm text-(--color-text-muted)">
                    {user.email}
                  </div>
                </div>
              </div>
              <div className="flex gap-2">
                <Button 
                  size="sm" 
                  variant="outline"
                  icon={<Edit className="w-4 h-4" />}
                >
                  Edit
                </Button>
                <Button 
                  size="sm" 
                  variant="danger"
                  icon={<Trash className="w-4 h-4" />}
                >
                  Delete
                </Button>
              </div>
            </div>
          </Card>
        </ContextMenu>
      ))}
    </div>
  );
}
```

---

## Loading States

### Skeleton Loading

```tsx
import { Skeleton, SkeletonCard, SkeletonAvatar, SkeletonText } from '@/components/UI/Feedback';

function LoadingState() {
  return (
    <div>
      {/* Loading profile */}
      <div className="flex items-start gap-4 mb-8">
        <SkeletonAvatar size={64} />
        <div className="flex-1">
          <Skeleton variant="text" width="60%" className="mb-2" />
          <Skeleton variant="text" width="80%" />
        </div>
      </div>
      
      {/* Loading cards */}
      <div className="grid grid-cols-3 gap-4">
        <SkeletonCard />
        <SkeletonCard />
        <SkeletonCard />
      </div>
      
      {/* Loading list */}
      <div className="space-y-3 mt-8">
        {[1, 2, 3].map(i => (
          <div key={i} className="flex items-center gap-3">
            <SkeletonAvatar size={40} />
            <div className="flex-1">
              <Skeleton variant="text" width="70%" />
              <Skeleton variant="text" width="50%" className="mt-1" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// Use with conditional rendering
function MyPage() {
  const { data, isLoading } = useQuery('users', fetchUsers);
  
  if (isLoading) return <LoadingState />;
  
  return <UserList users={data} />;
}
```

### Progress Upload

```tsx
import { Progress } from '@/components/UI/Feedback';
import { Button } from '@/components/UI/Buttons';
import { Upload, CheckCircle } from 'lucide-react';

function FileUpload() {
  const [progress, setProgress] = useState(0);
  const [uploading, setUploading] = useState(false);
  
  const handleUpload = async (file) => {
    setUploading(true);
    
    // Simulate upload progress
    for (let i = 0; i <= 100; i += 10) {
      await new Promise(resolve => setTimeout(resolve, 200));
      setProgress(i);
    }
    
    toast.success('Upload complete!');
    setUploading(false);
  };
  
  return (
    <div className="space-y-4">
      {uploading ? (
        <>
          <div className="flex justify-between text-sm">
            <span>Uploading file.pdf</span>
            <span>{progress}%</span>
          </div>
          <Progress value={progress} variant="success" />
        </>
      ) : progress === 100 ? (
        <div className="flex items-center gap-2 text-green-500">
          <CheckCircle className="w-5 h-5" />
          <span>Upload complete!</span>
        </div>
      ) : (
        <Button 
          icon={<Upload className="w-4 h-4" />}
          onClick={handleUpload}
        >
          Upload File
        </Button>
      )}
    </div>
  );
}
```

---

## 🔗 Related Documentation

- [Component Guide](./COMPONENTS.md) - Individual component props
- [Layout Guide](./LAYOUT.md) - Layout patterns
- [API Reference](./API_REFERENCE.md) - Type definitions

---

**Need more examples?** Check the demo pages in `/src/pages/ComponentsDemo.tsx` and `/src/pages/FeedbackDemo.tsx`!
