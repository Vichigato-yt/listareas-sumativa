import React from 'react';
import { Text, View } from 'react-native';
import '../global.css';
import { useTheme } from '../lib/context/ThemeContext';

interface EmptyStateProps {
  title: string;
  subtitle?: string;
}

export const EmptyState: React.FC<EmptyStateProps> = ({ title, subtitle }) => {
  const { theme } = useTheme();

  return (
    <View className="items-center justify-center py-20">
      <Text style={{ color: theme.colors.textSecondary }} className="text-lg">
        {title}
      </Text>
      {subtitle && (
        <Text style={{ color: theme.colors.textSecondary }} className="text-sm mt-2">
          {subtitle}
        </Text>
      )}
    </View>
  );
};
