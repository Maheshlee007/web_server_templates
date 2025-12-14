import { useTheme } from '../../context/themeContext';
import type { Theme } from '../../types/theme';
import { Dropdown, SelectOption } from './radix';

const themeOptions: SelectOption[] = [
  { 
    value: 'light', 
    label: 'Ocean Light', 
    description: 'Professional blue - Clean & modern',
    colorPalette: ['#ffffff', '#2563eb', '#e11d48', '#16a34a']
  },
  { 
    value: 'dark', 
    label: 'Ocean Deep', 
    description: 'Deep blue-gray - Eye comfort dark',
    colorPalette: ['#0f172a', '#60a5fa', '#fb7185', '#4ade80']
  },
  { 
    value: 'glass-light', 
    label: 'Crystal Clear', 
    description: 'Crisp modern light with violet branding',
    colorPalette: ['#fbfbfe', '#8b5cf6', '#ec4899', '#f4f4f7']
  },
  { 
    value: 'glass-dark', 
    label: 'Cosmic', 
    description: 'Deep space with purple accents - Dark',
    colorPalette: ['#0f172a', '#a78bfa', '#22d3ee', '#94a3b8']
  },
  { 
    value: 'slate', 
    label: 'Citrus White', 
    description: 'Pure white with vibrant orange accents',
    colorPalette: ['#ffffff', '#ea580c', '#f97316', '#f1f5f9']
  },
  { 
    value: 'midnight', 
    label: 'Midnight Pro', 
    description: 'Ultimate dark mode - Deep indigo-slate',
    colorPalette: ['#0b0e16', '#a78bfa', '#22d3ee', '#151926']
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
