import React, { useEffect } from 'react';
import { useThemeStore } from '../../store/themeStore';

export interface ThemeProviderProps {
  children: React.ReactNode;
}

export const ThemeProvider: React.FC<ThemeProviderProps> = ({ children }) => {
  const { theme, initializeTheme } = useThemeStore();
  
  // 立即应用主题，避免闪烁
  useEffect(() => {
    initializeTheme();
  }, []);
  
  // 监听主题变化
  useEffect(() => {
    const root = document.documentElement;
    const resolvedTheme = theme === 'system' 
      ? (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light')
      : theme;
    
    if (resolvedTheme === 'dark') {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
  }, [theme]);
  
  return <>{children}</>;
};
