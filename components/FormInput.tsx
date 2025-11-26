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
    <View className="mb-5">
      <Text style={{ color: theme.colors.text }} className="text-xl font-bold mb-3">
        {label}
      </Text>
      <TextInput
        style={{
          borderColor: error ? theme.colors.error : theme.colors.primary + '50',
          backgroundColor: error ? theme.colors.error + '10' : theme.colors.surface,
          color: theme.colors.text,
          elevation: 2,
          shadowColor: error ? theme.colors.error : theme.colors.primary,
          shadowOffset: { width: 0, height: 2 },
          shadowOpacity: 0.1,
          shadowRadius: 4,
        }}
        className="border-2 rounded-2xl p-4 text-lg"
        value={value}
        onChangeText={onChangeText}
        placeholder={placeholder}
        placeholderTextColor={theme.colors.textSecondary}
        {...props}
      />
      {error ? (
        <View className="flex-row items-center mt-2">
          <Ionicons
            name="alert-circle"
            size={18}
            color={theme.colors.error}
            style={{ marginRight: 6 }}
          />
          <Text style={{ color: theme.colors.error }} className="text-base flex-1 font-semibold">
            {error}
          </Text>
        </View>
      ) : null}
    </View>
  );
};
