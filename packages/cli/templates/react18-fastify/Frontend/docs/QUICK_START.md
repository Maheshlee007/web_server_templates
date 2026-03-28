# Quick Start Guide

Build your first feature in 5 minutes! ⚡

---

## 🎯 What We'll Build

A simple user profile page with:
- Profile card with avatar
- Edit form in a modal
- Toast notifications
- Theme switching

**Time estimate:** 5 minutes

---

## Step 1: Create the Page (1 min)

Create `src/pages/Profile.tsx`:

```tsx
import { useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from '@/components/UI/Card';
import { Button } from '@/components/UI/Buttons';
import { Dialog } from '@/components/UI/radix';
import { Input } from '@/components/UI/Input';
import { toast } from '@/components/UI/Feedback';
import { Edit, Mail, MapPin } from 'lucide-react';

export default function Profile() {
  const [editOpen, setEditOpen] = useState(false);
  const [user, setUser] = useState({
    name: 'John Doe',
    email: 'john@example.com',
    location: 'San Francisco, CA',
    avatar: 'https://ui-avatars.com/api/?name=John+Doe&size=128'
  });

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    const formData = new FormData(e.target as HTMLFormElement);
    
    setUser({
      ...user,
      name: formData.get('name') as string,
      email: formData.get('email') as string,
      location: formData.get('location') as string,
    });
    
    setEditOpen(false);
    toast.success('Profile updated successfully!');
  };

  return (
    <div className="max-w-2xl mx-auto p-6">
      {/* Profile Card */}
      <Card variant="elevated">
        <CardHeader>
          <div className="flex items-center gap-4">
            <img 
              src={user.avatar} 
              alt={user.name}
              className="w-20 h-20 rounded-full"
            />
            <div>
              <CardTitle>{user.name}</CardTitle>
              <p className="text-(--color-text-muted)">{user.email}</p>
            </div>
          </div>
        </CardHeader>
        
        <CardContent>
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <Mail className="w-4 h-4 text-(--color-text-muted)" />
              <span>{user.email}</span>
            </div>
            <div className="flex items-center gap-2">
              <MapPin className="w-4 h-4 text-(--color-text-muted)" />
              <span>{user.location}</span>
            </div>
          </div>
        </CardContent>
        
        <CardFooter>
          <Button 
            icon={<Edit className="w-4 h-4" />}
            onClick={() => setEditOpen(true)}
          >
            Edit Profile
          </Button>
        </CardFooter>
      </Card>

      {/* Edit Modal */}
      <Dialog
        open={editOpen}
        onOpenChange={setEditOpen}
        title="Edit Profile"
        size="md"
      >
        <form onSubmit={handleSave} className="p-6">
          <div className="space-y-4">
            <Input
              name="name"
              label="Name"
              defaultValue={user.name}
              required
            />
            <Input
              name="email"
              label="Email"
              type="email"
              defaultValue={user.email}
              required
            />
            <Input
              name="location"
              label="Location"
              defaultValue={user.location}
            />
            
            <div className="flex gap-2 justify-end pt-4">
              <Button 
                type="button"
                variant="outline" 
                onClick={() => setEditOpen(false)}
              >
                Cancel
              </Button>
              <Button type="submit">
                Save Changes
              </Button>
            </div>
          </div>
        </form>
      </Dialog>
    </div>
  );
}
```

---

## Step 2: Add Route (30 sec)

Open `src/App.tsx` and add the route:

```tsx
import Profile from './pages/Profile';

// Inside <Routes>
<Route path="/profile" element={<Profile />} />
```

---

## Step 3: Add Navigation (30 sec)

Open `src/layout/navigation.tsx`:

```tsx
import { User } from 'lucide-react';

// Add to navItems array
{
  id: 'profile',
  label: 'Profile',
  icon: <User className="w-5 h-5" />,
  path: '/profile'
}
```

---

## Step 4: Test It! (2 min)

1. **Start dev server** (if not running):
   ```bash
   pnpm dev
   ```

2. **Visit** `http://localhost:5173/profile`

3. **Try these features**:
   - ✅ See profile card with avatar
   - ✅ Click "Edit Profile" to open modal
   - ✅ Change name/email/location
   - ✅ Click "Save Changes"
   - ✅ See success toast
   - ✅ Profile card updates!

