import { Text, Button as RNButton } from 'react-native';

import type { InternalKeplerTheme } from '@AppTheme/types';

export const Button = ({ label, ...props }) => {
  return <RNButton {...props} title={label} />;
};

export * from 'react-native';
import { create } from 'zustand';

const _useTheme = create<{
  currentTheme: InternalKeplerTheme | null;
  setTheme: (theme: InternalKeplerTheme) => void;
}>(set => ({
  currentTheme: null,
  setTheme: theme => set({ currentTheme: theme }),
}));

export const Typography = Text;

export const createThemeFromPartialTheme = (partialTheme: any) => {
  return partialTheme;
};

export const useSetTheme = () => {
  const { setTheme } = _useTheme();

  return (theme: InternalKeplerTheme) => {
    setTheme(theme);
  };
};

export const useTheme = () => {
  const { currentTheme, setTheme } = _useTheme();
  if (!currentTheme) {
    const defaultTheme = require('@AppTheme').darkTheme;
    setTheme(defaultTheme);
    return defaultTheme;
  }
  return currentTheme;
};

export const PushNotificationIOS = {}; // iOS-specific module placeholder
