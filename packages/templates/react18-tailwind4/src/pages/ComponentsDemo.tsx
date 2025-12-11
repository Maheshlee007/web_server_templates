import { useState } from 'react';
import { 
  Card, 
  CardHeader, 
  CardTitle, 
  CardDescription, 
  CardBody, 
  CardFooter 
} from '@/components/UI/Card';
import { Carousel } from '@/components/UI/Carousel';
import { Drawer } from '@/components/UI/Drawer';
import { Button } from '@/components/UI/Buttons/Button';
import { Input } from '@/components/UI/Input';
import { Dialog } from '@/components/UI/radix/Dialog';
import { Dropdown, type SelectOption, Combobox, type ComboboxOption } from '@/components/UI/radix';
import { ContextMenu } from '@/components/UI/radix/ContextMenu';
import { ColorPalette } from '@/components/UI/ColorPalette';
import { 
  Check, Copy, User, Settings, Edit, Trash, Mail, 
  FileText, Image as ImageIcon, Search, Heart, Star,
  Download, Upload, Plus, X as XIcon, Home, Bell, Shield,
  Zap, Bookmark, Globe, Palette
} from 'lucide-react';
import componentsData from '@/data/components-data.json';

type ComponentType = 'carousel' | 'button' | 'card' | 'input' | 'drawer' | 'dialog' | 'combobox' | 'contextMenu' | 'colorPalette';

interface ComponentData {
  name: string;
  description: string;
  category: string;
  variants: Array<{
    id: string;
    label: string;
    description: string;
  }>;
  sizes?: string[];
  props?: Array<{
    name: string;
    type: string;
    default: string;
    description: string;
  }>;
}

interface MenuItemLocal {
  id: string;
  label?: string;
  icon?: React.ReactNode;
  type: 'default' | 'separator' | 'group';
  children?: MenuItemLocal[];
}

