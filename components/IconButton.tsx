import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { Text, TouchableOpacity, ViewStyle } from 'react-native';
import '../global.css';

interface IconButtonProps {
  onPress: () => void;
  iconName: keyof typeof Ionicons.glyphMap;
  iconSize?: number;
  iconColor?: string;
  text?: string;
  textColor?: string;
  backgroundColor?: string;
  className?: string;
  disabled?: boolean;
  style?: ViewStyle;
  textClassName?: string;
}

/**
 * Componente reutilizable de botón con ícono y texto opcional
 */
export const IconButton: React.FC<IconButtonProps> = ({
  onPress,
  iconName,
  iconSize = 16,
  iconColor = 'white',
  text,
  textColor = 'white',
  backgroundColor,
  className = 'px-4 py-2 rounded-lg flex-row items-center',
  disabled = false,
  style,
  textClassName = 'font-semibold',
}) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={[
        backgroundColor ? { backgroundColor } : undefined,
        style,
      ]}
      className={className}
      disabled={disabled}
    >
      <Ionicons 
        name={iconName} 
        size={iconSize} 
        color={iconColor} 
        style={text ? { marginRight: 6 } : undefined} 
      />
      {text && <Text style={{ color: textColor }} className={textClassName}>{text}</Text>}
    </TouchableOpacity>
  );
};