4. **Test theme switching**:
   - Click theme selector in top-right
   - Switch between Light, Dark, Glass, Midnight

---

## 🎉 You're Done!

You just built a complete feature with:
- ✅ Styled components (Card, Button, Input, Dialog)
- ✅ Form handling
- ✅ Toast notifications
- ✅ Modal dialog
- ✅ Navigation integration
- ✅ Theme support

---

## 🚀 What's Next?

### Add More Features

**Add a loading state:**
```tsx
const [isSaving, setIsSaving] = useState(false);

const handleSave = async (e) => {
  e.preventDefault();
  setIsSaving(true);
  
  // Simulate API call
  await new Promise(resolve => setTimeout(resolve, 1000));
  
  // Update user...
  setIsSaving(false);
  toast.success('Profile updated!');
};

// In form
<Button type="submit" isLoading={isSaving}>
  {isSaving ? 'Saving...' : 'Save Changes'}
</Button>
```

**Add avatar upload:**
```tsx
import { Upload } from 'lucide-react';

const handleAvatarChange = (e) => {
  const file = e.target.files[0];
  if (file) {
    const reader = new FileReader();
    reader.onloadend = () => {
      setUser({ ...user, avatar: reader.result });
      toast.success('Avatar updated!');
    };
    reader.readAsDataURL(file);
  }
};

// In profile card
<div className="relative">
  <img src={user.avatar} className="w-20 h-20 rounded-full" />
  <label className="absolute bottom-0 right-0 p-2 bg-(--color-brand) rounded-full cursor-pointer">
    <Upload className="w-4 h-4 text-white" />
    <input type="file" hidden onChange={handleAvatarChange} />
  </label>
</div>
```

**Add validation:**
```tsx
const [errors, setErrors] = useState({});

const handleSave = (e) => {
  e.preventDefault();
  const formData = new FormData(e.target);
  
  const newErrors = {};
  const name = formData.get('name');
  const email = formData.get('email');
  
  if (!name || name.length < 3) {
    newErrors.name = 'Name must be at least 3 characters';
  }
  if (!email?.includes('@')) {
    newErrors.email = 'Invalid email format';
  }
  
  if (Object.keys(newErrors).length > 0) {
    setErrors(newErrors);
    toast.error('Please fix the errors');
    return;
  }
  
  // Save...
};

// In inputs
<Input
  name="name"
  label="Name"
  error={errors.name}
  defaultValue={user.name}
  required
/>
```

---

## 📚 Learn More

- **[Component Guide](./COMPONENTS.md)** - All components and props
- **[Examples](./EXAMPLES.md)** - More real-world patterns
- **[Layout Guide](./LAYOUT.md)** - Navigation and themes
- **[Installation](./INSTALLATION.md)** - Setup and configuration

---

## 💡 Tips

### Quick Component Imports

```tsx
// Import multiple components
import { 
  Card, 
  CardHeader, 
  CardTitle, 
  CardContent 
} from '@/components/UI/Card';

import { Button } from '@/components/UI/Buttons';
import { Input } from '@/components/UI/Input';
import { toast } from '@/components/UI/Feedback';
```

### Common Patterns

```tsx
// Loading button
<Button isLoading={isSaving}>
  {isSaving ? 'Saving...' : 'Save'}
</Button>

// Form with validation
const [errors, setErrors] = useState({});
<Input error={errors.fieldName} />

// Success toast after action
toast.success('Action completed!');

// Modal with form
<Dialog open={open} onOpenChange={setOpen}>
  <form onSubmit={handleSubmit}>...</form>
</Dialog>
```

### VS Code Shortcuts

- **rafce** - Create React component
- **Ctrl+Space** - Trigger Tailwind IntelliSense
- **Ctrl+Click** - Jump to component definition

---

## 🐛 Common Issues

**Toast not showing?**
- Make sure `<Toaster />` is added to `main.tsx`

**Styles not applying?**
- Restart dev server: `pnpm dev`

**Type errors?**
- Check import paths use `@/` prefix

**Components not found?**
- Run `pnpm install` to ensure dependencies installed

---

**Ready to build more?** Check out [Component Guide](./COMPONENTS.md) for all available components! 🚀
