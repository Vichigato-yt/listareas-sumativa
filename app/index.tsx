import { useRouter } from 'expo-router';
import React from 'react';
import { ActivityIndicator, FlatList, RefreshControl, Text, TouchableOpacity, View } from 'react-native';
import { TaskItem } from '../components/TaskItem';
import '../global.css';
import { useTasks } from '../lib/context/TaskContext';

export default function Index() {
  const router = useRouter();
  const { tasks, loading, error, fetchTasks, deleteTask, updateTask } = useTasks();
  const [refreshing, setRefreshing] = React.useState(false);

  const onRefresh = React.useCallback(async () => {
    setRefreshing(true);
    await fetchTasks();
    setRefreshing(false);
  }, []);

  const handleDelete = async (id: number) => {
    try {
      await deleteTask(id);
    } catch (error) {
      console.error('Error al eliminar tarea:', error);
    }
  };

  const handleToggleComplete = async (id: number, completed: boolean) => {
    try {
      await updateTask(id, { completed });
    } catch (error) {
      console.error('Error al actualizar tarea:', error);
    }
  };

  if (loading && tasks.length === 0) {
    return (
      <View className="flex-1 justify-center items-center bg-gray-50">
        <ActivityIndicator size="large" color="#3B82F6" />
        <Text className="text-gray-600 mt-4">Cargando tareas...</Text>
      </View>
    );
  }

  return (
    <View className="flex-1 bg-gray-50">
      {error && (
        <View className="bg-red-100 border border-red-400 p-4 m-4 rounded-lg">
          <Text className="text-red-700">{error}</Text>
        </View>
      )}

      <FlatList
        data={tasks}
        keyExtractor={(item) => item.id?.toString() || Math.random().toString()}
        renderItem={({ item }) => (
          <TaskItem 
            task={item} 
            onDelete={handleDelete}
            onToggleComplete={handleToggleComplete}
          />
        )}
        contentContainerStyle={{ padding: 16 }}
        ListEmptyComponent={
          <View className="items-center justify-center py-20">
            <Text className="text-gray-500 text-lg">No hay tareas</Text>
            <Text className="text-gray-400 text-sm mt-2">
              Presiona el botón + para agregar una
            </Text>
          </View>
        }
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      />

      {/* Botón flotante para agregar tarea */}
      <TouchableOpacity
        className="absolute bottom-6 right-6 bg-blue-500 w-16 h-16 rounded-full items-center justify-center shadow-lg"
        onPress={() => router.push('/add')}
      >
        <Text className="text-white text-3xl">+</Text>
      </TouchableOpacity>
    </View>
  );
}
