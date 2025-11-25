import React, { createContext, ReactNode, useContext, useState } from 'react';
import { Theme, ThemeContextType, themes, ThemeType } from '../types/theme';

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

interface ThemeProviderProps {
  children: ReactNode;
}

export const ThemeProvider: React.FC<ThemeProviderProps> = ({ children }) => {
  const [currentTheme, setCurrentTheme] = useState<ThemeType>('light');
  const [theme, setThemeData] = useState<Theme>(themes.light);

  const setTheme = (newTheme: ThemeType) => {
    setCurrentTheme(newTheme);
    setThemeData(themes[newTheme]);
  };

  const value: ThemeContextType = {
    currentTheme,
    theme,
    setTheme,
  };

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
};

export const useTheme = (): ThemeContextType => {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme debe ser usado dentro de un ThemeProvider');
  }
  return context;
};
