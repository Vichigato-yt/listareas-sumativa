import { useLocalSearchParams, useRouter } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { ActivityIndicator, Alert, ScrollView, Text, View } from 'react-native';
import { TaskForm } from '../../components/TaskForm';
import '../../global.css';
import { useTasks } from '../../lib/context/TaskContext';
import { taskService } from '../../lib/services/taskService';
import { Task } from '../../lib/types/task';

export default function EditTask() {
  const router = useRouter();
  const { id } = useLocalSearchParams<{ id: string }>();
  const { updateTask } = useTasks();
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
      <View className="flex-1 justify-center items-center bg-gray-50">
        <ActivityIndicator size="large" color="#3B82F6" />
        <Text className="text-gray-600 mt-4">Cargando tarea...</Text>
      </View>
    );
  }

  if (!task) {
    return (
      <View className="flex-1 justify-center items-center bg-gray-50">
        <Text className="text-gray-600">No se encontró la tarea</Text>
      </View>
    );
  }

  return (
    <View className="flex-1 bg-gray-50">
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
