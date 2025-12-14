export type Theme = 
  | 'light'          // Ocean Light - Professional blue (default)
  | 'dark'           // Ocean Deep - Deep blue-gray dark
  | 'glass-light'    // Forest - Deep forest green dark theme
  | 'glass-dark'     // Cosmic - Dark with purple accents
  | 'slate'          // Milky Mist - Soft purple-gray pastels
  | 'midnight'       // Midnight - True black OLED with purple
  | 'system';        // Follow system preference

export type ResolvedTheme = Exclude<Theme, 'system'>;

export interface ThemeContextType {
  theme: Theme;
  resolvedTheme: ResolvedTheme;
  setTheme: (theme: Theme) => void;
  toggleTheme: () => void;
  isDarkMode: boolean;
}