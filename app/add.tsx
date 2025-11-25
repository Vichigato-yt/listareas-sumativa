import { useRouter } from 'expo-router';
import React from 'react';
import { Alert, ScrollView, View } from 'react-native';
import { TaskForm } from '../components/TaskForm';
import '../global.css';
import { useTasks } from '../lib/context/TaskContext';
import { useTheme } from '../lib/context/ThemeContext';

export default function AddTask() {
  const router = useRouter();
  const { addTask } = useTasks();
  const { theme } = useTheme();

  const handleSubmit = async (task: { title: string; description: string }) => {
    try {
      await addTask(task);
      Alert.alert('Éxito', 'Tarea creada correctamente', [
        {
          text: 'OK',
          onPress: () => router.back(),
        },
      ]);
    } catch (error) {
      Alert.alert('Error', 'No se pudo crear la tarea');
    }
  };

  return (
    <View style={{ flex: 1, backgroundColor: theme.colors.background }}>
      <ScrollView>
        <TaskForm onSubmit={handleSubmit} submitButtonText="Crear Tarea" />
      </ScrollView>
    </View>
  );
}
