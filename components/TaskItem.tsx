import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React from 'react';
import { Alert, Text, TouchableOpacity, View } from 'react-native';
import '../global.css';
import { useTheme } from '../lib/context/ThemeContext';
import { Task } from '../lib/types/task';

interface TaskItemProps {
  task: Task;
  onDelete: (id: number) => void;
  onToggleComplete?: (id: number, completed: boolean) => void;
}

export const TaskItem: React.FC<TaskItemProps> = ({ task, onDelete, onToggleComplete }) => {
  const router = useRouter();
  const { theme } = useTheme();

  const handleDelete = () => {
    Alert.alert(
      'Eliminar tarea',
      '¿Estás seguro de que deseas eliminar esta tarea?',
      [
        {
          text: 'Cancelar',
          style: 'cancel',
        },
        {
          text: 'Eliminar',
          style: 'destructive',
          onPress: () => {
            if (task.id) {
              onDelete(task.id);
            }
          },
        },
      ]
    );
  };

  const handleEdit = () => {
    if (task.id) {
      router.push({
        pathname: '/edit/[id]',
        params: { id: task.id.toString() },
      });
    }
  };

  const handleToggleComplete = () => {
    if (task.id && onToggleComplete) {
      onToggleComplete(task.id, !task.completed);
    }
  };

  return (
    <View style={{ backgroundColor: theme.colors.surface, borderColor: theme.colors.border }} className="rounded-lg p-4 mb-3 shadow-sm border-2">
      <View className="flex-row justify-between items-start mb-2">
        <View className="flex-1 mr-2">
          <Text
            style={{ 
              color: task.completed ? theme.colors.textSecondary : theme.colors.text,
              textDecorationLine: task.completed ? 'line-through' : 'none'
            }}
            className="text-lg font-semibold"
          >
            {task.title}
          </Text>
          <Text
            style={{ color: task.completed ? theme.colors.textSecondary : theme.colors.textSecondary }}
            className="text-sm mt-1"
          >
            {task.description}
          </Text>
        </View>
        {task.completed !== undefined && (
          <TouchableOpacity
            onPress={handleToggleComplete}
            style={{
              backgroundColor: task.completed ? theme.colors.success : 'transparent',
              borderColor: task.completed ? theme.colors.success : theme.colors.border,
            }}
            className="w-6 h-6 rounded-full border-2 items-center justify-center"
          >
            {task.completed && <Ionicons name="checkmark" size={16} color="white" />}
          </TouchableOpacity>
        )}
      </View>

      <View className="flex-row justify-end space-x-2 mt-2">
        <TouchableOpacity
          onPress={handleEdit}
          style={{ backgroundColor: theme.colors.primary }}
          className="px-4 py-2 rounded-lg mr-2 flex-row items-center"
        >
          <Ionicons name="pencil" size={16} color="white" style={{ marginRight: 6 }} />
          <Text className="text-white font-semibold">Editar</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={handleDelete}
          style={{ backgroundColor: theme.colors.error }}
          className="px-4 py-2 rounded-lg flex-row items-center"
        >
          <Ionicons name="trash" size={16} color="white" style={{ marginRight: 6 }} />
          <Text className="text-white font-semibold">Eliminar</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};
