import React, { createContext, useState, useContext } from 'react';

const ThemeContext = createContext();

export const useTheme = () => useContext(ThemeContext);

export const ThemeProvider = ({ children }) => {
  const [isDark, setIsDark] = useState(false);

  const lightTheme = {
    background: '#ffffff',
    cardBackground: '#f8f9fa',
    text: '#000000',
    secondaryText: '#666666',
    accent: '#ff0000',
    border: '#e0e0e0',
    shadow: '#00000010'
  };

  const darkTheme = {
    background: '#0f0f0f',
    cardBackground: '#1f1f1f',
    text: '#ffffff',
    secondaryText: '#aaaaaa',
    accent: '#ff0000',
    border: '#333333',
    shadow: '#ffffff10'
  };

  const theme = isDark ? darkTheme : lightTheme;

  const toggleTheme = () => setIsDark(!isDark);

  return (
    <ThemeContext.Provider value={{ theme, isDark, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};
