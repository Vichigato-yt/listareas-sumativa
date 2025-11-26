import React from 'react';
import { Text, View } from 'react-native';
import '../global.css';
import { useTheme } from '../lib/context/ThemeContext';

interface ErrorBannerProps {
  message: string;
}

export const ErrorBanner: React.FC<ErrorBannerProps> = ({ message }) => {
  const { theme } = useTheme();

  return (
    <View
      style={{
        backgroundColor: theme.colors.error + '20',
        borderColor: theme.colors.error,
      }}
      className="border p-4 m-4 rounded-lg"
    >
      <Text style={{ color: theme.colors.error }}>{message}</Text>
    </View>
  );
};