// Props Table Component
function PropsTable({ props }: { props: Array<{ name: string; type: string; default: string; description: string }> }) {
  return (
    <div className="overflow-x-auto">
      <table className="w-full text-sm border-collapse">
        <thead>
          <tr className="border-b-2 border-(--color-border)">
            <th className="text-left py-3 px-4 font-semibold text-(--color-text) bg-(--color-bg-secondary)">Prop</th>
            <th className="text-left py-3 px-4 font-semibold text-(--color-text) bg-(--color-bg-secondary)">Type</th>
            <th className="text-left py-3 px-4 font-semibold text-(--color-text) bg-(--color-bg-secondary)">Default</th>
            <th className="text-left py-3 px-4 font-semibold text-(--color-text) bg-(--color-bg-secondary)">Description</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-(--color-border)">
          {props.map((prop) => (
            <tr key={prop.name} className="hover:bg-(--color-bg-secondary) transition-colors">
              <td className="py-3 px-4 font-mono text-blue-600 dark:text-blue-400 text-xs font-semibold">
                {prop.name}
              </td>
              <td className="py-3 px-4 font-mono text-[10px] text-(--color-text-secondary) max-w-xs">
                <code className="bg-(--color-bg-tertiary) px-1.5 py-0.5 rounded">{prop.type}</code>
              </td>
              <td className="py-3 px-4 font-mono text-xs text-(--color-text-secondary)">
                <code className="bg-(--color-bg-tertiary) px-1.5 py-0.5 rounded">{prop.default}</code>
              </td>
              <td className="py-3 px-4 text-(--color-text-secondary) text-sm">
                {prop.description}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

// Code Display Component
function CodeBlock({ code, onCopy }: { code: string; onCopy: () => void }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    onCopy();
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="relative">
      <button
        onClick={handleCopy}
        className="absolute top-3 right-3 p-2 bg-(--color-bg-secondary) hover:bg-(--color-bg-tertiary) rounded-lg transition-colors z-10"
        aria-label="Copy code"
      >
        {copied ? (
          <Check className="w-4 h-4 text-green-500" />
        ) : (
          <Copy className="w-4 h-4 text-(--color-text-muted)" />
        )}
      </button>
      <pre className="bg-(--color-bg-secondary) p-4 pr-14 rounded-lg overflow-x-auto border border-(--color-border)">
        <code className="text-xs font-mono text-(--color-text)">
          {code}
        </code>
      </pre>
    </div>
  );
}

export function ComponentsDemo() {
  const [selectedComponent, setSelectedComponent] = useState<ComponentType>('button');
  const [selectedVariant, setSelectedVariant] = useState(0);
  
  // Component-specific states
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [drawerPosition, setDrawerPosition] = useState<'left' | 'right' | 'top' | 'bottom'>('right');
  const [drawerSize, setDrawerSize] = useState<'small' | 'medium' | 'large' |'xl' |'auto' | 'full'>('medium');
  const [dialogOpen, setDialogOpen] = useState(false);
  const [dialogPosition, setDialogPosition] = useState<'center' | 'top' | 'bottom'>('center');
  const [dialogSize, setDialogSize] = useState<'sm' | 'md' | 'lg' | 'xl'>('md');
  const [comboboxValue, setComboboxValue] = useState('');

  const currentComponentData = componentsData[selectedComponent] as any;
  const currentVariant = currentComponentData.variants[selectedVariant];

  const copyToClipboard = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  const renderComponentPreview = () => {
    switch (selectedComponent) {
      case 'button':
        return (
          <div className="space-y-8">
            {/* All Variants */}
            <div>
              <h3 className="text-lg font-semibold text-(--color-text) mb-4">All Variants</h3>
              <div className="flex flex-wrap gap-3">
                <Button variant="primary">Primary</Button>
                <Button variant="secondary">Secondary</Button>
                <Button variant="outline">Outline</Button>
                <Button variant="ghost">Ghost</Button>
                <Button variant="danger">Danger</Button>
                <Button variant="success">Success</Button>
                <Button variant="warning">Warning</Button>
                <Button variant="glass">Glass</Button>
                <Button variant="link">Link</Button>
                <Button variant="gradient">Gradient</Button>
                <Button variant="gradient-border">Gradient Border</Button>
              </div>
            </div>

            {/* All Sizes */}
            <div>
              <h3 className="text-lg font-semibold text-(--color-text) mb-4">All Sizes</h3>
              <div className="flex flex-wrap items-end gap-3">
                <Button size="xs">Extra Small</Button>
                <Button size="sm">Small</Button>
                <Button size="md">Medium</Button>
                <Button size="lg">Large</Button>
                <Button size="xl">Extra Large</Button>
              </div>
            </div>

            {/* Icon Sizes */}
            <div>
              <h3 className="text-lg font-semibold text-(--color-text) mb-4">Icon Buttons</h3>
              <div className="flex flex-wrap items-end gap-3">
                <Button size="icon-sm" variant="outline" className='p-3'><Heart className="w-4 h-4" /></Button>
                <Button size="icon" className='p-2'><Star className="w-5 h-5" /></Button>
                <Button size="icon-lg" className='p-3 rounded-full'><Plus className="w-6 h-6" /></Button>
              </div>
            </div>

            {/* With Icons */}
            <div>
              <h3 className="text-lg font-semibold text-(--color-text) mb-4">With Icons</h3>
              <div className="flex flex-wrap gap-3">
                <Button leftIcon={<Download className="w-4 h-4" />}>Download</Button>
                <Button variant="secondary" rightIcon={<Upload className="w-4 h-4" />}>Upload</Button>
                <Button variant="outline" leftIcon={<Search className="w-4 h-4" />} rightIcon={<Plus className="w-4 h-4" />}>
                  Search & Add
                </Button>
              </div>
            </div>

            {/* Loading States */}
            <div>
              <h3 className="text-lg font-semibold text-(--color-text) mb-4">Loading States</h3>
              <div className="flex flex-wrap gap-3">
                <Button isLoading>Loading...</Button>
                <Button variant="secondary" isLoading>Processing</Button>
                <Button variant="outline" isLoading>Please Wait</Button>
              </div>
            </div>

            {/* Full Width */}
            <div>
              <h3 className="text-lg font-semibold text-(--color-text) mb-4">Full Width</h3>
              <Button fullWidth>Full Width Button</Button>
            </div>
          </div>
        );

      case 'carousel':
        return (
          <div className="space-y-8">
            {currentVariant.id === 'basic' && (
              <div>
                <h3 className="text-lg font-semibold text-(--color-text) mb-4">Basic Carousel</h3>
                <Carousel
                  variant="basic"
                  items={[1, 2, 3, 4, 5].map((num) => (
                    <Card key={num} className="p-12 text-center min-h-[200px] flex items-center justify-center bg-linear-to-br from-blue-500/10 to-purple-500/10">
                      <div>
                        <h3 className="text-2xl font-bold text-(--color-text) mb-2">Slide {num}</h3>
                        <p className="text-(--color-text-secondary)">Swipe to navigate on mobile</p>
                      </div>
                    </Card>
                  ))}
                />
              </div>
            )}

            {currentVariant.id === 'dots-below' && (
              <div>
                <h3 className="text-lg font-semibold text-(--color-text) mb-4">Dots Below</h3>
                <Carousel
                  variant="dots-below"
                  items={[1, 2, 3, 4].map((num) => (
                    <Card key={num} className="p-12 text-center min-h-[200px] flex items-center justify-center bg-linear-to-br from-green-500/10 to-teal-500/10">
                      <h3 className="text-2xl font-bold text-(--color-text)">Slide {num}</h3>
                    </Card>
                  ))}
                />
              </div>
            )}

            {currentVariant.id === 'stack' && (
              <div>
                <h3 className="text-lg font-semibold text-(--color-text) mb-4">3D Stack</h3>
                <Carousel
                  variant="stack"
                  maxStackedCards={3}
                  stackSpacing={120}
                  stackOffset={30}
                  items={[1, 2, 3, 4, 5, 6].map((num) => (
                    <Card key={num} className="p-12 text-center min-h-[250px] flex items-center justify-center bg-linear-to-br from-orange-500/10 to-red-500/10">
                      <div>
                        <h3 className="text-3xl font-bold text-(--color-text) mb-2">Card {num}</h3>
                        <p className="text-(--color-text-secondary)">Click to navigate</p>
                      </div>
                    </Card>
                  ))}
                />
              </div>
            )}

            {currentVariant.id === 'auto' && (
              <div>
                <h3 className="text-lg font-semibold text-(--color-text) mb-4">Auto-Rotate</h3>
                <Carousel
                  variant="stack"
                  enableAutoRotate
                  autoPlayInterval={3000}
                  items={[1, 2, 3, 4, 5].map((num) => (
                    <Card key={num} className="p-12 text-center min-h-[250px] flex items-center justify-center bg-linear-to-br from-purple-500/10 to-pink-500/10">
                      <div>
                        <h3 className="text-3xl font-bold text-(--color-text) mb-2">Auto {num}</h3>
                        <p className="text-(--color-text-secondary)">Rotates every 3 seconds</p>
                      </div>
                    </Card>
                  ))}
                />
              </div>
            )}

            <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-4">
              <p className="text-sm text-blue-800 dark:text-blue-200">
                💡 <strong>Mobile:</strong> Swipe left/right to navigate. Arrows are hidden on mobile for better touch experience.
              </p>
            </div>
          </div>
        );

      case 'card':
        return (
          <div className="grid grid-cols-1 mx-auto w-1/2">
            {/* Basic */}
            {currentVariant.id =="basic" &&<Card className="p-6">
              <h3 className="text-lg font-semibold text-(--color-text) mb-2">Basic Card</h3>
              <p className="text-(--color-text-secondary) text-sm">
                Simple card with default styling and border.
              </p>
            </Card>}

            {/* Compound */}
           {currentVariant.id =="compound" && <Card>
              <CardHeader>
                <CardTitle>Compound Card</CardTitle>
                <CardDescription>With header, body, and footer</CardDescription>
              </CardHeader>
              <CardBody>
                <p className="text-(--color-text-secondary) text-sm">
                  Structured layout using compound components.
                </p>
              </CardBody>
              <CardFooter>
                <Button size="sm">Action</Button>
                <Button size="sm" variant="ghost">Cancel</Button>
              </CardFooter>
            </Card>}

            {/* Badge */}
            {currentVariant.id=="badge" && <Card className="p-6 relative">
              <span className="absolute top-4 right-4 px-3 py-1 bg-blue-500 text-white rounded-full text-xs font-semibold shadow-lg">
                New
              </span>
              <h3 className="text-lg font-semibold text-(--color-text) mb-2">With Badge</h3>
              <p className="text-(--color-text-secondary) text-sm">
                Card with status badge overlay.
              </p>
            </Card>}

            {/* Gradient */}
            {currentVariant.id =="gradient"&&<Card variant="gradient" className="p-6">
              <h3 className="text-xl font-bold text-white mb-2">Gradient Card</h3>
              <p className="text-white/90 text-sm mb-4">
                Premium gradient background.
              </p>
              <Button variant="outline" size="sm" className="border-white text-white hover:bg-white/10">
                Learn More
              </Button>
            </Card>}

            {/* Gradient Border */}
           {currentVariant.id =="gradient-border" && <Card className="p-8! gradient-border mb-2" size={'xl'} >
              <h3 className="text-lg font-semibold text-(--color-text) mb-2">Gradient Border</h3>
              <p className="text-(--color-text-secondary) text-sm ">
                Glowing border on hover.
              </p>
            </Card>}

            {/* Glass */}
           { currentVariant.id =="glass" &&<div className="relative rounded-xl overflow-hidden">
              <div className="absolute inset-0 bg-linear-to-br from-blue-500/30 to-purple-500/30" />
              <Card variant="glass" className="p-6 relative">
                <h3 className="text-lg font-semibold text-(--color-text) mb-2">Glass Effect</h3>
                <p className="text-(--color-text-secondary) text-sm">
                  Frosted glass with backdrop blur.
                </p>
              </Card>
            </div>}
          </div>
        );

      case 'input':
        return (
          <div className="max-w-2xl mx-auto space-y-6">
            <Input type="text" label="Text Input" placeholder="Enter text..." />
            
            <Input type="email" label="Email" placeholder="john@example.com" />
            
            <Input type="password" label="Password" placeholder="Enter password..." />
            
            <Input 
              type="text" 
              label="With Icons" 
              placeholder="Search..."
              leftIcon={<Search className="w-4 h-4" />}
              rightIcon={<XIcon className="w-4 h-4" />}
            />
            
            <Input 
              type="email" 
              label="With Error" 
              placeholder="email@example.com"
              error="Invalid email address"
              helperText="Please enter a valid email"
            />
            
            <Input 
              type="text" 
              label="With Character Counter"
              placeholder="Max 50 characters..."
              maxLength={50}
              showCharCount
            />
            
            <Input 
              multiline 
              label="Textarea"
              placeholder="Enter multiple lines..."
              rows={4}
            />
          </div>
        );

      case 'drawer':
        return (
          <div className="space-y-6">
            {/* Positions */}
            <div>
              <h3 className="text-lg font-semibold text-(--color-text) mb-4">Positions</h3>
              <div className="flex flex-wrap gap-3">
                <Button onClick={() => { setDrawerPosition('left'); setDrawerOpen(true); }}>
                  Open Left
                </Button>
                <Button onClick={() => { setDrawerPosition('right'); setDrawerOpen(true); }}>
                  Open Right
                </Button>
                <Button onClick={() => { setDrawerPosition('top'); setDrawerOpen(true); }}>
                  Open Top
                </Button>
                <Button onClick={() => { setDrawerPosition('bottom'); setDrawerOpen(true); }}>
                  Open Bottom
                </Button>
              </div>
            </div>

            {/* Sizes */}
            <div>
              <h3 className="text-lg font-semibold text-(--color-text) mb-4">Sizes</h3>
              <div className="flex flex-wrap gap-3">
                <Button variant="secondary" onClick={() => { setDrawerSize('small'); setDrawerOpen(true); }}>
                  Small
                </Button>
                <Button variant="secondary" onClick={() => { setDrawerSize('medium'); setDrawerOpen(true); }}>
                  Medium
                </Button>
                <Button variant="secondary" onClick={() => { setDrawerSize('large'); setDrawerOpen(true); }}>
                  Large
                </Button>
                <Button variant="secondary" onClick={() => { setDrawerSize('xl'); setDrawerOpen(true); }}>
                  x-large
                </Button>
                <Button variant="secondary" onClick={() => { setDrawerSize('full'); setDrawerOpen(true); }}>
                  full
                </Button>
                <Button variant="secondary" onClick={() => { setDrawerSize('auto'); setDrawerOpen(true); }}>
                  auto
                </Button>
              </div>
            </div>

            <Drawer
              open={drawerOpen}
              onOpenChange={setDrawerOpen}
              position={drawerPosition}
              size={drawerSize}
              title={`${drawerPosition.charAt(0).toUpperCase() + drawerPosition.slice(1)} Drawer`}
              description={`Size: ${drawerSize}`}
            >
              <div className="space-y-4 p-4">
                <p className="text-(--color-text-secondary)">
                  This drawer slides from the {drawerPosition} with {drawerSize} size.
                </p>
                <Input label="Example Field" placeholder="Type something..." />
                <Button fullWidth onClick={() => setDrawerOpen(false)}>Close Drawer</Button>
              </div>
            </Drawer>
          </div>
        );

      case 'dialog':
        return (
          <div className="space-y-6">
            {/* Positions */}
            <div>
              <h3 className="text-lg font-semibold text-(--color-text) mb-4">Positions</h3>
              <div className="flex flex-wrap gap-3">
                <Button onClick={() => { setDialogPosition('center'); setDialogOpen(true); }}>
                  Center
                </Button>
                <Button onClick={() => { setDialogPosition('top'); setDialogOpen(true); }}>
                  Top
                </Button>
                <Button onClick={() => { setDialogPosition('bottom'); setDialogOpen(true); }}>
                  Bottom
                </Button>
              </div>
            </div>

            {/* Sizes */}
            <div>
              <h3 className="text-lg font-semibold text-(--color-text) mb-4">Sizes</h3>
              <div className="flex flex-wrap gap-3">
                <Button variant="secondary" onClick={() => { setDialogSize('sm'); setDialogOpen(true); }}>
                  Small
                </Button>
                <Button variant="secondary" onClick={() => { setDialogSize('md'); setDialogOpen(true); }}>
                  Medium
                </Button>
                <Button variant="secondary" onClick={() => { setDialogSize('lg'); setDialogOpen(true); }}>
                  Large
                </Button>
                <Button variant="secondary" onClick={() => { setDialogSize('xl'); setDialogOpen(true); }}>
                  Extra Large
                </Button>
              </div>
            </div>

            <Dialog
              open={dialogOpen}
              onOpenChange={setDialogOpen}
              title={`${dialogPosition.charAt(0).toUpperCase() + dialogPosition.slice(1)} Dialog`}
              description={`Size: ${dialogSize}`}
              position={dialogPosition}
              size={dialogSize}
            >
              <div className="space-y-4">
                <Input label="Your Name" placeholder="John Doe" />
                <Input type="email" label="Email" placeholder="john@example.com" />
                <div className="flex gap-2 justify-end pt-4">
                  <Button variant="ghost" onClick={() => setDialogOpen(false)}>Cancel</Button>
                  <Button onClick={() => setDialogOpen(false)}>Submit</Button>
                </div>
              </div>
            </Dialog>
          </div>
        );

      case 'combobox':
        // Dropdown with Icons Example
        const iconDropdownOptions: SelectOption[] = [
          { value: 'home', label: 'Home', description: 'Dashboard page', icon: <Home className="w-4 h-4" /> },
          { value: 'userProfile', label: 'Profile', description: 'User settings', icon: <User className="w-4 h-4" /> },
          { value: 'settings', label: 'Settings', description: 'App configuration', icon: <Settings className="w-4 h-4" /> },
          { value: 'mail', label: 'Messages', description: 'Inbox', icon: <Mail className="w-4 h-4" /> },
          { value: 'notifications', label: 'Notifications', description: 'Alerts', icon: <Bell className="w-4 h-4" /> },
          { value: 'security', label: 'Security', description: 'Privacy settings', icon: <Shield className="w-4 h-4" /> },
        ];

        // Searchable Combobox with Keywords
        const countryOptions: ComboboxOption[] = [
          { 
            value: 'usa', 
            label: 'United States', 
            description: 'North America',
            icon: '🇺🇸',
            keywords: ['america', 'us', 'states']
          },
          { 
            value: 'uk', 
            label: 'United Kingdom', 
            description: 'Europe',
            icon: '🇬🇧',
            keywords: ['britain', 'england', 'gb']
          },
          { 
            value: 'canada', 
            label: 'Canada', 
            description: 'North America',
            icon: '🇨🇦',
            keywords: ['ca']
          },
          { 
            value: 'germany', 
            label: 'Germany', 
            description: 'Europe',
            icon: '🇩🇪',
            keywords: ['deutschland', 'de']
          },
          { 
            value: 'france', 
            label: 'France', 
            description: 'Europe',
            icon: '🇫🇷',
            keywords: ['fr']
          },
          { 
            value: 'japan', 
            label: 'Japan', 
            description: 'Asia',
            icon: '🇯🇵',
            keywords: ['jp', 'nihon']
          },
          { 
            value: 'india', 
            label: 'India', 
            description: 'Asia',
            icon: '🇮🇳',
            keywords: ['in', 'bharat']
          },
          { 
            value: 'australia', 
            label: 'Australia', 
            description: 'Oceania',
            icon: '🇦🇺',
            keywords: ['au', 'aussie']
          },
        ];

        // Color Palette Dropdown
        const colorOptions: SelectOption[] = [
          { 
            value: 'blue', 
            label: 'Ocean Blue', 
            description: 'Cool and professional',
            colorPalette: ['#3b82f6', '#60a5fa', '#93c5fd', '#dbeafe']
          },
          { 
            value: 'purple', 
            label: 'Royal Purple', 
            description: 'Creative and bold',
            colorPalette: ['#8b5cf6', '#a78bfa', '#c4b5fd', '#ede9fe']
          },
          { 
            value: 'green', 
            label: 'Forest Green', 
            description: 'Fresh and natural',
            colorPalette: ['#22c55e', '#4ade80', '#86efac', '#dcfce7']
          },
          { 
            value: 'red', 
            label: 'Crimson Red', 
            description: 'Energetic and passionate',
            colorPalette: ['#ef4444', '#f87171', '#fca5a5', '#fee2e2']
          },
          { 
            value: 'amber', 
            label: 'Golden Amber', 
            description: 'Warm and inviting',
            colorPalette: ['#f59e0b', '#fbbf24', '#fcd34d', '#fef3c7']
          },
        ];

        return (
          <div className="space-y-8">
            {currentVariant.id === 'basic' && (
              <div className="grid sm:grid-cols-2 gap-6 max-w-4xl mx-auto">
                {/* Dropdown with Icons */}
                <Card>
                  <CardHeader>
                    <CardTitle className="text-base">Dropdown with Icons</CardTitle>
                    <CardDescription>Select navigation page</CardDescription>
                  </CardHeader>
                  <CardBody>
                    <Dropdown
                      value={comboboxValue}
                      onValueChange={setComboboxValue}
                      options={iconDropdownOptions}
                      placeholder="Choose a page"
                    />
                  </CardBody>
                </Card>

                {/* Basic Combobox */}
                <Card>
                  <CardHeader>
                    <CardTitle className="text-base">Basic Combobox</CardTitle>
                    <CardDescription>Simple searchable list</CardDescription>
                  </CardHeader>
                  <CardBody>
                    <Combobox
                      value={comboboxValue}
                      onValueChange={setComboboxValue}
                      options={[
                        { value: '1', label: 'Option 1' },
                        { value: '2', label: 'Option 2' },
                        { value: '3', label: 'Option 3' },
                        { value: '4', label: 'Option 4' },
                        { value: '5', label: 'Option 5' },
                      ]}
                      placeholder="Select option..."
                      searchPlaceholder="Search..."
                    />
                  </CardBody>
                </Card>
              </div>
            )}

            {currentVariant.id === 'with-icons' && (
              <div className="grid sm:grid-cols-2 gap-6 max-w-4xl mx-auto">
                {/* Searchable Country Combobox */}
                <Card>
                  <CardHeader>
                    <CardTitle className="text-base">Searchable with Keywords</CardTitle>
                    <CardDescription>Try searching "america" or "gb"</CardDescription>
                  </CardHeader>
                  <CardBody>
                    <Combobox
                      value={comboboxValue}
                      onValueChange={setComboboxValue}
                      options={countryOptions}
                      placeholder="Choose a country"
                      searchPlaceholder="Search countries..."
                      maxHeight="300px"
                      emptyMessage="Country not found"
                    />
                    <div className="mt-3 p-3 rounded-lg bg-(--color-bg-tertiary) text-xs">
                      <span className="text-(--color-text-muted)">Selected:</span>{' '}
                      <span className="font-medium text-(--color-text)">{comboboxValue || 'none'}</span>
                    </div>
                  </CardBody>
                </Card>

                {/* Dropdown with Icon Options */}
                <Card>
                  <CardHeader>
                    <CardTitle className="text-base">Icon Options</CardTitle>
                    <CardDescription>Dropdown with lucide icons</CardDescription>
                  </CardHeader>
                  <CardBody>
                    <Dropdown
                      value={comboboxValue}
                      onValueChange={setComboboxValue}
                      options={iconDropdownOptions}
                      placeholder="Select page"
                    />
                  </CardBody>
                </Card>
              </div>
            )}

            {currentVariant.id === 'with-descriptions' && (
              <div className="grid sm:grid-cols-2 gap-6 max-w-4xl mx-auto">
                {/* Color Palette Dropdown */}
                <Card>
                  <CardHeader>
                    <CardTitle className="text-base">Color Palette</CardTitle>
                    <CardDescription>Visual color swatches</CardDescription>
                  </CardHeader>
                  <CardBody>
                    <Dropdown
                      value={comboboxValue}
                      onValueChange={setComboboxValue}
                      options={colorOptions}
                      placeholder="Choose color scheme"
                    />
                  </CardBody>
                </Card>

                {/* Framework Combobox */}
                <Card>
                  <CardHeader>
                    <CardTitle className="text-base">With Descriptions</CardTitle>
                    <CardDescription>Options with detailed info</CardDescription>
                  </CardHeader>
                  <CardBody>
                    <Combobox
                      value={comboboxValue}
                      onValueChange={setComboboxValue}
                      options={[
                        { 
                          value: 'react', 
                          label: 'React', 
                          description: 'A JavaScript library for building user interfaces',
                          icon: <FileText className="w-4 h-4" />
                        },
                        { 
                          value: 'vue', 
                          label: 'Vue.js', 
                          description: 'The Progressive JavaScript Framework',
                          icon: <ImageIcon className="w-4 h-4" />
                        },
                        { 
                          value: 'angular', 
                          label: 'Angular', 
                          description: 'Platform for building mobile and desktop',
                          icon: <FileText className="w-4 h-4" />
                        },
                        { 
                          value: 'svelte', 
                          label: 'Svelte', 
                          description: 'Cybernetically enhanced web apps',
                          icon: <Zap className="w-4 h-4" />
                        },
                      ]}
                      placeholder="Select framework..."
                      searchPlaceholder="Search frameworks..."
                    />
                  </CardBody>
                </Card>
              </div>
            )}

            {/* Feature Showcase */}
            <Card className="max-w-4xl mx-auto">
              <CardHeader>
                <CardTitle>Features</CardTitle>
              </CardHeader>
              <CardBody>
                <div className="grid sm:grid-cols-2 gap-4">
                  <div className="flex items-start gap-3">
                    <Zap className="w-5 h-5 text-(--color-brand) shrink-0 mt-0.5" />
                    <div>
                      <strong className="text-(--color-text) text-sm">Portal Rendering</strong>
                      <p className="text-xs text-(--color-text-secondary) mt-1">No z-index conflicts</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <Star className="w-5 h-5 text-(--color-brand) shrink-0 mt-0.5" />
                    <div>
                      <strong className="text-(--color-text) text-sm">Smart Search</strong>
                      <p className="text-xs text-(--color-text-secondary) mt-1">Searches labels, descriptions, keywords</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <Heart className="w-5 h-5 text-(--color-brand) shrink-0 mt-0.5" />
                    <div>
                      <strong className="text-(--color-text) text-sm">Icon Support</strong>
                      <p className="text-xs text-(--color-text-secondary) mt-1">Icons, emojis, or components</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <Palette className="w-5 h-5 text-(--color-brand) shrink-0 mt-0.5" />
                    <div>
                      <strong className="text-(--color-text) text-sm">Color Palettes</strong>
                      <p className="text-xs text-(--color-text-secondary) mt-1">Visual color circle arrays</p>
                    </div>
                  </div>
                </div>
              </CardBody>
            </Card>
          </div>
        );

      case 'contextMenu':
        const menuItems: MenuItemLocal[] = 
          currentVariant.id === 'basic' ? [
            { id: '1', label: 'Profile', type: 'default' },
            { id: 'sep1', type: 'separator' },
            { id: '2', label: 'Settings', type: 'default' },
            { id: '3', label: 'Logout', type: 'default' },
          ] :
          currentVariant.id === 'nested' ? [
            { id: '1', label: 'Edit', type: 'default' },
            { 
              id: 'group', 
              label: 'More Actions', 
              type: 'group',
              children: [
                { id: 'share', label: 'Share', type: 'default' },
                { id: 'duplicate', label: 'Duplicate', type: 'default' },
                { id: 'archive', label: 'Archive', type: 'default' },
              ]
            },
            { id: 'sep', type: 'separator' },
            { id: 'delete', label: 'Delete', type: 'default' },
          ] : [
            { id: '1', label: 'Edit', icon: <Edit className="w-4 h-4" />, type: 'default' },
            { id: '2', label: 'Download', icon: <Download className="w-4 h-4" />, type: 'default' },
            { id: 'sep', type: 'separator' },
            { id: '3', label: 'Delete', icon: <Trash className="w-4 h-4" />, type: 'default' },
          ];

        return (
          <div className="flex justify-center">
            <ContextMenu
              trigger={<Button>{currentVariant.label} Menu</Button>}
              menuItems={menuItems as any}
            />
          </div>
        );

      case 'colorPalette':
        const paletteVariant = currentVariant.id as 'grid' | 'swatches' | 'compact';
        return (
          <ColorPalette 
            variant={paletteVariant} 
            showLabels={paletteVariant !== 'compact'}
          />
        );

      default:
        return null;
    }
  };

  const getExampleCode = () => {
    switch (selectedComponent) {
      case 'button':
        return `// All Button Variants
<Button variant="primary">Primary</Button>
<Button variant="secondary">Secondary</Button>
<Button variant="outline">Outline</Button>
<Button variant="ghost">Ghost</Button>
<Button variant="danger">Danger</Button>
<Button variant="success">Success</Button>
<Button variant="warning">Warning</Button>
<Button variant="glass">Glass</Button>
<Button variant="link">Link</Button>
<Button variant="gradient">Gradient</Button>
<Button variant="gradient-border">Gradient Border</Button>

// Sizes
<Button size="xs">Extra Small</Button>
<Button size="sm">Small</Button>
<Button size="md">Medium</Button>
<Button size="lg">Large</Button>
<Button size="xl">Extra Large</Button>

// With Icons
<Button leftIcon={<Download />}>Download</Button>
<Button rightIcon={<Upload />}>Upload</Button>

// Loading State
<Button isLoading>Loading...</Button>

// Full Width
<Button fullWidth>Full Width</Button>`;

      case 'carousel':
        return `<Carousel
  variant="${currentVariant.id}"
  ${currentVariant.id === 'stack' ? `maxStackedCards={3}
  stackSpacing={120}
  stackOffset={30}` : ''}
  ${currentVariant.id === 'auto' ? `enableAutoRotate
  autoPlayInterval={3000}` : ''}
  items={slides.map((slide) => (
    <Card key={slide.id}>
      {slide.content}
    </Card>
  ))}
/>`;

      case 'card':
        return `// Basic
<Card className="p-6">
  <h3>Card Title</h3>
  <p>Content</p>
</Card>

// Compound
<Card>
  <CardHeader>
    <CardTitle>Title</CardTitle>
    <CardDescription>Description</CardDescription>
  </CardHeader>
  <CardBody>
    <p>Main content</p>
  </CardBody>
  <CardFooter>
    <Button>Action</Button>
  </CardFooter>
</Card>

// With Badge
<Card className="p-6 relative">
  <span className="absolute top-4 right-4 px-3 py-1 bg-blue-500 text-white rounded-full text-xs">
    New
  </span>
  <h3>Featured</h3>
</Card>

// Gradient
<Card variant="gradient" className="p-6">
  <h3 className="text-white">Premium</h3>
</Card>

// Gradient Border
<Card className="p-6 gradient-border-glow">
  <h3>Glow Border</h3>
</Card>

// Glass
<Card variant="glass" className="p-6">
  <h3>Frosted Glass</h3>
</Card>`;

      case 'input':
        return `// Text Input
<Input type="text" label="Name" placeholder="Enter name..." />

// Email
<Input type="email" label="Email" placeholder="email@example.com" />

// Password
<Input type="password" label="Password" placeholder="Enter password..." />

// With Icons
<Input 
  leftIcon={<Search />}
  rightIcon={<X />}
  placeholder="Search..."
/>

// With Error
<Input 
  error="Invalid email"
  helperText="Please enter a valid email"
/>

// Character Counter
<Input 
  maxLength={50}
  showCharCount
/>

// Textarea
<Input multiline rows={4} />`;

      case 'drawer':
        return `// Positions
<Drawer
  open={open}
  onOpenChange={setOpen}
  position="${drawerPosition}" // left | right | top | bottom
  size="${drawerSize}" // small | medium | large | xl | full | auto
  title="Drawer Title"
>
  <p>Drawer content</p>
</Drawer>`;

      case 'dialog':
        return `<Dialog
  open={open}
  onOpenChange={setOpen}
  position="${dialogPosition}" // center | top | bottom | left | right
  size="${dialogSize}" // sm | md | lg | xl | full
  title="Dialog Title"
  description="Dialog description"
>
  <div>Dialog content</div>
</Dialog>`;

      case 'combobox':
        return `// Dropdown with Icons
<Dropdown
  value={value}
  onValueChange={setValue}
  options={[
    { value: 'home', label: 'Home', description: 'Dashboard', icon: <Home /> },
    { value: 'settings', label: 'Settings', description: 'Configuration', icon: <Settings /> },
  ]}
  placeholder="Choose a page"
/>

// Searchable Combobox with Keywords
<Combobox
  value={country}
  onValueChange={setCountry}
  options={[
    { 
      value: 'usa', 
      label: 'United States',
      icon: '🇺🇸',
      keywords: ['america', 'us']
    },
    { 
      value: 'uk', 
      label: 'United Kingdom',
      icon: '🇬🇧',
      keywords: ['britain', 'gb']
    },
  ]}
  searchPlaceholder="Search countries..."
  emptyMessage="Country not found"
/>

// Color Palette Dropdown
<Dropdown
  value={color}
  onValueChange={setColor}
  options={[
    { 
      value: 'blue',
      label: 'Ocean Blue',
      description: 'Cool and professional',
      colorPalette: ['#3b82f6', '#60a5fa', '#93c5fd']
    },
  ]}
/>`;

      case 'contextMenu':
        return `<ContextMenu
  trigger={<Button>Menu</Button>}
  menuItems={[
    { id: '1', label: 'Item 1', type: 'default'${currentVariant.id === 'with-icons' ? ', icon: <Icon />' : ''} },
    ${currentVariant.id === 'nested' ? `{ 
      id: 'group', 
      label: 'Submenu', 
      type: 'group',
      children: [...]
    },` : ''}
    { id: 'sep', type: 'separator' },
    { id: '2', label: 'Item 2', type: 'default' },
  ]}
/>`;

      case 'colorPalette':
        return `<ColorPalette 
  variant="${currentVariant.id}" // grid | swatches | compact
  showLabels={${currentVariant.id !== 'compact'}}
/>`;

      default:
        return '';
    }
  };

  return (
    <div className="container mx-auto p-4 sm:p-6 space-y-6 sm:space-y-8 max-w-7xl">
      {/* Header */}
      <div className="text-center space-y-3">
        <h1 className="text-3xl sm:text-4xl font-bold text-(--color-text)">
          Component Library 🎨
        </h1>
        <p className="text-(--color-text-secondary) max-w-3xl mx-auto text-sm sm:text-base">
          Complete interactive reference with all variants, sizes, and props. 
          Copy code snippets and see live examples of every component.
        </p>
      </div>

      {/* Component Selector */}
      <Card className="p-4 sm:p-6">
        <label className="block text-sm font-medium text-(--color-text) mb-3">
          Select Component:
        </label>
        <select
          value={selectedComponent}
          onChange={(e) => {
            setSelectedComponent(e.target.value as ComponentType);
            setSelectedVariant(0);
          }}
          className="w-full px-4 py-2.5 bg-(--color-bg) border-2 border-(--color-border) rounded-lg text-(--color-text) focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
        >
          <option value="button">Button - 11 variants, 8 sizes</option>
          <option value="carousel">Carousel - Touch enabled, 4 variants</option>
          <option value="card">Card - 6 variants with compound components</option>
          <option value="input">Input - Labels, icons, validation states</option>
          <option value="drawer">Drawer - 4 positions, 6 sizes</option>
          <option value="dialog">Dialog - 3 positions, 5 sizes</option>
          <option value="combobox">Combobox - Searchable with icons</option>
          <option value="contextMenu">Context Menu - Nested, icons</option>
          <option value="colorPalette">Color Palette - Interactive copy</option>
        </select>
        <div className="mt-3 p-3 bg-(--color-bg-secondary) rounded-lg">
          <p className="text-sm text-(--color-text)">
            <strong>{currentComponentData.name}</strong> · {currentComponentData.category}
          </p>
          <p className="text-sm text-(--color-text-secondary) mt-1">
            {currentComponentData.description}
          </p>
        </div>
      </Card>

      {/* Variant Selector */}
      {currentComponentData.variants.length > 0 && (
        <Card className="p-4 sm:p-6">
          <label className="block text-sm font-medium text-(--color-text) mb-3">
            Variant:
          </label>
          <div className="flex gap-2 flex-wrap">
            {currentComponentData.variants.map((variant: any, index: number) => (
              <button
                key={variant.id}
                onClick={() => setSelectedVariant(index)}
                className={`px-3 sm:px-4 py-2 rounded-lg font-medium transition-all text-sm sm:text-base ${
                  selectedVariant === index
                    ? 'bg-blue-600 text-white shadow-lg scale-105'
                    : 'bg-(--color-bg-secondary) text-(--color-text) hover:bg-(--color-bg-tertiary) hover:shadow-md'
                }`}
                title={variant.description}
              >
                {variant.label}
              </button>
            ))}
          </div>
          <p className="text-sm text-(--color-text-secondary) mt-3">
            {currentVariant.description}
          </p>
        </Card>
      )}

      {/* Live Preview */}
      <Card className="p-6 sm:p-8">
        <h2 className="text-xl font-semibold text-(--color-text) mb-6 flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
          Live Interactive Preview
        </h2>
        <div className="min-h-[300px] bg-(--color-bg-secondary) rounded-xl p-6 sm:p-8">
          {renderComponentPreview()}
        </div>
      </Card>

      {/* Code Example */}
      <Card className="p-4 sm:p-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg sm:text-xl font-semibold text-(--color-text)">
            Code Example
          </h2>
        </div>
        <CodeBlock 
          code={getExampleCode()} 
          onCopy={() => copyToClipboard(getExampleCode())}
        />
      </Card>

      {/* Props Table */}
      {currentComponentData.props && currentComponentData.props.length > 0 && (
        <Card className="p-4 sm:p-6">
          <h2 className="text-lg sm:text-xl font-semibold text-(--color-text) mb-4">
            Props Reference
          </h2>
          <PropsTable props={currentComponentData.props} />
        </Card>
      )}
    </div>
  );
}
