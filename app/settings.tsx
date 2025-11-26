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
                  backgroundColor: isSelected ? theme.colors.primary + '15' : theme.colors.surface,
                  borderColor: isSelected ? theme.colors.primary : theme.colors.border,
                  borderWidth: isSelected ? 3 : 2,
                  elevation: isSelected ? 6 : 2,
                  shadowColor: isSelected ? theme.colors.primary : '#000',
                  shadowOffset: { width: 0, height: isSelected ? 4 : 2 },
                  shadowOpacity: isSelected ? 0.3 : 0.1,
                  shadowRadius: isSelected ? 8 : 4,
                }}
                className="rounded-2xl p-5 mb-4 flex-row items-center"
              >
                <Ionicons name={option.icon} size={40} color={isSelected ? theme.colors.primary : theme.colors.text} style={{ marginRight: 20 }} />
                <View className="flex-1">
                  <Text
                    style={{ color: theme.colors.text }}
                    className="text-xl font-bold"
                  >
                    {themes[option.key].name}
                  </Text>
                  <Text
                    style={{ color: theme.colors.textSecondary }}
                    className="text-base mt-1"
                  >
                    {option.description}
                  </Text>
                </View>
                {isSelected && (
                  <View
                    style={{ backgroundColor: theme.colors.primary, elevation: 4 }}
                    className="w-10 h-10 rounded-full items-center justify-center"
                  >
                    <Ionicons name="checkmark" size={24} color="white" />
                  </View>
                )}
              </TouchableOpacity>
            );
          })}
        </View>

        <View
          style={{
            backgroundColor: theme.colors.surface,
            borderColor: theme.colors.primary + '30',
            borderWidth: 2,
            elevation: 3,
          }}
          className="rounded-2xl p-5"
        >
          <Text
            style={{ color: theme.colors.text }}
            className="text-lg font-bold mb-4"
          >
            🎨 Vista Previa de Colores
          </Text>
          <View className="flex-row flex-wrap gap-3">
            <View
              style={{ backgroundColor: theme.colors.primary, elevation: 3 }}
              className="w-16 h-16 rounded-2xl"
            />
            <View
              style={{ backgroundColor: theme.colors.secondary, elevation: 3 }}
              className="w-16 h-16 rounded-2xl"
            />
            <View
              style={{ backgroundColor: theme.colors.accent, elevation: 3 }}
              className="w-16 h-16 rounded-2xl"
            />
            <View
              style={{ backgroundColor: theme.colors.success, elevation: 3 }}
              className="w-16 h-16 rounded-2xl"
            />
            <View
              style={{ backgroundColor: theme.colors.error, elevation: 3 }}
              className="w-16 h-16 rounded-2xl"
            />
          </View>
        </View>
      </ScrollView>
    </View>
  );
}
