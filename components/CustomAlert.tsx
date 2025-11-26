import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { Modal, Text, TouchableOpacity, View } from 'react-native';
import '../global.css';
import { useTheme } from '../lib/context/ThemeContext';

interface CustomAlertProps {
  visible: boolean;
  title: string;
  message: string;
  type?: 'success' | 'error' | 'warning' | 'info';
  onConfirm?: () => void;
  onCancel?: () => void;
  confirmText?: string;
  cancelText?: string;
  showCancel?: boolean;
}

const CustomAlert: React.FC<CustomAlertProps> = ({
  visible,
  title,
  message,
  type = 'info',
  onConfirm,
  onCancel,
  confirmText = 'Aceptar',
  cancelText = 'Cancelar',
  showCancel = true,
}) => {
  const { theme } = useTheme();

  const getIconAndColor = () => {
    switch (type) {
      case 'success':
        return { icon: 'checkmark-circle' as const, color: theme.colors.success };
      case 'error':
        return { icon: 'close-circle' as const, color: theme.colors.error };
      case 'warning':
        return { icon: 'warning' as const, color: '#F59E0B' };
      case 'info':
      default:
        return { icon: 'information-circle' as const, color: theme.colors.primary };
    }
  };

  const { icon, color } = getIconAndColor();

  return (
    <Modal
      visible={visible}
      transparent
      animationType="fade"
      onRequestClose={onCancel}
    >
      <View 
        className="flex-1 justify-center items-center px-6"
        style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}
      >
        <View
          style={{
            backgroundColor: theme.colors.surface,
            borderColor: color,
            elevation: 8,
            shadowColor: color,
            shadowOffset: { width: 0, height: 4 },
            shadowOpacity: 0.3,
            shadowRadius: 12,
          }}
          className="w-full max-w-sm rounded-3xl border-2 overflow-hidden"
        >
          {/* Header con ícono */}
          <View
            style={{ backgroundColor: color + '15' }}
            className="items-center py-6 px-6"
          >
            <View
              style={{ backgroundColor: color }}
              className="w-16 h-16 rounded-full items-center justify-center mb-3"
            >
              <Ionicons name={icon} size={40} color="white" />
            </View>
            <Text
              style={{ color: theme.colors.text }}
              className="text-2xl font-bold text-center"
            >
              {title}
            </Text>
          </View>

          {/* Mensaje */}
          <View className="px-6 py-6">
            <Text
              style={{ color: theme.colors.textSecondary }}
              className="text-base text-center leading-6"
            >
              {message}
            </Text>
          </View>

          {/* Botones */}
          <View
            style={{ borderTopColor: theme.colors.border }}
            className="flex-row border-t"
          >
            {showCancel && onCancel && (
              <TouchableOpacity
                onPress={onCancel}
                style={{
                  backgroundColor: theme.colors.surface,
                  borderRightColor: theme.colors.border,
                }}
                className="flex-1 py-4 items-center border-r"
              >
                <Text
                  style={{ color: theme.colors.textSecondary }}
                  className="text-base font-semibold"
                >
                  {cancelText}
                </Text>
              </TouchableOpacity>
            )}
            {onConfirm && (
              <TouchableOpacity
                onPress={onConfirm}
                style={{ backgroundColor: theme.colors.surface }}
                className="flex-1 py-4 items-center"
              >
                <Text
                  style={{ color }}
                  className="text-base font-bold"
                >
                  {confirmText}
                </Text>
              </TouchableOpacity>
            )}
          </View>
        </View>
      </View>
    </Modal>
  );
};

CustomAlert.displayName = 'CustomAlert';

export { CustomAlert };
