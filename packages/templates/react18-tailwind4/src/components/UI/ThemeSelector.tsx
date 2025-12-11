import { useTheme } from '../../context/themeContext';
import type { Theme } from '../../types/theme';
import { Dropdown, SelectOption } from './radix';

const themeOptions: SelectOption[] = [
  { 
    value: 'light', 
    label: 'Light', 
    description: 'Clean white',
    colorPalette: ['#ffffff', '#0f172a', '#3b82f6', '#f43f5e']
  },
  { 
    value: 'dark', 
    label: 'Dark', 
    description: 'Professional solid dark',
    colorPalette: ['#0f172a', '#f1f5f9', '#60a5fa', '#fb7185']
  },
  { 
    value: 'glass-dark', 
    label: 'Glass Dark', 
    description: 'Blue-black glassmorphism',
    colorPalette: ['#0a0e1a', '#f1f5f9', '#60a5fa', '#fb7185']
  },
  { 
    value: 'glass-light', 
    label: 'Glass Light', 
    description: 'Light glassmorphism',
    colorPalette: ['#f8fafc', '#0f172a', '#2563eb', '#e11d48']
  },
  { 
    value: 'midnight', 
    label: 'Midnight', 
    description: 'OLED black with purple',
    colorPalette: ['#000000', '#e5e7eb', '#a78bfa', '#22d3ee']
  },
  { 
    value: 'slate', 
    label: 'Slate', 
    description: 'Warm gray with amber',
    colorPalette: ['#1c1917', '#fafaf9', '#fbbf24', '#2dd4bf']
  },
  { 
    value: 'system', 
    label: 'System', 
    description: 'Follow system preference',
    colorPalette: ['#64748b', '#f1f5f9', '#94a3b8', '#cbd5e1']
  },
];

export function ThemeSelector() {
  const { theme, setTheme } = useTheme();

  const handleChange = (value: string) => {
    setTheme(value as Theme);
  };

  return (
    <Dropdown
      value={theme}
      onValueChange={handleChange}
      options={themeOptions}
      label=""
      placeholder="Select a theme"
      // maxHeight="400px"
      className="max-w-xs mr-6"
    />
  );
}
