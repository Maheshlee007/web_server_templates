 import {createContext,useContext,useEffect,useState ,type ReactNode} from 'react';
 import { Theme, ThemeContextType, ResolvedTheme } from '../types/theme';

 const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

 interface ThemeProviderProps {
     children: ReactNode;
     initialTheme?: Theme;
 }

 const getSystemTheme = (): ResolvedTheme => {
    if(typeof window === 'undefined') return 'dark';
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';    
 }



 export function ThemeProvider({ children, initialTheme = 'light' }: ThemeProviderProps) {
        const [theme, setThemeState] = useState<Theme>(initialTheme);
        const [systemTheme, setSystemTheme] = useState<ResolvedTheme>(getSystemTheme());

        const resolvedTheme = theme === 'system' ? systemTheme : theme;

        // Light themes: light (Ocean), slate (Milky Mist)
        // Dark themes: dark (Ocean Deep), glass-light (Forest), glass-dark (Cosmic), midnight (Midnight)
        const isDarkMode = resolvedTheme === 'dark' || resolvedTheme === 'glass-light' || resolvedTheme === 'glass-dark' || resolvedTheme === 'midnight';
         // Apply theme to document

        useEffect(() => {
        const root = document.documentElement;

        // Remove old theme classes
        root.removeAttribute('data-theme');
        root.classList.remove('light', 'dark', 'glass-dark', 'glass-light', 'midnight', 'slate');

        // Apply new theme
        root.setAttribute('data-theme', resolvedTheme);
        root.classList.add(resolvedTheme);

        // Persist to localStorage
        // localStorage.setItem(THEME_STORAGE_KEY, theme);
        }, [theme, resolvedTheme]);

        useEffect(()=>{
            const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
            const handleChange = (e: MediaQueryListEvent) => {
                 setSystemTheme(e.matches ? 'dark' : 'light');
            }
             mediaQuery.addEventListener('change', handleChange);

            return () => mediaQuery.removeEventListener('change', handleChange)
        },[]);

const setTheme = (newTheme: Theme) => {
    setThemeState(newTheme);
  };
  
  const toggleTheme = () => {
    // Cycle through: Ocean Light -> Ocean Deep -> Forest -> Cosmic -> Milky Mist -> Midnight -> repeat
    setThemeState((prevTheme) => {
      const resolved = prevTheme === 'system' ? systemTheme : prevTheme;
      switch (resolved) {
        case 'light': return 'dark';         // Ocean Light -> Ocean Deep
        case 'dark': return 'glass-light';   // Ocean Deep -> Forest
        case 'glass-light': return 'glass-dark'; // Forest -> Cosmic
        case 'glass-dark': return 'slate';   // Cosmic -> Sunset
        case 'slate': return 'midnight';     // Sunset -> Midnight
        case 'midnight': return 'light';     // Midnight -> Ocean Light
        default: return 'light';
      }
    });
  };

  const value:ThemeContextType = {
    theme,
    resolvedTheme,
    setTheme,
    toggleTheme,
    isDarkMode
  }
    return <ThemeContext.Provider value={value}> {children}</ThemeContext.Provider>;
       
 }

 export function useTheme(): ThemeContextType {
  const context = useContext(ThemeContext);
  
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  
  return context;
}

