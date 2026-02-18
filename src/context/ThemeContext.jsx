import React, { createContext, useContext, useState, useEffect } from 'react';

const ThemeContext = createContext();

export const useTheme = () => useContext(ThemeContext);

export const ThemeProvider = ({ children }) => {
  const [isDark, setIsDark] = useState(true); // Default to Dark based on Figma preferences

  useEffect(() => {
    // Check localStorage or system preference, default to dark for this app
    const storedTheme = localStorage.getItem('rentfinder_theme');
    if (storedTheme) {
      setIsDark(storedTheme === 'dark');
    } else {
      setIsDark(true); // Enforce dark default
    }
  }, []);

  useEffect(() => {
    const root = window.document.documentElement;
    if (isDark) {
      root.classList.add('dark');
      localStorage.setItem('rentfinder_theme', 'dark');
    } else {
      root.classList.remove('dark');
      localStorage.setItem('rentfinder_theme', 'light');
    }
  }, [isDark]);

  const toggleTheme = () => {
    setIsDark(prev => !prev);
  };

  return (
    <ThemeContext.Provider value={{ isDark, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};
