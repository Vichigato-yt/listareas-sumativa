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
          iconSize={22}
          iconColor={theme.colors.primary}
          text="Configuración"
          textColor={theme.colors.text}
          backgroundColor={theme.colors.surface}
          className="px-5 py-3 rounded-xl border-2 flex-row items-center shadow-md"
          style={{ borderColor: theme.colors.primary + '30', elevation: 4 }}
          textClassName="font-semibold"
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
        iconSize={40}
        iconColor="white"
        backgroundColor={theme.colors.primary}
        className="absolute bottom-8 right-8 w-20 h-20 rounded-full items-center justify-center"
        style={{ elevation: 12, shadowColor: theme.colors.primary, shadowOffset: { width: 0, height: 8 }, shadowOpacity: 0.4, shadowRadius: 12 }}
      />
    </View>
  );
}
