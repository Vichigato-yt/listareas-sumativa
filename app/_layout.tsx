import { Stack } from "expo-router";
import "../global.css";
import { TaskProvider } from "../lib/context/TaskContext";
import { ThemeProvider, useTheme } from "../lib/context/ThemeContext";

function StackNavigator() {
  const { theme } = useTheme();

  return (
    <Stack
      screenOptions={{
        headerStyle: { backgroundColor: theme.colors.primary },
        headerTintColor: '#fff',
        headerTitleStyle: { fontWeight: 'bold' },
      }}
    >
      <Stack.Screen 
        name="index" 
        options={{ 
          title: "Lista de Tareas",
        }} 
      />
      <Stack.Screen 
        name="add" 
        options={{ 
          title: "Nueva Tarea",
        }} 
      />
      <Stack.Screen 
        name="edit/[id]" 
        options={{ 
          title: "Editar Tarea",
        }} 
      />
      <Stack.Screen 
        name="settings" 
        options={{ 
          title: "Configuración",
        }} 
      />
    </Stack>
  );
}

export default function RootLayout() {
  return (
    <ThemeProvider>
      <TaskProvider>
        <StackNavigator />
      </TaskProvider>
    </ThemeProvider>
  );
}
