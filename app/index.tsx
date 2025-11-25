import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React from 'react';
import { ActivityIndicator, FlatList, RefreshControl, Text, TouchableOpacity, View } from 'react-native';
import { TaskItem } from '../components/TaskItem';
import '../global.css';
import { useTasks } from '../lib/context/TaskContext';
import { useTheme } from '../lib/context/ThemeContext';

export default function Index() {
  const router = useRouter();
  const { tasks, loading, error, fetchTasks, deleteTask, updateTask } = useTasks();
  const { theme } = useTheme();
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
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: theme.colors.background }}>
        <ActivityIndicator size="large" color={theme.colors.primary} />
        <Text style={{ color: theme.colors.textSecondary, marginTop: 16 }}>Cargando tareas...</Text>
      </View>
    );
  }

  return (
    <View style={{ flex: 1, backgroundColor: theme.colors.background }}>
      {/* Botón de configuración */}
      <View className="flex-row justify-end p-4 pb-2">
        <TouchableOpacity
          onPress={() => router.push('/settings')}
          style={{ backgroundColor: theme.colors.surface, borderColor: theme.colors.border }}
          className="px-4 py-2 rounded-lg border flex-row items-center"
        >
          <Ionicons name="settings-outline" size={20} color={theme.colors.text} style={{ marginRight: 8 }} />
          <Text style={{ color: theme.colors.text }}>Configuración</Text>
        </TouchableOpacity>
      </View>

      {error && (
        <View style={{ backgroundColor: theme.colors.error + '20', borderColor: theme.colors.error }} className="border p-4 m-4 rounded-lg">
          <Text style={{ color: theme.colors.error }}>{error}</Text>
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
            <Text style={{ color: theme.colors.textSecondary }} className="text-lg">No hay tareas</Text>
            <Text style={{ color: theme.colors.textSecondary }} className="text-sm mt-2">
              Presiona el botón + para agregar una
            </Text>
          </View>
        }
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} colors={[theme.colors.primary]} />
        }
      />

      {/* Botón flotante para agregar tarea */}
      <TouchableOpacity
        style={{ backgroundColor: theme.colors.primary }}
        className="absolute bottom-6 right-6 w-16 h-16 rounded-full items-center justify-center shadow-lg"
        onPress={() => router.push('/add')}
      >
        <Ionicons name="add" size={36} color="white" />
      </TouchableOpacity>
    </View>
  );
}
