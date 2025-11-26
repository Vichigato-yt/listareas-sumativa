import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { Text, TextInput, TextInputProps, View } from 'react-native';
import '../global.css';
import { useTheme } from '../lib/context/ThemeContext';

interface FormInputProps extends TextInputProps {
  label: string;
  value: string;
  onChangeText: (text: string) => void;
  error?: string;
  placeholder: string;
}

export const FormInput: React.FC<FormInputProps> = ({
  label,
  value,
  onChangeText,
  error,
  placeholder,
  ...props
}) => {
  const { theme } = useTheme();

  return (
    <View className="mb-4">
      <Text style={{ color: theme.colors.text }} className="text-lg font-semibold mb-2">
        {label}
      </Text>
      <TextInput
        style={{
          borderColor: error ? theme.colors.error : theme.colors.border,
          backgroundColor: error ? theme.colors.error + '10' : theme.colors.surface,
          color: theme.colors.text,
        }}
        className="border-2 rounded-lg p-3 text-base"
        value={value}
        onChangeText={onChangeText}
        placeholder={placeholder}
        placeholderTextColor={theme.colors.textSecondary}
        {...props}
      />
      {error ? (
        <View className="flex-row items-center mt-1">
          <Ionicons
            name="alert-circle"
            size={16}
            color={theme.colors.error}
            style={{ marginRight: 4 }}
          />
          <Text style={{ color: theme.colors.error }} className="text-sm flex-1">
            {error}
          </Text>
        </View>
      ) : null}
    </View>
  );
};
