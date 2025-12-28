
import React, { createContext, useContext, useState, useEffect } from 'react';

type Theme = 'light' | 'dark';
type Density = 'comfortable' | 'compact';

interface ThemeContextType {
  theme: Theme;
  toggleTheme: () => void;
  density: Density;
  toggleDensity: () => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [theme, setTheme] = useState<Theme>(() => {
    const saved = localStorage.getItem('theme');
    return (saved as Theme) || 'dark';
  });

  const [density, setDensity] = useState<Density>(() => {
    const saved = localStorage.getItem('density');
    return (saved as Density) || 'comfortable';
  });

  useEffect(() => {
    const root = window.document.documentElement;
    if (theme === 'dark') {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
    localStorage.setItem('theme', theme);
  }, [theme]);

  useEffect(() => {
    localStorage.setItem('density', density);
  }, [density]);

  const toggleTheme = () => {
    setTheme(prev => (prev === 'light' ? 'dark' : 'light'));
  };

  const toggleDensity = () => {
    setDensity(prev => (prev === 'comfortable' ? 'compact' : 'comfortable'));
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme, density, toggleDensity }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) throw new Error('useTheme must be used within ThemeProvider');
  return context;
};
