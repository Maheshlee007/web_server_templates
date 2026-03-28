import { createContext, useContext, useEffect, useState, type ReactNode } from 'react';
import { Theme, ThemeContextType, ResolvedTheme } from '../types/theme';

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);
const THEME_STORAGE_KEY = 'webstack-theme';

interface ThemeProviderProps {
  children: ReactNode;
  initialTheme?: Theme;
}

const getSystemTheme = (): ResolvedTheme => {
  if (typeof window === 'undefined') return 'dark';
  return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
};

const getSavedTheme = (fallback: Theme): Theme => {
  if (typeof window === 'undefined') return fallback;
  const saved = localStorage.getItem(THEME_STORAGE_KEY);
  if (saved && ['light', 'dark', 'glass-light', 'glass-dark', 'slate', 'midnight', 'system'].includes(saved)) {
    return saved as Theme;
  }
  return fallback;
};

export function ThemeProvider({ children, initialTheme = 'light' }: ThemeProviderProps) {
  const [theme, setThemeState] = useState<Theme>(() => getSavedTheme(initialTheme));
  const [systemTheme, setSystemTheme] = useState<ResolvedTheme>(getSystemTheme());

  const resolvedTheme = theme === 'system' ? systemTheme : theme;

  // Light themes: light (Ocean Light), glass-light (Crystal Clear), slate (Citrus White)
  // Dark themes: dark (Ocean Deep), glass-dark (Cosmic), midnight (Midnight Pro)
  const isDarkMode = resolvedTheme === 'dark' || resolvedTheme === 'glass-dark' || resolvedTheme === 'midnight';

  useEffect(() => {
    const root = document.documentElement;

    root.removeAttribute('data-theme');
    root.classList.remove('light', 'dark', 'glass-dark', 'glass-light', 'midnight', 'slate');

    root.setAttribute('data-theme', resolvedTheme);
    root.classList.add(resolvedTheme);

    localStorage.setItem(THEME_STORAGE_KEY, theme);
  }, [theme, resolvedTheme]);

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    const handleChange = (e: MediaQueryListEvent) => {
      setSystemTheme(e.matches ? 'dark' : 'light');
    };
    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, []);

  const setTheme = (newTheme: Theme) => {
    setThemeState(newTheme);
  };

  const toggleTheme = () => {
    setThemeState((prevTheme) => {
      const resolved = prevTheme === 'system' ? systemTheme : prevTheme;
      switch (resolved) {
        case 'light': return 'dark';
        case 'dark': return 'glass-light';
        case 'glass-light': return 'glass-dark';
        case 'glass-dark': return 'slate';
        case 'slate': return 'midnight';
        case 'midnight': return 'light';
        default: return 'light';
      }
    });
  };

  const value: ThemeContextType = {
    theme,
    resolvedTheme,
    setTheme,
    toggleTheme,
    isDarkMode,
  };

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
}

export function useTheme(): ThemeContextType {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
}

