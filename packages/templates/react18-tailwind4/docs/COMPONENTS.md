# Component Guide

Complete reference for all UI components with props, examples, and usage patterns.

---

## 📋 Table of Contents

### Form Components
- [Button](#button)
- [Input](#input)
- [Dropdown (Select)](#dropdown)
- [Combobox](#combobox)

### Layout Components
- [Card](#card)
- [Dialog](#dialog)
- [Drawer](#drawer)

### Feedback Components
- [Toast](#toast)
- [Spinner](#spinner)
- [Skeleton](#skeleton)
- [Progress](#progress)

### Navigation Components
- [Context Menu](#context-menu)

---

## Button

Versatile button component with 10 variants, multiple sizes, icons, and loading states.

### Import
```tsx
import { Button } from '@/components/UI/Buttons';
```

### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `variant` | `'primary' \| 'secondary' \| 'outline' \| 'ghost' \| 'danger' \| 'success' \| 'warning' \| 'glass' \| 'link' \| 'gradient' \| 'gradient-border'` | `'primary'` | Visual style variant |
| `size` | `'xs' \| 'sm' \| 'md' \| 'lg' \| 'xl'` | `'md'` | Button size |
| `fullWidth` | `boolean` | `false` | Makes button full width |
| `isLoading` | `boolean` | `false` | Shows loading spinner |
| `icon` | `ReactNode` | - | Icon to display (left side) |
| `iconPosition` | `'left' \| 'right'` | `'left'` | Icon position |
| `disabled` | `boolean` | `false` | Disables button |
| `className` | `string` | - | Additional CSS classes |
| `children` | `ReactNode` | - | Button content |

### Basic Usage

```tsx
// Primary button
<Button variant="primary">Click Me</Button>

// Secondary with size
<Button variant="secondary" size="lg">Large Button</Button>

// With icon
<Button icon={<Save className="w-4 h-4" />}>
  Save
</Button>

// Loading state
<Button isLoading>Saving...</Button>

// Full width
<Button fullWidth>Submit Form</Button>

// Disabled
<Button disabled>Cannot Click</Button>
```

### All Variants

```tsx
<Button variant="primary">Primary</Button>        {/* Blue background */}
<Button variant="secondary">Secondary</Button>    {/* Gray background */}
<Button variant="outline">Outline</Button>        {/* Transparent with border */}
<Button variant="ghost">Ghost</Button>            {/* Transparent, hover effect */}
<Button variant="danger">Danger</Button>          {/* Red background */}
<Button variant="success">Success</Button>        {/* Green background */}
<Button variant="warning">Warning</Button>        {/* Amber background */}
<Button variant="glass">Glass</Button>            {/* Glassmorphism effect */}
<Button variant="link">Link</Button>              {/* Underlined text */}
<Button variant="gradient">Gradient</Button>      {/* Gradient background */}
<Button variant="gradient-border">Border</Button> {/* Gradient border */}
```

### Sizes

```tsx
<Button size="xs">Extra Small</Button>   {/* px-2 py-1 text-xs */}
<Button size="sm">Small</Button>         {/* px-3 py-1.5 text-sm */}
<Button size="md">Medium</Button>        {/* px-4 py-2 text-base */}
<Button size="lg">Large</Button>         {/* px-6 py-3 text-lg */}
<Button size="xl">Extra Large</Button>   {/* px-8 py-4 text-xl */}
```

### With Icons

```tsx
import { Save, Download, Upload, Trash2 } from 'lucide-react';

// Icon on left (default)
<Button icon={<Save />}>Save</Button>

// Icon on right
<Button icon={<Download />} iconPosition="right">
  Download
</Button>

// Icon only (no text)
<Button icon={<Trash2 />} size="sm" />
```

### Loading States

```tsx
// Show spinner, disable button
<Button isLoading>Loading...</Button>

// Conditional loading
<Button isLoading={isSaving} onClick={handleSave}>
  Save Changes
</Button>

// With icon (icon hidden when loading)
<Button isLoading={isSaving} icon={<Save />}>
  {isSaving ? 'Saving...' : 'Save'}
</Button>
```

### Real-World Examples

```tsx
// Form submit button
<Button 
  type="submit" 
  variant="primary" 
  size="lg" 
  fullWidth
  isLoading={isSubmitting}
>
  {isSubmitting ? 'Submitting...' : 'Submit Form'}
</Button>

// Delete button with confirmation
<Button 
  variant="danger" 
  icon={<Trash2 />}
  onClick={() => setShowConfirm(true)}
>
  Delete Account
</Button>

// Download action
<Button 
  variant="success" 
  icon={<Download />}
  onClick={handleDownload}
>
  Download Report
</Button>

// Group of buttons
<div className="flex gap-2">
  <Button variant="outline">Cancel</Button>
  <Button variant="primary">Save</Button>
</div>
```

---

## Input

Multi-purpose input component supporting text, email, password, textarea, with validation and icons.

### Import
```tsx
import { Input } from '@/components/UI/Input';
```

### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `type` | `'text' \| 'email' \| 'password' \| 'number' \| 'search' \| 'tel' \| 'url' \| 'textarea'` | `'text'` | Input type |
| `label` | `string` | - | Label text above input |
| `placeholder` | `string` | - | Placeholder text |
| `error` | `string` | - | Error message (shows below input) |
| `helperText` | `string` | - | Helper text (shows below input) |
| `required` | `boolean` | `false` | Shows red asterisk on label |
| `disabled` | `boolean` | `false` | Disables input |
| `leftIcon` | `ReactNode` | - | Icon on left side |
| `rightIcon` | `ReactNode` | - | Icon on right side |
| `maxLength` | `number` | - | Maximum character length |
| `showCharCount` | `boolean` | `false` | Shows character counter |
| `multiline` | `boolean` | `false` | Renders textarea |
| `rows` | `number` | `3` | Textarea rows (when multiline) |
| `resize` | `'none' \| 'vertical' \| 'horizontal' \| 'both'` | `'vertical'` | Textarea resize behavior |
| `className` | `string` | - | Additional CSS classes |
| `wrapperClassName` | `string` | - | Wrapper div classes |

### Basic Usage

```tsx
// Simple text input
<Input placeholder="Enter your name" />

// With label
<Input label="Email" type="email" placeholder="you@example.com" />

// Required field
<Input label="Username" required />

// With error
<Input 
  label="Password" 
  type="password"
  error="Password must be at least 8 characters"
/>

// With helper text
<Input 
  label="Bio" 
  helperText="Tell us about yourself"
  multiline
  rows={4}
/>

// Disabled
<Input disabled value="Cannot edit" />
```

### Input Types

```tsx
// Text input
<Input type="text" placeholder="Enter text" />

// Email with validation styling
<Input type="email" placeholder="email@example.com" />

// Password with show/hide toggle
<Input type="password" placeholder="Enter password" />

// Number input
<Input type="number" placeholder="Enter amount" />

// Phone number
<Input type="tel" placeholder="+1 (555) 000-0000" />

// URL
<Input type="url" placeholder="https://example.com" />

// Search
<Input type="search" placeholder="Search..." />

// Textarea (multiline)
<Input multiline rows={5} placeholder="Enter long text..." />
```

### With Icons

```tsx
import { Mail, Search, User, Lock } from 'lucide-react';

// Left icon
<Input 
  leftIcon={<Mail className="w-5 h-5" />}
  placeholder="Email address"
/>

// Right icon
<Input 
  rightIcon={<Search className="w-5 h-5" />}
  placeholder="Search..."
/>

// Both icons
<Input 
  leftIcon={<User />}
  rightIcon={<Check />}
  placeholder="Username"
/>
```

### Character Counter

```tsx
// Show character count
<Input 
  label="Bio"
  maxLength={200}
  showCharCount
  multiline
  rows={4}
/>
// Shows: "45 / 200" below input
```

### Validation States

```tsx
// Error state
<Input 
  label="Email"
  type="email"
  value={email}
  error={errors.email}  // "Invalid email format"
/>

// Success state (use rightIcon)
<Input 
  label="Username"
  value={username}
  rightIcon={<CheckCircle className="text-green-500" />}
/>

// Helper text
<Input 
  label="Password"
  type="password"
  helperText="Must be at least 8 characters"
/>
```

### Textarea (Multiline)

```tsx
// Basic textarea
<Input 
  multiline 
  placeholder="Enter message..."
/>

// With row count
<Input 
  multiline
  rows={6}
  label="Description"
/>

// Resize options
<Input 
  multiline
  resize="none"          // Cannot resize
/>
<Input 
  multiline
  resize="vertical"      // Resize vertically only (default)
/>
<Input 
  multiline
  resize="both"          // Resize both directions
/>
```

### Real-World Examples

```tsx
// Login form
<div className="space-y-4">
  <Input 
    label="Email"
    type="email"
    leftIcon={<Mail />}
    placeholder="you@example.com"
    required
  />
  <Input 
    label="Password"
    type="password"
    leftIcon={<Lock />}
    placeholder="••••••••"
    required
  />
</div>

// Contact form
<div className="space-y-4">
  <Input 
    label="Name"
    placeholder="John Doe"
    required
  />
  <Input 
    label="Email"
    type="email"
    placeholder="john@example.com"
    required
  />
  <Input 
    label="Message"
    multiline
    rows={6}
    maxLength={500}
    showCharCount
    placeholder="Your message..."
    required
  />
</div>

// Search bar
<Input 
  type="search"
  placeholder="Search products..."
  leftIcon={<Search />}
  className="max-w-md"
/>
```

---

## Card

Flexible card component with 7 variants and compound sub-components.

### Import
```tsx
import { 
  Card, 
  CardHeader, 
  CardTitle, 
  CardDescription, 
  CardContent, 
  CardFooter 
} from '@/components/UI/Card';
```

### Props

**Card Component:**

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `variant` | `'default' \| 'elevated' \| 'outline' \| 'glass' \| 'glass-strong' \| 'gradient'` | `'default'` | Visual style |
| `padding` | `'none' \| 'sm' \| 'md' \| 'lg'` | `'md'` | Internal padding |
| `size` | `'sm' \| 'md' \| 'lg' \| 'xl' \| '2xl' \| '3xl' \| '4xl' \| 'full' \| 'auto'` | `'auto'` | Max width constraint |
| `hoverable` | `boolean` | `false` | Adds hover scale effect |
| `className` | `string` | - | Additional CSS classes |

### Basic Usage

```tsx
// Simple card
<Card>
  <CardHeader>
    <CardTitle>Card Title</CardTitle>
  </CardHeader>
  <CardContent>
    Card content goes here
  </CardContent>
</Card>

// With all sections
<Card variant="elevated">
  <CardHeader>
    <CardTitle>Complete Card</CardTitle>
    <CardDescription>This card has all sections</CardDescription>
  </CardHeader>
  <CardContent>
    Main content area
  </CardContent>
  <CardFooter>
    <Button>Action</Button>
  </CardFooter>
</Card>
```

### Variants

```tsx
// Default - white background, border, subtle shadow
<Card variant="default">Default Card</Card>

// Elevated - with shadow, hover shadow increases
<Card variant="elevated">Elevated Card</Card>

// Outline - transparent background, border only
<Card variant="outline">Outline Card</Card>

// Glass - glassmorphism effect
<Card variant="glass">Glass Card</Card>

// Glass Strong - stronger glass effect
<Card variant="glass-strong">Strong Glass</Card>

// Gradient - gradient background
<Card variant="gradient">Gradient Card</Card>
```

### Sizes

```tsx
<Card size="sm">Small (max-w-sm)</Card>         {/* 384px */}
<Card size="md">Medium (max-w-md)</Card>        {/* 448px */}
<Card size="lg">Large (max-w-lg)</Card>         {/* 512px */}
<Card size="xl">XL (max-w-xl)</Card>            {/* 576px */}
<Card size="2xl">2XL (max-w-2xl)</Card>         {/* 672px */}
<Card size="3xl">3XL (max-w-3xl)</Card>         {/* 768px */}
<Card size="4xl">4XL (max-w-4xl)</Card>         {/* 896px */}
<Card size="full">Full Width</Card>             {/* 100% */}
<Card size="auto">Auto Width</Card>             {/* No constraint */}
```

### Padding

```tsx
<Card padding="none">No Padding</Card>    {/* p-0 */}
<Card padding="sm">Small (p-4)</Card>     {/* 16px */}
<Card padding="md">Medium (p-6)</Card>    {/* 24px - default */}
<Card padding="lg">Large (p-8)</Card>     {/* 32px */}
```

### Hoverable Effect

```tsx
// Scales up slightly on hover
<Card hoverable>
  <CardContent>
    Hover over me!
  </CardContent>
</Card>

// Common for clickable cards
<Card hoverable onClick={() => navigate('/details')}>
  <CardHeader>
    <CardTitle>Click Me</CardTitle>
  </CardHeader>
</Card>
```

### Compound Components

```tsx
// Complete card structure
<Card>
  {/* Header with title and description */}
  <CardHeader>
    <CardTitle>Product Name</CardTitle>
    <CardDescription>Product description goes here</CardDescription>
  </CardHeader>
  
  {/* Main content area */}
  <CardContent>
    <p>Full product details and information...</p>
  </CardContent>
  
  {/* Footer with actions */}
  <CardFooter>
    <Button variant="outline">Cancel</Button>
    <Button>Add to Cart</Button>
  </CardFooter>
</Card>
```

### Real-World Examples

```tsx
// Product card
<Card variant="elevated" hoverable size="sm">
  <CardHeader>
    <img src="/product.jpg" alt="Product" className="rounded-lg mb-4" />
    <CardTitle>Product Name</CardTitle>
    <CardDescription>$99.99</CardDescription>
  </CardHeader>
  <CardContent>
    <p className="text-sm text-(--color-text-secondary)">
      Product description...
    </p>
  </CardContent>
  <CardFooter>
    <Button fullWidth>Add to Cart</Button>
  </CardFooter>
</Card>

// Stats card
<Card variant="outline">
  <CardHeader>
    <CardTitle>Total Revenue</CardTitle>
  </CardHeader>
  <CardContent>
    <div className="text-3xl font-bold">$45,231</div>
    <p className="text-sm text-green-500">+12.5% from last month</p>
  </CardContent>
</Card>

// Profile card
<Card variant="glass" size="md">
  <CardHeader>
    <div className="flex items-center gap-4">
      <img 
        src="/avatar.jpg" 
        alt="User" 
        className="w-16 h-16 rounded-full"
      />
      <div>
        <CardTitle>John Doe</CardTitle>
        <CardDescription>john@example.com</CardDescription>
      </div>
    </div>
  </CardHeader>
  <CardContent>
    <p>Bio and additional information...</p>
  </CardContent>
  <CardFooter>
    <Button variant="outline">View Profile</Button>
  </CardFooter>
</Card>

// Form card
<Card size="lg">
  <CardHeader>
    <CardTitle>Create Account</CardTitle>
    <CardDescription>Sign up to get started</CardDescription>
  </CardHeader>
  <CardContent>
    <div className="space-y-4">
      <Input label="Email" type="email" required />
      <Input label="Password" type="password" required />
    </div>
  </CardContent>
  <CardFooter>
    <Button fullWidth>Sign Up</Button>
  </CardFooter>
</Card>
```

---

## Dialog

Modal dialog component with animations, positions, and sizes.

### Import
```tsx
import { Dialog } from '@/components/UI/radix';
```

### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `open` | `boolean` | - | **Required** - Controls visibility |
| `onOpenChange` | `(open: boolean) => void` | - | **Required** - Callback when state changes |
| `title` | `string` | - | Dialog title |
| `description` | `string` | - | Dialog description |
| `children` | `ReactNode` | - | Dialog content |
| `position` | `'center' \| 'top' \| 'bottom' \| 'left' \| 'right'` | `'center'` | Dialog position |
| `size` | `'sm' \| 'md' \| 'lg' \| 'xl' \| 'full'` | `'md'` | Dialog width/height |
| `showClose` | `boolean` | `true` | Shows X close button |
| `closeOnOverlayClick` | `boolean` | `true` | Close when clicking outside |
| `className` | `string` | - | Additional CSS classes |

### Basic Usage

```tsx
import { useState } from 'react';
import { Dialog } from '@/components/UI/radix';
import { Button } from '@/components/UI/Buttons';

function MyComponent() {
  const [open, setOpen] = useState(false);
  
  return (
    <>
      <Button onClick={() => setOpen(true)}>Open Dialog</Button>
      
      <Dialog
        open={open}
        onOpenChange={setOpen}
        title="Dialog Title"
        description="Dialog description"
      >
        <div className="p-6">
          Dialog content goes here
        </div>
      </Dialog>
    </>
  );
}
```

### Sizes

```tsx
<Dialog open={open} onOpenChange={setOpen} size="sm">
  Small Dialog (max-w-sm)
</Dialog>

<Dialog open={open} onOpenChange={setOpen} size="md">
  Medium Dialog (max-w-md) - Default
</Dialog>

<Dialog open={open} onOpenChange={setOpen} size="lg">
  Large Dialog (max-w-lg)
</Dialog>

<Dialog open={open} onOpenChange={setOpen} size="xl">
  Extra Large (max-w-xl)
</Dialog>

<Dialog open={open} onOpenChange={setOpen} size="full">
  Full Screen Dialog
</Dialog>
```

### Positions

```tsx
// Center of screen (default)
<Dialog position="center">Centered</Dialog>

// Top of screen
<Dialog position="top">Top Position</Dialog>

// Bottom of screen
<Dialog position="bottom">Bottom Position</Dialog>

// Left side (drawer-like)
<Dialog position="left">Left Side</Dialog>

// Right side (drawer-like)
<Dialog position="right">Right Side</Dialog>
```

### Close Behavior

```tsx
// Prevent closing on outside click
<Dialog 
  open={open}
  onOpenChange={setOpen}
  closeOnOverlayClick={false}
>
  Can only close with button
</Dialog>

// Hide close button
<Dialog 
  open={open}
  onOpenChange={setOpen}
  showClose={false}
>
  No X button
</Dialog>
```

### Real-World Examples

```tsx
// Confirmation dialog
<Dialog
  open={confirmOpen}
  onOpenChange={setConfirmOpen}
  title="Delete Account"
  description="This action cannot be undone"
  size="sm"
>
  <div className="flex flex-col gap-4 p-6">
    <p>Are you sure you want to delete your account?</p>
    <div className="flex gap-2 justify-end">
      <Button variant="outline" onClick={() => setConfirmOpen(false)}>
        Cancel
      </Button>
      <Button variant="danger" onClick={handleDelete}>
        Delete
      </Button>
    </div>
  </div>
</Dialog>

// Form dialog
<Dialog
  open={formOpen}
  onOpenChange={setFormOpen}
  title="Create New Project"
  size="lg"
>
  <div className="p-6">
    <div className="space-y-4">
      <Input label="Project Name" required />
      <Input label="Description" multiline rows={4} />
      <div className="flex gap-2 justify-end">
        <Button variant="outline" onClick={() => setFormOpen(false)}>
          Cancel
        </Button>
        <Button onClick={handleSubmit}>
          Create Project
        </Button>
      </div>
    </div>
  </div>
</Dialog>

// Alert dialog with icon
<Dialog
  open={alertOpen}
  onOpenChange={setAlertOpen}
  title="Success!"
  size="sm"
>
  <div className="flex flex-col items-center gap-4 p-6">
    <CheckCircle className="w-12 h-12 text-green-500" />
    <p className="text-center">
      Your changes have been saved successfully.
    </p>
    <Button fullWidth onClick={() => setAlertOpen(false)}>
      OK
    </Button>
  </div>
</Dialog>
```

---

## Dropdown

Rich dropdown/select component with icons, colors, descriptions, and search support.

### Import
```tsx
import { Select, type SelectOption } from '@/components/UI/radix';
```

### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `value` | `string` | - | **Required** - Selected value |
| `onValueChange` | `(value: string) => void` | - | **Required** - Change callback |
| `options` | `SelectOption[]` | - | **Required** - Array of options |
| `placeholder` | `string` | `'Select an option'` | Placeholder text |
| `label` | `string` | - | Label above dropdown |
| `disabled` | `boolean` | `false` | Disables dropdown |
| `maxHeight` | `string` | `'384px'` | Max height of dropdown |
| `className` | `string` | - | Additional CSS classes |

**SelectOption Type:**

```tsx
interface SelectOption {
  value: string;              // Unique identifier
  label: string;              // Display text
  description?: string;       // Secondary text below label
  icon?: ReactNode;           // Icon or emoji
  colorPalette?: string[];    // Array of color hex codes
  disabled?: boolean;         // Disable this option
}
```

### Basic Usage

```tsx
import { useState } from 'react';
import { Select } from '@/components/UI/radix';

const options = [
  { value: '1', label: 'Option 1' },
  { value: '2', label: 'Option 2' },
  { value: '3', label: 'Option 3' },
];

function MyComponent() {
  const [value, setValue] = useState('');
  
  return (
    <Select
      value={value}
      onValueChange={setValue}
      options={options}
      label="Choose Option"
    />
  );
}
```

### With Icons

```tsx
import { Home, User, Settings, Mail } from 'lucide-react';

const options = [
  { 
    value: 'home', 
    label: 'Home', 
    icon: <Home className="w-4 h-4" /> 
  },
  { 
    value: 'profile', 
    label: 'Profile', 
    icon: <User className="w-4 h-4" /> 
  },
  { 
    value: 'settings', 
    label: 'Settings', 
    icon: <Settings className="w-4 h-4" /> 
  },
];

<Select value={value} onValueChange={setValue} options={options} />
```

### With Descriptions

```tsx
const options = [
  { 
    value: 'react', 
    label: 'React', 
    description: 'A JavaScript library for building UIs',
    icon: <Code />
  },
  { 
    value: 'vue', 
    label: 'Vue', 
    description: 'Progressive JavaScript framework',
    icon: <Code />
  },
];

<Select value={value} onValueChange={setValue} options={options} />
```

### With Color Palettes

```tsx
const options = [
  { 
    value: 'ocean', 
    label: 'Ocean Blue',
    colorPalette: ['#0EA5E9', '#06B6D4', '#3B82F6', '#6366F1']
  },
  { 
    value: 'sunset', 
    label: 'Sunset',
    colorPalette: ['#F59E0B', '#EF4444', '#EC4899', '#A855F7']
  },
];

<Select value={value} onValueChange={setValue} options={options} />
```

### With Country Flags

```tsx
const countries = [
  { value: 'us', label: 'United States', icon: '🇺🇸' },
  { value: 'uk', label: 'United Kingdom', icon: '🇬🇧' },
  { value: 'ca', label: 'Canada', icon: '🇨🇦' },
  { value: 'de', label: 'Germany', icon: '🇩🇪' },
];

<Select 
  value={country} 
  onValueChange={setCountry} 
  options={countries}
  label="Select Country"
/>
```

### Disabled Options

```tsx
const options = [
  { value: '1', label: 'Available Option' },
  { value: '2', label: 'Disabled Option', disabled: true },
  { value: '3', label: 'Another Available' },
];

<Select value={value} onValueChange={setValue} options={options} />
```

### Real-World Examples

```tsx
// Status selector
const statusOptions = [
  { 
    value: 'active', 
    label: 'Active',
    icon: <CheckCircle className="text-green-500" />
  },
  { 
    value: 'pending', 
    label: 'Pending',
    icon: <Clock className="text-amber-500" />
  },
  { 
    value: 'inactive', 
    label: 'Inactive',
    icon: <XCircle className="text-red-500" />
  },
];

<Select 
  value={status} 
  onValueChange={setStatus} 
  options={statusOptions}
  label="Project Status"
/>

// Framework selector with descriptions
const frameworks = [
  {
    value: 'react',
    label: 'React',
    description: 'A JavaScript library for building user interfaces',
    icon: <Code />
  },
  {
    value: 'vue',
    label: 'Vue.js',
    description: 'Progressive JavaScript framework',
    icon: <Code />
  },
  {
    value: 'angular',
    label: 'Angular',
    description: 'Platform for building mobile and desktop apps',
    icon: <Code />
  },
];

<Select 
  value={framework} 
  onValueChange={setFramework} 
  options={frameworks}
  label="Choose Framework"
/>
```

---

## Combobox

Searchable select component with keyword filtering and rich option display.

### Import
```tsx
import { Combobox, type ComboboxOption } from '@/components/UI/radix';
```

### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `value` | `string` | - | **Required** - Selected value |
| `onValueChange` | `(value: string) => void` | - | **Required** - Change callback |
| `options` | `ComboboxOption[]` | - | **Required** - Array of options |
| `placeholder` | `string` | `'Select an option'` | Button placeholder |
| `searchPlaceholder` | `string` | `'Search...'` | Search input placeholder |
| `label` | `string` | - | Label above combobox |
| `disabled` | `boolean` | `false` | Disables combobox |
| `maxHeight` | `string` | `'384px'` | Max height of dropdown |
| `emptyMessage` | `string` | `'No results found'` | Message when no matches |
| `className` | `string` | - | Additional CSS classes |

**ComboboxOption Type:**

```tsx
interface ComboboxOption {
  value: string;           // Unique identifier
  label: string;           // Display text
  description?: string;    // Secondary text
  icon?: ReactNode;        // Icon or emoji
  keywords?: string[];     // Additional search terms
  disabled?: boolean;      // Disable this option
}
```

### Basic Usage

```tsx
import { useState } from 'react';
import { Combobox } from '@/components/UI/radix';

const options = [
  { value: '1', label: 'Option 1' },
  { value: '2', label: 'Option 2' },
  { value: '3', label: 'Option 3' },
];

function MyComponent() {
  const [value, setValue] = useState('');
  
  return (
    <Combobox
      value={value}
      onValueChange={setValue}
      options={options}
      label="Search and Select"
    />
  );
}
```

### With Keywords (Enhanced Search)

```tsx
const countries = [
  { 
    value: 'us', 
    label: 'United States', 
    icon: '🇺🇸',
    keywords: ['america', 'usa', 'states'] // Searchable keywords
  },
  { 
    value: 'uk', 
    label: 'United Kingdom', 
    icon: '🇬🇧',
    keywords: ['england', 'britain', 'great britain']
  },
  { 
    value: 'de', 
    label: 'Germany', 
    icon: '🇩🇪',
    keywords: ['deutschland', 'german']
  },
];

<Combobox 
  value={country} 
  onValueChange={setCountry} 
  options={countries}
  searchPlaceholder="Search countries..."
/>
// Typing "america" will find "United States"
```

### With Icons and Descriptions

```tsx
const frameworks = [
  {
    value: 'react',
    label: 'React',
    description: 'JavaScript library for UIs',
    icon: <Code className="text-blue-500" />,
    keywords: ['facebook', 'meta', 'jsx']
  },
  {
    value: 'vue',
    label: 'Vue.js',
    description: 'Progressive framework',
    icon: <Code className="text-green-500" />,
    keywords: ['evan you', 'composition']
  },
];

<Combobox 
  value={framework} 
  onValueChange={setFramework} 
  options={frameworks}
  label="Select Framework"
  searchPlaceholder="Search frameworks..."
/>
```

### Real-World Examples

```tsx
// Country selector with search
const countries = [
  { 
    value: 'us', 
    label: 'United States', 
    icon: '🇺🇸',
    keywords: ['america', 'usa']
  },
  { 
    value: 'uk', 
    label: 'United Kingdom', 
    icon: '🇬🇧',
    keywords: ['england', 'britain']
  },
  { 
    value: 'ca', 
    label: 'Canada', 
    icon: '🇨🇦',
    keywords: ['canadian']
  },
  { 
    value: 'de', 
    label: 'Germany', 
    icon: '🇩🇪',
    keywords: ['deutschland', 'german']
  },
  { 
    value: 'fr', 
    label: 'France', 
    icon: '🇫🇷',
    keywords: ['french', 'paris']
  },
];

<Combobox 
  value={country} 
  onValueChange={setCountry} 
  options={countries}
  label="Country"
  searchPlaceholder="Search countries..."
/>

// City selector
const cities = [
  { 
    value: 'nyc', 
    label: 'New York', 
    description: 'New York, USA',
    keywords: ['big apple', 'manhattan']
  },
  { 
    value: 'lon', 
    label: 'London', 
    description: 'London, UK',
    keywords: ['british', 'england']
  },
  { 
    value: 'tok', 
    label: 'Tokyo', 
    description: 'Tokyo, Japan',
    keywords: ['japan', 'japanese']
  },
];

<Combobox 
  value={city} 
  onValueChange={setCity} 
  options={cities}
  label="City"
  searchPlaceholder="Search cities..."
/>
```

---

## Toast

Toast notification system powered by Sonner.

### Import
```tsx
import { toast, Toaster } from '@/components/UI/Feedback';
```

### Setup (Required)

Add `<Toaster />` to your app root (only once):

```tsx
// src/main.tsx
import { Toaster } from '@/components/UI/Feedback';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ThemeProvider>
      <App />
      <Toaster position="top-right" /> {/* Add this */}
    </ThemeProvider>
  </StrictMode>
);
```

### Toaster Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `position` | `'top-left' \| 'top-right' \| 'top-center' \| 'bottom-left' \| 'bottom-right' \| 'bottom-center'` | `'top-right'` | Toast position |
| `theme` | `'light' \| 'dark' \| 'system'` | `'system'` | Toast theme |
| `richColors` | `boolean` | `true` | Better variant colors |
| `expand` | `boolean` | `false` | Expand on hover |
| `duration` | `number` | `4000` | Auto-dismiss time (ms) |
| `closeButton` | `boolean` | `true` | Show close button |

### Basic Usage

```tsx
import { toast } from '@/components/UI/Feedback';

// Success toast
toast.success('Saved successfully!');

// Error toast
toast.error('Failed to save');

// Warning toast
toast.warning('Session expiring soon');

// Info toast
toast.info('New update available');
```

### With Descriptions

```tsx
toast.success('User created', {
  description: 'Welcome email sent to user@example.com'
});

toast.error('Upload failed', {
  description: 'File size exceeds 10MB limit'
});
```

### With Duration

```tsx
// Show for 2 seconds
toast.success('Quick message', { duration: 2000 });

// Show for 10 seconds
toast.info('Important info', { duration: 10000 });

// Never auto-dismiss
toast.loading('Processing...', { duration: Infinity });
```

### Loading Toast

```tsx
// Show loading, then update
const id = toast.loading('Saving...');

setTimeout(() => {
  toast.dismiss(id);
  toast.success('Saved!');
}, 2000);
```

### Promise Toast

```tsx
// Automatically shows loading, success, or error
toast.promise(
  fetch('/api/save').then(r => r.json()),
  {
    loading: 'Saving...',
    success: 'Saved successfully!',
    error: 'Failed to save'
  }
);

// With dynamic messages
toast.promise(
  saveUser(data),
  {
    loading: 'Creating user...',
    success: (user) => `User ${user.name} created!`,
    error: (err) => `Error: ${err.message}`
  }
);
```

### Custom Toast with Action

```tsx
toast.custom('File deleted', {
  action: {
    label: 'Undo',
    onClick: () => {
      // Restore file
      console.log('Undo delete');
    }
  },
  duration: 5000
});
```

### Dismiss Toasts

```tsx
// Dismiss specific toast
const id = toast.success('Message');
toast.dismiss(id);

// Dismiss all toasts
toast.dismiss();
```

### Real-World Examples

```tsx
// Form submission
const handleSubmit = async () => {
  try {
    await toast.promise(
      submitForm(data),
      {
        loading: 'Submitting form...',
        success: 'Form submitted successfully!',
        error: 'Failed to submit form'
      }
    );
    navigate('/success');
  } catch (error) {
    // Error toast already shown
  }
};

// File upload
const handleUpload = async (file: File) => {
  const id = toast.loading('Uploading file...');
  
  try {
    await uploadFile(file);
    toast.dismiss(id);
    toast.success(`${file.name} uploaded!`);
  } catch (error) {
    toast.dismiss(id);
    toast.error('Upload failed', {
      description: error.message
    });
  }
};

// Copy to clipboard
const handleCopy = () => {
  navigator.clipboard.writeText(text);
  toast.success('Copied to clipboard');
};

// Delete with undo
const handleDelete = (id: string) => {
  // Soft delete
  markAsDeleted(id);
  
  toast.custom('Item deleted', {
    action: {
      label: 'Undo',
      onClick: () => {
        restoreItem(id);
        toast.success('Item restored');
      }
    },
    duration: 5000
  });
};
```

---

## Spinner

Loading spinner component with multiple sizes and variants.

### Import
```tsx
import { Spinner } from '@/components/UI/Feedback';
```

### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `size` | `'xs' \| 'sm' \| 'md' \| 'lg' \| 'xl'` | `'md'` | Spinner size |
| `variant` | `'primary' \| 'secondary' \| 'white' \| 'current'` | `'primary'` | Color variant |
| `label` | `string` | - | Label text below spinner |
| `className` | `string` | - | Additional CSS classes |

### Basic Usage

```tsx
// Default spinner
<Spinner />

// Different sizes
<Spinner size="xs" />   {/* 3x3 (12px) */}
<Spinner size="sm" />   {/* 4x4 (16px) */}
<Spinner size="md" />   {/* 6x6 (24px) - default */}
<Spinner size="lg" />   {/* 8x8 (32px) */}
<Spinner size="xl" />   {/* 12x12 (48px) */}

// Different variants
<Spinner variant="primary" />    {/* Brand color */}
<Spinner variant="secondary" />  {/* Gray */}
<Spinner variant="white" />      {/* White (for dark backgrounds) */}
<Spinner variant="current" />    {/* Inherits text color */}
```

### With Label

```tsx
<Spinner label="Loading..." />
<Spinner size="lg" label="Please wait..." />
```

### Real-World Examples

```tsx
// Loading state
{isLoading && <Spinner label="Loading data..." />}

// Button loading state
<Button isLoading={isSaving}>
  {isSaving ? 'Saving...' : 'Save'}
</Button>

// Full page loader
<div className="flex items-center justify-center min-h-screen">
  <Spinner size="xl" label="Loading application..." />
</div>

// Inline loader
<div className="flex items-center gap-2">
  <Spinner size="sm" />
  <span>Processing...</span>
</div>

// On dark background
<div className="bg-blue-600 p-4">
  <Spinner variant="white" label="Loading..." />
</div>
```

---

## Skeleton

Content placeholder loader with multiple variants and animations.

### Import
```tsx
import { 
  Skeleton, 
  SkeletonText, 
  SkeletonCard, 
  SkeletonAvatar, 
  SkeletonButton 
} from '@/components/UI/Feedback';
```

### Props

**Skeleton Component:**

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `variant` | `'text' \| 'circular' \| 'rectangular'` | `'rectangular'` | Shape variant |
| `width` | `string \| number` | - | Width (px or string) |
| `height` | `string \| number` | - | Height (px or string) |
| `animation` | `'pulse' \| 'wave' \| 'none'` | `'pulse'` | Animation type |
| `className` | `string` | - | Additional CSS classes |

### Basic Usage

```tsx
// Rectangular (default)
<Skeleton />
<Skeleton width={200} height={100} />

// Text line
<Skeleton variant="text" />
<Skeleton variant="text" width="80%" />

// Circular (for avatars)
<Skeleton variant="circular" width={48} height={48} />

// Custom size
<Skeleton width="100%" height={200} />
```

### Animations

```tsx
// Pulse (default) - opacity animation
<Skeleton animation="pulse" />

// Wave - shimmer effect
<Skeleton animation="wave" />

// No animation
<Skeleton animation="none" />
```

### Compound Components

```tsx
// Text lines
<SkeletonText lines={3} />  {/* 3 lines of text */}
<SkeletonText lines={5} />  {/* 5 lines */}

// Avatar with text
<div className="flex items-center gap-3">
  <SkeletonAvatar size={48} />
  <SkeletonText lines={2} />
</div>

// Card skeleton
<SkeletonCard />  {/* Image + 2 text lines */}

// Button skeleton
<SkeletonButton />  {/* Button-shaped skeleton */}
```

### Real-World Examples

```tsx
// Loading profile
<div className="flex items-start gap-4">
  <SkeletonAvatar size={64} />
  <div className="flex-1">
    <Skeleton variant="text" width="60%" className="mb-2" />
    <Skeleton variant="text" width="80%" />
  </div>
</div>

// Loading list
<div className="space-y-4">
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

// Loading card grid
<div className="grid grid-cols-3 gap-4">
  {[1, 2, 3].map(i => (
    <SkeletonCard key={i} />
  ))}
</div>

// Loading form
<div className="space-y-4">
  <Skeleton height={40} />  {/* Input */}
  <Skeleton height={40} />  {/* Input */}
  <Skeleton height={100} /> {/* Textarea */}
  <SkeletonButton />        {/* Submit button */}
</div>

// Loading table
<div className="space-y-2">
  {[1, 2, 3, 4, 5].map(i => (
    <div key={i} className="flex gap-4">
      <Skeleton width={50} height={20} />
      <Skeleton flex="1" height={20} />
      <Skeleton width={100} height={20} />
      <SkeletonButton />
    </div>
  ))}
</div>
```

---

## Progress

Linear and circular progress indicators.

### Import
```tsx
import { Progress, CircularProgress } from '@/components/UI/Feedback';
```

### Props

**Progress (Linear):**

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `value` | `number` | - | Progress value (0-100), undefined for indeterminate |
| `variant` | `'default' \| 'success' \| 'warning' \| 'error' \| 'gradient'` | `'default'` | Color variant |
| `size` | `'sm' \| 'md' \| 'lg' \| 'xl'` | `'md'` | Height |
| `showLabel` | `boolean` | `false` | Show percentage label |
| `label` | `string` | - | Custom label text |
| `className` | `string` | - | Additional CSS classes |

**CircularProgress:**

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `value` | `number` | - | Progress value (0-100), undefined for indeterminate |
| `size` | `number` | `48` | Circle diameter (px) |
| `strokeWidth` | `number` | `4` | Stroke width (px) |
| `variant` | `'default' \| 'success' \| 'warning' \| 'error'` | `'default'` | Color variant |
| `showLabel` | `boolean` | `false` | Show percentage in center |
| `className` | `string` | - | Additional CSS classes |

### Basic Usage

```tsx
// Linear progress
<Progress value={45} />

// With label
<Progress value={65} showLabel />

// Custom label
<Progress value={30} label="Uploading..." showLabel />

// Circular progress
<CircularProgress value={75} />

// With percentage in center
<CircularProgress value={50} showLabel />
```

### Variants

```tsx
// Linear variants
<Progress value={45} variant="default" />   {/* Brand color */}
<Progress value={75} variant="success" />   {/* Green */}
<Progress value={30} variant="warning" />   {/* Amber */}
<Progress value={90} variant="error" />     {/* Red */}
<Progress value={50} variant="gradient" />  {/* Gradient */}

// Circular variants
<CircularProgress value={60} variant="default" />
<CircularProgress value={80} variant="success" />
<CircularProgress value={40} variant="warning" />
<CircularProgress value={95} variant="error" />
```

### Sizes

```tsx
// Linear sizes
<Progress value={50} size="sm" />   {/* h-1 */}
<Progress value={50} size="md" />   {/* h-2 - default */}
<Progress value={50} size="lg" />   {/* h-3 */}
<Progress value={50} size="xl" />   {/* h-4 */}

// Circular sizes
<CircularProgress value={50} size={32} strokeWidth={3} />
<CircularProgress value={50} size={48} strokeWidth={4} />
<CircularProgress value={50} size={64} strokeWidth={5} />
<CircularProgress value={50} size={96} strokeWidth={6} />
```

### Indeterminate (Loading)

```tsx
// Undefined value = indeterminate/loading state
<Progress />  {/* Animated loading bar */}
<CircularProgress />  {/* Spinning circle */}

// Use when duration is unknown
{isLoading && <Progress />}
```

### Real-World Examples

```tsx
// File upload
<div className="space-y-2">
  <div className="flex justify-between text-sm">
    <span>Uploading file.pdf</span>
    <span>{uploadProgress}%</span>
  </div>
  <Progress value={uploadProgress} variant="success" />
</div>

// Multi-step form
<div className="space-y-2">
  <Progress 
    value={(currentStep / totalSteps) * 100} 
    label={`Step ${currentStep} of ${totalSteps}`}
    showLabel
  />
</div>

// Download progress
<div className="flex items-center gap-4">
  <CircularProgress value={downloadProgress} showLabel />
  <div>
    <div className="font-medium">Downloading...</div>
    <div className="text-sm text-(--color-text-secondary)">
      {downloadProgress}% complete
    </div>
  </div>
</div>

// Skills display
<div className="space-y-3">
  <div>
    <div className="flex justify-between text-sm mb-1">
      <span>React</span>
      <span>90%</span>
    </div>
    <Progress value={90} variant="success" />
  </div>
  <div>
    <div className="flex justify-between text-sm mb-1">
      <span>TypeScript</span>
      <span>85%</span>
    </div>
    <Progress value={85} variant="success" />
  </div>
</div>

// Loading with circular spinner
{isProcessing && (
  <div className="flex flex-col items-center gap-3">
    <CircularProgress />
    <span className="text-sm">Processing data...</span>
  </div>
)}
```

---

## Context Menu

Right-click menu component.

### Import
```tsx
import { ContextMenu } from '@/components/UI/radix';
```

### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `children` | `ReactNode` | - | **Required** - Trigger element |
| `items` | `MenuItem[]` | - | **Required** - Menu items |

**MenuItem Type:**

```tsx
interface MenuItem {
  id: string;
  label: string;
  icon?: ReactNode;
  onClick?: () => void;
  type?: 'item' | 'separator';
  disabled?: boolean;
  badge?: number | string;
}
```

### Basic Usage

```tsx
import { ContextMenu } from '@/components/UI/radix';
import { Copy, Download, Trash } from 'lucide-react';

const items = [
  { 
    id: 'copy', 
    label: 'Copy', 
    icon: <Copy className="w-4 h-4" />,
    onClick: () => console.log('Copy')
  },
  { 
    id: 'download', 
    label: 'Download', 
    icon: <Download className="w-4 h-4" />,
    onClick: () => console.log('Download')
  },
  { id: 'separator', type: 'separator', label: '' },
  { 
    id: 'delete', 
    label: 'Delete', 
    icon: <Trash className="w-4 h-4" />,
    onClick: () => console.log('Delete')
  },
];

<ContextMenu items={items}>
  <div className="p-8 border rounded">
    Right click me!
  </div>
</ContextMenu>
```

### Real-World Example

```tsx
// File context menu
const fileMenuItems = [
  { id: 'open', label: 'Open', icon: <File /> },
  { id: 'rename', label: 'Rename', icon: <Edit /> },
  { id: 'sep1', type: 'separator', label: '' },
  { id: 'copy', label: 'Copy', icon: <Copy /> },
  { id: 'cut', label: 'Cut', icon: <Scissors /> },
  { id: 'paste', label: 'Paste', icon: <Clipboard />, disabled: !hasCopied },
  { id: 'sep2', type: 'separator', label: '' },
  { id: 'delete', label: 'Delete', icon: <Trash />, onClick: handleDelete },
];

<ContextMenu items={fileMenuItems}>
  <Card hoverable>
    <CardContent>
      Document.pdf
    </CardContent>
  </Card>
</ContextMenu>
```

---

## 🔗 Related Documentation

- [Layout Guide](./LAYOUT.md) - Navigation components
- [Theme Guide](./THEMES.md) - Theming system
- [Examples](./EXAMPLES.md) - Real-world combinations
- [API Reference](./API_REFERENCE.md) - Complete type definitions

---

**Need more help?** Check the [Examples](./EXAMPLES.md) for real-world usage patterns!
