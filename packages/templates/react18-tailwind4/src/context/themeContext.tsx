 import {createContext,useContext,useEffect,useState ,type ReactNode} from 'react';
 import { Theme,ThemeContextType } from '../types/theme';

 const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

 interface ThemeProviderProps {
     children: ReactNode;
     initialTheme?: Theme;
 }

 const getSystemTheme = (): 'light' | 'dark' => {
    if(typeof window === 'undefined') return 'light';
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';    
 }



 export function ThemeProvider({ children, initialTheme = 'system' }: ThemeProviderProps) {
        const [theme, setThemeState] = useState<Theme>(initialTheme);
        const [systemTheme, setSystemTheme] = useState<'light' | 'dark'>(getSystemTheme());

        const resolvedTheme = theme=== 'system' ? systemTheme : theme;

        const isDarkMode = resolvedTheme === 'dark';
         // Apply theme to document

        useEffect(() => {
        const root = document.documentElement;

        // Remove old theme
        root.removeAttribute('data-theme');
        root.classList.remove('light', 'dark');

        // Apply new theme
        root.setAttribute('data-theme', resolvedTheme);
        root.classList.add(resolvedTheme);

        // Persist to localStorage
        // localStorage.setItem(THEME_STORAGE_KEY, theme);
        }, [theme, resolvedTheme]);

        useEffect(()=>{
            const mediaQuery = window.matchMedia('(prefers-color-scheme:dark');
            const handgleChange=(e:MediaQueryListEvent)=>{
                 setSystemTheme(e.matches ? 'dark' : 'light');
            }
             mediaQuery.addEventListener('change',handgleChange);

            return ()=> mediaQuery.removeEventListener('change',handgleChange)
        },[]);
          const setTheme = (newTheme: Theme) => {
    setThemeState(newTheme);
  };
       const toggleTheme = () => {
    setThemeState((prevTheme) => (prevTheme === 'light')?'dark':'light');
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

