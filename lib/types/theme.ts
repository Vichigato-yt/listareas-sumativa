export type ThemeType = 'light' | 'dark' | 'halloween' | 'christmas' | 'tf2';

export interface Theme {
  name: string;
  colors: {
    primary: string;
    secondary: string;
    background: string;
    surface: string;
    text: string;
    textSecondary: string;
    border: string;
    error: string;
    success: string;
    accent: string;
  };
}

export const themes: Record<ThemeType, Theme> = {
  light: {
    name: 'Claro',
    colors: {
      primary: '#3B82F6',
      secondary: '#60A5FA',
      background: '#F9FAFB',
      surface: '#FFFFFF',
      text: '#1F2937',
      textSecondary: '#6B7280',
      border: '#E5E7EB',
      error: '#EF4444',
      success: '#10B981',
      accent: '#8B5CF6',
    },
  },
  dark: {
    name: 'Oscuro',
    colors: {
      primary: '#60A5FA',
      secondary: '#3B82F6',
      background: '#111827',
      surface: '#1F2937',
      text: '#F9FAFB',
      textSecondary: '#D1D5DB',
      border: '#374151',
      error: '#F87171',
      success: '#34D399',
      accent: '#A78BFA',
    },
  },
  halloween: {
    name: 'Halloween',
    colors: {
      primary: '#F97316',
      secondary: '#FB923C',
      background: '#18181B',
      surface: '#27272A',
      text: '#FAFAFA',
      textSecondary: '#D4D4D8',
      border: '#3F3F46',
      error: '#DC2626',
      success: '#22C55E',
      accent: '#A855F7',
    },
  },
  christmas: {
    name: 'Navidad',
    colors: {
      primary: '#16A34A',
      secondary: '#22C55E',
      background: '#F0FDF4',
      surface: '#FFFFFF',
      text: '#14532D',
      textSecondary: '#166534',
      border: '#BBF7D0',
      error: '#DC2626',
      success: '#16A34A',
      accent: '#059669',
    },
  },
  tf2: {
    name: 'Team Fortress 2',
    colors: {
      primary: '#CF6A32',
      secondary: '#B85835',
      background: '#3C3226',
      surface: '#524538',
      text: '#EAD4AA',
      textSecondary: '#BFA377',
      border: '#8B6F47',
      error: '#A52019',
      success: '#729E42',
      accent: '#E3B448',
    },
  },
};

export interface ThemeContextType {
  currentTheme: ThemeType;
  theme: Theme;
  setTheme: (theme: ThemeType) => void;
}
