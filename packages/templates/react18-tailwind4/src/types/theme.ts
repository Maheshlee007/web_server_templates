export type Theme = 
  | 'dark'           // Professional dark (default)
  | 'light'          // Clean white
  | 'glass-dark'     // Glassmorphism blue-black
  | 'glass-light'    // Glassmorphism light
  | 'midnight'       // OLED black with purple
  | 'slate'          // Warm gray with amber
  | 'system';        // Follow system preference

export type ResolvedTheme = Exclude<Theme, 'system'>;

export interface ThemeContextType {
  theme: Theme;
  resolvedTheme: ResolvedTheme;
  setTheme: (theme: Theme) => void;
  toggleTheme: () => void;
  isDarkMode: boolean;
}