import { useState } from 'react';
import { Dropdown, Combobox, SelectOption, ComboboxOption } from '@/components/UI/radix';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/UI/Card';
import { 
  Home, 
  User, 
  Settings, 
  Mail, 
  Bell, 
  Shield,
  Zap,
  Star,
  Heart,
  Bookmark
} from 'lucide-react';

export default function DropdownExamples() {
  const [selectedIcon, setSelectedIcon] = useState('home');
  const [selectedCountry, setSelectedCountry] = useState('usa');
  const [selectedColor, setSelectedColor] = useState('blue');

  // Example 1: Dropdown with icons
  const iconOptions: SelectOption[] = [
    { value: 'home', label: 'Home', description: 'Dashboard page', icon: <Home /> },
    { value: 'userProfile', label: 'Profile', description: 'User settings', icon: <User /> },
    { value: 'settings', label: 'Settings', description: 'App configuration', icon: <Settings /> },
    { value: 'mail', label: 'Messages', description: 'Inbox', icon: <Mail /> },
    { value: 'Notifications', label: 'Notifications', description: 'Alerts', icon: <Bell /> },
    { value: 'Security', label: 'Security', description: 'Privacy settings', icon: <Shield /> },
  ];

  // Example 2: Searchable combobox with icons and keywords
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

  // Example 3: Dropdown with color palettes
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
    <div className="min-h-screen bg-(--color-bg) p-8">
      <div className="max-w-7xl mx-auto space-y-8">
        <div>
          <h1 className="text-4xl font-bold text-(--color-text) mb-2">
            Dropdown & Combobox Examples
          </h1>
          <p className="text-(--color-text-secondary)">
            Radix UI powered dropdowns with icons, color palettes, and search
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
          {/* Example 1: Icon Dropdown */}
          <Card>
            <CardHeader>
              <CardTitle>Icon Dropdown</CardTitle>
            </CardHeader>
            <CardContent>
              <Dropdown
                value={selectedIcon}
                onValueChange={setSelectedIcon}
                options={iconOptions}
                label="Select a page"
                placeholder="Choose a page"
              />
              <div className="mt-4 p-4 rounded-lg bg-(--color-bg-tertiary) text-sm">
                <span className="text-(--color-text-muted)">Selected:</span>{' '}
                <span className="font-medium text-(--color-text)">{selectedIcon}</span>
              </div>
            </CardContent>
          </Card>

          {/* Example 2: Searchable Combobox */}
          <Card>
            <CardHeader>
              <CardTitle>Searchable Combobox</CardTitle>
            </CardHeader>
            <CardContent>
              <Combobox
                value={selectedCountry}
                onValueChange={setSelectedCountry}
                options={countryOptions}
                label="Select a country"
                placeholder="Choose a country"
                searchPlaceholder="Search countries..."
                maxHeight="300px"
                className='scrollbar-thin'
                // disabled
                
                emptyMessage="it's not here"
              />
              <div className="mt-4 p-4 rounded-lg bg-(--color-bg-tertiary) text-sm">
                <span className="text-(--color-text-muted)">Selected:</span>{' '}
                <span className="font-medium text-(--color-text)">{selectedCountry}</span>
              </div>
            </CardContent>
          </Card>

          {/* Example 3: Color Palette Dropdown */}
          <Card>
            <CardHeader>
              <CardTitle>Color Palette Dropdown</CardTitle>
            </CardHeader>
            <CardContent>
              <Dropdown
                value={selectedColor}
                onValueChange={setSelectedColor}
                options={colorOptions}
                label="Select a color scheme"
                placeholder="Choose colors"
              />
              <div className="mt-4 p-4 rounded-lg bg-(--color-bg-tertiary) text-sm">
                <span className="text-(--color-text-muted)">Selected:</span>{' '}
                <span className="font-medium text-(--color-text)">{selectedColor}</span>
              </div>
            </CardContent>
          </Card>

          {/* Example 4: Feature Showcase */}
          <Card>
            <CardHeader>
              <CardTitle>Features</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-3 text-sm text-(--color-text-secondary)">
                <li className="flex items-start gap-2">
                  <Zap className="w-5 h-5 text-(--color-brand) shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-(--color-text)">Portal Rendering</strong> - No z-index issues
                  </div>
                </li>
                <li className="flex items-start gap-2">
                  <Star className="w-5 h-5 text-(--color-brand) shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-(--color-text)">Fixed Width + Scroll</strong> - Scrollable content
                  </div>
                </li>
                <li className="flex items-start gap-2">
                  <Heart className="w-5 h-5 text-(--color-brand) shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-(--color-text)">Icon Support</strong> - Icons or emojis
                  </div>
                </li>
                <li className="flex items-start gap-2">
                  <Bookmark className="w-5 h-5 text-(--color-brand) shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-(--color-text)">Color Palettes</strong> - Visual color circles
                  </div>
                </li>
              </ul>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
