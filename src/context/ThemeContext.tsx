// context/ThemeContext.tsx
"use client";
import { createContext, useContext, useState, useEffect, ReactNode } from 'react';

type ThemeContextType = {
  theme: string;
  setTheme: (theme: string) => void;
};

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const ThemeProvider = ({ children }: { children: ReactNode }) => {
  const [theme, setTheme] = useState('light');

  useEffect(() => {
    // Check for the theme in cookies
    const themeFromCookie = document.cookie
      .split('; ')
      .find(row => row.startsWith('theme='))
      ?.split('=')[1];

    if (themeFromCookie) {
      // Use the cookie theme if available
      setTheme(themeFromCookie);
    } else {
      // Otherwise, check system preference
      const isDarkMode = window.matchMedia("(prefers-color-scheme: dark)").matches;
      setTheme(isDarkMode ? "dark" : "light");
    }
  }, []);

  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
};
