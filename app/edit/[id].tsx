import { useLocalSearchParams, useRouter } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { ActivityIndicator, Alert, ScrollView, Text, View } from 'react-native';
import { TaskForm } from '../../components/TaskForm';
import '../../global.css';
import { useTasks } from '../../lib/context/TaskContext';
import { useTheme } from '../../lib/context/ThemeContext';
import { taskService } from '../../lib/services/taskService';
import { Task } from '../../lib/types/task';

export default function EditTask() {
  const router = useRouter();
  const { id } = useLocalSearchParams<{ id: string }>();
  const { updateTask } = useTasks();
  const { theme } = useTheme();
  const [task, setTask] = useState<Task | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadTask();
  }, [id]);

  const loadTask = async () => {
    if (!id) return;
    
    try {
      setLoading(true);
      const taskData = await taskService.getTaskById(parseInt(id));
      setTask(taskData);
    } catch (error) {
      Alert.alert('Error', 'No se pudo cargar la tarea');
      router.back();
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (updatedTask: { title: string; description: string }) => {
    if (!id) return;

    try {
      await updateTask(parseInt(id), updatedTask);
      Alert.alert('Éxito', 'Tarea actualizada correctamente', [
        {
          text: 'OK',
          onPress: () => router.back(),
        },
      ]);
    } catch (error) {
      Alert.alert('Error', 'No se pudo actualizar la tarea');
    }
  };

  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: theme.colors.background }}>
        <ActivityIndicator size="large" color={theme.colors.primary} />
        <Text style={{ color: theme.colors.textSecondary, marginTop: 16 }}>Cargando tarea...</Text>
      </View>
    );
  }

  if (!task) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: theme.colors.background }}>
        <Text style={{ color: theme.colors.textSecondary }}>No se encontró la tarea</Text>
      </View>
    );
  }

  return (
    <View style={{ flex: 1, backgroundColor: theme.colors.background }}>
      <ScrollView>
        <TaskForm
          initialValues={{
            title: task.title,
            description: task.description,
          }}
          onSubmit={handleSubmit}
          submitButtonText="Actualizar Tarea"
        />
      </ScrollView>
    </View>
  );
}
