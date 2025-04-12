
import { createContext, useContext, useEffect, useState } from 'react';
import { Sun, Moon } from 'lucide-react';

type Theme = 'light' | 'dark';

interface ThemeContextType {
  theme: Theme;
  toggleTheme: () => void;
  ThemeIcon: React.FC;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setTheme] = useState<Theme>(() => {
    // Check for saved theme preference in local storage
    const savedTheme = localStorage.getItem('theme') as Theme;
    // If not found, use system preference with fallback to light
    return savedTheme || 
      (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
  });

  useEffect(() => {
    // Save theme preference
    localStorage.setItem('theme', theme);
    
    // Apply theme to document
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prevTheme => prevTheme === 'light' ? 'dark' : 'light');
  };

  // Enhanced icon component
  const ThemeIcon = () => {
    return theme === 'dark' ? 
      <Sun className="h-5 w-5 text-saffron-400 transition-transform duration-300 animate-gentle-pulse" /> : 
      <Moon className="h-5 w-5 text-earth-700 transition-transform duration-300" />;
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme, ThemeIcon }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
}
