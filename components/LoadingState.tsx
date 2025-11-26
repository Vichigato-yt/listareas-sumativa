import React from 'react';
import { ActivityIndicator, Text, View } from 'react-native';
import '../global.css';
import { useTheme } from '../lib/context/ThemeContext';

interface LoadingStateProps {
  message?: string;
}

export const LoadingState: React.FC<LoadingStateProps> = ({ message = 'Cargando...' }) => {
  const { theme } = useTheme();

  return (
    <View
      style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: theme.colors.background,
      }}
    >
      <ActivityIndicator size="large" color={theme.colors.primary} />
      <Text style={{ color: theme.colors.textSecondary, marginTop: 16 }}>{message}</Text>
    </View>
  );
};
