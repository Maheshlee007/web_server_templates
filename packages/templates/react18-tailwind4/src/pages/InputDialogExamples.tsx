import { useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent, Input } from '@/components/UI';
import { Dialog, DialogFooter, AlertDialog } from '@/components/UI/radix';
import { Button } from '@/components/UI';
import { 
  Mail, 
  Lock, 
  User, 
  Search, 
  Phone, 
  DollarSign,
  CheckCircle 
} from 'lucide-react';

export default function InputDialogExamples() {
  // Input states
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [bio, setBio] = useState('');
  const [emailError, setEmailError] = useState('');

  // Dialog states
  const [centerDialog, setCenterDialog] = useState(false);
  const [topDialog, setTopDialog] = useState(false);
  const [bottomDialog, setBottomDialog] = useState(false);
  const [leftDialog, setLeftDialog] = useState(false);
  const [rightDialog, setRightDialog] = useState(false);
  const [alertDialog, setAlertDialog] = useState(false);
  const [formDialog, setFormDialog] = useState(false);

  const validateEmail = (value: string) => {
    if (!value) {
      setEmailError('Email is required');
    } else if (!/\S+@\S+\.\S+/.test(value)) {
      setEmailError('Invalid email format');
    } else {
      setEmailError('');
    }
  };

  return (
    <div className="min-h-screen bg-(--color-bg) p-8">
      <div className="max-w-7xl mx-auto space-y-8">
        <div>
          <h1 className="text-4xl font-bold text-(--color-text) mb-2">
            Input & Dialog Examples
          </h1>
          <p className="text-(--color-text-secondary)">
            Multi-purpose input component and professional dialog variants
          </p>
        </div>

        {/* Input Examples */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Basic Inputs */}
          <Card>
            <CardHeader>
              <CardTitle>Input Variants</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* Email with icon */}
              <Input
                type="email"
                label="Email Address"
                placeholder="you@example.com"
                leftIcon={<Mail className="w-5 h-5" />}
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  validateEmail(e.target.value);
                }}
                error={emailError}
                required
              />

              {/* Password with toggle */}
              <Input
                type="password"
                label="Password"
                placeholder="Enter your password"
                leftIcon={<Lock className="w-5 h-5" />}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                helperText="Must be at least 8 characters"
                required
              />

              {/* Search */}
              <Input
                type="search"
                placeholder="Search users..."
                leftIcon={<Search className="w-5 h-5" />}
                
              />

              {/* Number with icon */}
              <Input
                type="number"
                label="Amount"
                placeholder="0.00"
                leftIcon={<DollarSign className="w-5 h-5" />}
                rightIcon={<span className="text-xs">USD</span>}
              />
            </CardContent>
          </Card>

          {/* Advanced Inputs */}
          <Card>
            <CardHeader>
              <CardTitle>Advanced Features</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* With character count */}
              <Input
                label="Username"
                placeholder="Choose a username"
                leftIcon={<User className="w-5 h-5" />}
                maxLength={20}
                showCharCount
                helperText="Unique identifier for your profile"
              />

              {/* Phone with right icon */}
              <Input
                type="tel"
                label="Phone Number"
                placeholder="+1 (555) 000-0000"
                leftIcon={<Phone className="w-5 h-5" />}
                rightIcon={<CheckCircle className="w-5 h-5 text-success-500" />}
              />

              {/* Textarea with character count */}
              <Input
                multiline
                label="Bio"
                placeholder="Tell us about yourself..."
                rows={4}
                maxLength={200}
                showCharCount
                value={bio}
                onChange={(e) => setBio(e.target.value)}
                resize="vertical"
              />

              {/* Disabled */}
              <Input
                label="Verified Email"
                value="verified@example.com"
                disabled
                helperText="This field cannot be edited"
              />
            </CardContent>
          </Card>
        </div>

        {/* Dialog Examples */}
        <Card>
          <CardHeader>
            <CardTitle>Dialog Variants</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
              <Button onClick={() => setCenterDialog(true)}>
                Center Dialog
              </Button>
              <Button onClick={() => setTopDialog(true)} variant="secondary">
                Top Dialog
              </Button>
              <Button onClick={() => setBottomDialog(true)} variant="secondary">
                Bottom Dialog
              </Button>
              <Button onClick={() => setLeftDialog(true)} variant="secondary">
                Left Dialog
              </Button>
              <Button onClick={() => setRightDialog(true)} variant="secondary">
                Right Dialog
              </Button>
              <Button onClick={() => setAlertDialog(true)} variant="warning">
                Alert Dialog
              </Button>
              <Button onClick={() => setFormDialog(true)} variant="outline">
                Form Dialog
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Dialog Components */}
        {/* Center Dialog */}
        <Dialog
          open={centerDialog}
          onOpenChange={setCenterDialog}
          title="Center Dialog"
          description="This dialog appears in the center with a zoom animation"
          position="center"
        >
          <p className="text-(--color-text-secondary)">
            Perfect for important messages, forms, or confirmations that need user attention.
          </p>
          <DialogFooter>
            <Button variant="secondary" onClick={() => setCenterDialog(false)}>
              Cancel
            </Button>
            <Button onClick={() => setCenterDialog(false)}>
              Confirm
            </Button>
          </DialogFooter>
        </Dialog>

        {/* Top Dialog */}
        <Dialog
          open={topDialog}
          onOpenChange={setTopDialog}
          title="Top Slide Dialog"
          description="Slides in from the top"
          position="top"
          size="lg"
        >
          <p className="text-(--color-text-secondary)">
            Great for notifications or banners that don't interrupt the full screen.
          </p>
          <DialogFooter>
            <Button onClick={() => setTopDialog(false)}>
              Got it
            </Button>
          </DialogFooter>
        </Dialog>

        {/* Bottom Dialog */}
        <Dialog
          open={bottomDialog}
          onOpenChange={setBottomDialog}
          title="Bottom Sheet"
          description="Slides up from the bottom"
          position="bottom"
          size="xl"
        >
          <div className="space-y-4">
            <p className="text-(--color-text-secondary)">
              Mobile-friendly drawer-style dialog. Perfect for action sheets or menus.
            </p>
            <div className="grid grid-cols-2 gap-2">
              <Button variant="outline" size="sm">Option 1</Button>
              <Button variant="outline" size="sm">Option 2</Button>
              <Button variant="outline" size="sm">Option 3</Button>
              <Button variant="outline" size="sm">Option 4</Button>
            </div>
          </div>
        </Dialog>

        {/* Left Dialog */}
        <Dialog
          open={leftDialog}
          onOpenChange={setLeftDialog}
          title="Left Sidebar"
          description="Slides in from the left"
          position="left"
          size="md"
        >
          <p className="text-(--color-text-secondary)">
            Side panel for navigation, settings, or additional content.
          </p>
        </Dialog>

        {/* Right Dialog */}
        <Dialog
          open={rightDialog}
          onOpenChange={setRightDialog}
          title="Right Panel"
          description="Slides in from the right"
          position="right"
          size="lg"
        >
          <p className="text-(--color-text-secondary)">
            Details panel, cart sidebar, or contextual information.
          </p>
        </Dialog>

        {/* Alert Dialog */}
        <AlertDialog
          open={alertDialog}
          onOpenChange={setAlertDialog}
          title="Delete Account?"
          description="This action cannot be undone. This will permanently delete your account and remove your data from our servers."
          confirmText="Delete Account"
          cancelText="Cancel"
          variant="error"
          onConfirm={() => console.log('Account deleted')}
        />

        {/* Form Dialog */}
        <Dialog
          open={formDialog}
          onOpenChange={setFormDialog}
          title="Create New Project"
          description="Enter the details for your new project"
          size="lg"
          closeOnOverlayClick={false}
        >
          <div className="space-y-4">
            <Input
              label="Project Name"
              placeholder="My Awesome Project"
              required
            />
            <Input
              label="Description"
              multiline
              rows={3}
              placeholder="What is this project about?"
            />
            <Input
              type="email"
              label="Owner Email"
              placeholder="owner@example.com"
              leftIcon={<Mail className="w-5 h-5" />}
            />
          </div>
          <DialogFooter>
            <Button variant="secondary" onClick={() => setFormDialog(false)}>
              Cancel
            </Button>
            <Button onClick={() => setFormDialog(false)}>
              Create Project
            </Button>
          </DialogFooter>
        </Dialog>
      </div>
    </div>
  );
}
