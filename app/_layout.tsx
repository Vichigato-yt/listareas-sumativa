import { Stack } from "expo-router";
import "../global.css";
import { TaskProvider } from "../lib/context/TaskContext";
import { ThemeProvider } from "../lib/context/ThemeContext";

export default function RootLayout() {
  return (
    <ThemeProvider>
      <TaskProvider>
        <Stack>
          <Stack.Screen 
            name="index" 
            options={{ 
              title: "Lista de Tareas",
              headerStyle: { backgroundColor: '#3B82F6' },
              headerTintColor: '#fff',
              headerTitleStyle: { fontWeight: 'bold' }
            }} 
          />
          <Stack.Screen 
            name="add" 
            options={{ 
              title: "Nueva Tarea",
              headerStyle: { backgroundColor: '#3B82F6' },
              headerTintColor: '#fff',
              headerTitleStyle: { fontWeight: 'bold' }
            }} 
          />
          <Stack.Screen 
            name="edit/[id]" 
            options={{ 
              title: "Editar Tarea",
              headerStyle: { backgroundColor: '#3B82F6' },
              headerTintColor: '#fff',
              headerTitleStyle: { fontWeight: 'bold' }
            }} 
          />
          <Stack.Screen 
            name="settings" 
            options={{ 
              title: "Configuración",
              headerStyle: { backgroundColor: '#3B82F6' },
              headerTintColor: '#fff',
              headerTitleStyle: { fontWeight: 'bold' }
            }} 
          />
        </Stack>
      </TaskProvider>
    </ThemeProvider>
  );
}
