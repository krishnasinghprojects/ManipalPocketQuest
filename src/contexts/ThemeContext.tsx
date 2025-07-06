import React, { createContext, useContext, useState, useEffect } from 'react';

type Theme = 'light' | 'dark' | 'colorblind';

interface ThemeContextType {
  theme: Theme;
  toggleTheme: () => void;
  setColorblindMode: () => void;
  isColorblindMode: boolean;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [theme, setTheme] = useState<Theme>(() => {
    const savedTheme = localStorage.getItem('theme') as Theme;
    return savedTheme || 'light';
  });

  useEffect(() => {
    localStorage.setItem('theme', theme);
    document.documentElement.setAttribute('data-theme', theme);
    
    // Add colorblind class to body for additional styling
    if (theme === 'colorblind') {
      document.body.classList.add('colorblind-theme');
    } else {
      document.body.classList.remove('colorblind-theme');
    }
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prev => {
      if (prev === 'light') return 'dark';
      if (prev === 'dark') return 'light';
      return 'light'; // Fallback
    });
  };

  const setColorblindMode = () => {
    setTheme('colorblind');
  };

  const isColorblindMode = theme === 'colorblind';

  return (
    <ThemeContext.Provider value={{ 
      theme, 
      toggleTheme, 
      setColorblindMode, 
      isColorblindMode 
    }}>
      {children}
    </ThemeContext.Provider>
  );
};
