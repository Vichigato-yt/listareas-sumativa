import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { ScrollView, Text, TouchableOpacity, View } from 'react-native';
import '../global.css';
import { useTheme } from '../lib/context/ThemeContext';
import { themes, ThemeType } from '../lib/types/theme';

export default function Settings() {
  const { currentTheme, theme, setTheme } = useTheme();

  const themeOptions: { key: ThemeType; icon: keyof typeof Ionicons.glyphMap; description: string }[] = [
    { key: 'light', icon: 'sunny', description: 'Tema claro y brillante' },
    { key: 'dark', icon: 'moon', description: 'Tema oscuro para la noche' },
    { key: 'halloween', icon: 'skull', description: 'Tema terrorífico de Halloween' },
    { key: 'christmas', icon: 'gift', description: 'Tema festivo de Navidad' },
    { key: 'tf2', icon: 'game-controller', description: 'Estilo clásico de Team Fortress 2' },
  ];

  return (
    <View style={{ flex: 1, backgroundColor: theme.colors.background }}>
      <ScrollView className="flex-1 p-4">
        <View className="mb-6">
          <Text
            style={{ color: theme.colors.text }}
            className="text-2xl font-bold mb-2"
          >
            Configuración
          </Text>
          <Text style={{ color: theme.colors.textSecondary }} className="text-base">
            Personaliza la apariencia de tu aplicación
          </Text>
        </View>

        <View className="mb-4">
          <Text
            style={{ color: theme.colors.text }}
            className="text-lg font-semibold mb-3"
          >
            Seleccionar Tema
          </Text>

          {themeOptions.map((option) => {
            const isSelected = currentTheme === option.key;
            return (
              <TouchableOpacity
                key={option.key}
                onPress={() => setTheme(option.key)}
                style={{
                  backgroundColor: theme.colors.surface,
                  borderColor: isSelected ? theme.colors.primary : theme.colors.border,
                  borderWidth: 2,
                }}
                className="rounded-lg p-4 mb-3 flex-row items-center"
              >
                <Ionicons name={option.icon} size={32} color={theme.colors.text} style={{ marginRight: 16 }} />
                <View className="flex-1">
                  <Text
                    style={{ color: theme.colors.text }}
                    className="text-lg font-semibold"
                  >
                    {themes[option.key].name}
                  </Text>
                  <Text
                    style={{ color: theme.colors.textSecondary }}
                    className="text-sm mt-1"
                  >
                    {option.description}
                  </Text>
                </View>
                {isSelected && (
                  <View
                    style={{ backgroundColor: theme.colors.primary }}
                    className="w-6 h-6 rounded-full items-center justify-center"
                  >
                    <Ionicons name="checkmark" size={16} color="white" />
                  </View>
                )}
              </TouchableOpacity>
            );
          })}
        </View>

        <View
          style={{
            backgroundColor: theme.colors.surface,
            borderColor: theme.colors.border,
          }}
          className="rounded-lg p-4 border"
        >
          <Text
            style={{ color: theme.colors.text }}
            className="text-base font-semibold mb-2"
          >
            Vista Previa de Colores
          </Text>
          <View className="flex-row flex-wrap gap-2">
            <View
              style={{ backgroundColor: theme.colors.primary }}
              className="w-12 h-12 rounded-lg"
            />
            <View
              style={{ backgroundColor: theme.colors.secondary }}
              className="w-12 h-12 rounded-lg"
            />
            <View
              style={{ backgroundColor: theme.colors.accent }}
              className="w-12 h-12 rounded-lg"
            />
            <View
              style={{ backgroundColor: theme.colors.success }}
              className="w-12 h-12 rounded-lg"
            />
            <View
              style={{ backgroundColor: theme.colors.error }}
              className="w-12 h-12 rounded-lg"
            />
          </View>
        </View>
      </ScrollView>
    </View>
  );
}
