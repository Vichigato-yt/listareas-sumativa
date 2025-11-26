import { useRouter } from 'expo-router';
import React from 'react';
import { FlatList, RefreshControl, View } from 'react-native';
import { EmptyState } from '../components/EmptyState';
import { ErrorBanner } from '../components/ErrorBanner';
import { IconButton } from '../components/IconButton';
import { LoadingState } from '../components/LoadingState';
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

  const handleDelete = async (id: number | string) => {
    try {
      await deleteTask(id);
    } catch (error) {
      console.error('Error al eliminar tarea:', error);
    }
  };

  const handleEdit = async (id: number | string, data: { title: string; description: string }) => {
    try {
      await updateTask(id, data);
    } catch (error) {
      console.error('Error al editar tarea:', error);
      throw error;
    }
  };

  const handleToggleComplete = async (id: number | string, completed: boolean) => {
    try {
      await updateTask(id, { completed });
    } catch (error) {
      console.error('Error al actualizar tarea:', error);
    }
  };

  if (loading && tasks.length === 0) {
    return <LoadingState message="Cargando tareas..." />;
  }

  return (
    <View style={{ flex: 1, backgroundColor: theme.colors.background }}>
      {/* Botón de configuración */}
      <View className="flex-row justify-end p-4 pb-2">
        <IconButton
          onPress={() => router.push('/settings')}
          iconName="settings-outline"
          iconSize={20}
          iconColor={theme.colors.text}
          text="Configuración"
          textColor={theme.colors.text}
          backgroundColor={theme.colors.surface}
          className="px-4 py-2 rounded-lg border flex-row items-center"
          style={{ borderColor: theme.colors.border }}
          textClassName="font-normal"
        />
      </View>

      {error && <ErrorBanner message={error} />}

      <FlatList
        data={tasks}
        keyExtractor={(item) => item.id?.toString() || Math.random().toString()}
        renderItem={({ item }) => (
          <TaskItem 
            task={item} 
            onDelete={handleDelete}
            onEdit={handleEdit}
            onToggleComplete={handleToggleComplete}
          />
        )}
        contentContainerStyle={{ padding: 16 }}
        ListEmptyComponent={
          <EmptyState title="No hay tareas" subtitle="Presiona el botón + para agregar una" />
        }
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} colors={[theme.colors.primary]} />
        }
      />

      {/* Botón flotante para agregar tarea */}
      <IconButton
        onPress={() => router.push('/add')}
        iconName="add"
        iconSize={36}
        backgroundColor={theme.colors.primary}
        className="absolute bottom-6 right-6 w-16 h-16 rounded-full items-center justify-center shadow-lg"
      />
    </View>
  );
}
