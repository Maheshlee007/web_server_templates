export type Theme = 'light' | 'dark' | 'system';

export interface ThemeContextType{
    theme:Theme;
    resolvedTheme:'light' | 'dark';
    setTheme:(theme:Theme)=>void;
    toggleTheme:()=>void;
    isDarkMode: boolean;
}