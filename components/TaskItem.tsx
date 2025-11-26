import { Ionicons } from '@expo/vector-icons';
import React, { useState } from 'react';
import { Alert, Text, TouchableOpacity, View } from 'react-native';
import '../global.css';
import { useTheme } from '../lib/context/ThemeContext';
import { Task } from '../lib/types/task';
import { EditTaskModal } from './EditTaskModal';
import { IconButton } from './IconButton';

interface TaskItemProps {
  task: Task;
  onDelete: (id: number | string) => void;
  onEdit: (id: number | string, data: { title: string; description: string }) => Promise<void>;
  onToggleComplete?: (id: number | string, completed: boolean) => void;
}

export const TaskItem: React.FC<TaskItemProps> = ({ task, onDelete, onEdit, onToggleComplete }) => {
  const { theme } = useTheme();
  const [isEditModalVisible, setIsEditModalVisible] = useState(false);

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
    setIsEditModalVisible(true);
  };

  const handleUpdateTask = async (id: number | string, data: { title: string; description: string }) => {
    await onEdit(id, data);
  };

  const handleToggleComplete = () => {
    if (task.id && onToggleComplete) {
      onToggleComplete(task.id, !task.completed);
    }
  };

  return (
    <View 
      style={{ 
        backgroundColor: theme.colors.surface, 
        borderLeftWidth: 4,
        borderLeftColor: task.completed ? theme.colors.success : theme.colors.primary,
        elevation: 3,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 8,
      }} 
      className="rounded-2xl p-5 mb-4"
    >
      <View className="flex-row justify-between items-start mb-3">
        <View className="flex-1 mr-3">
          <Text
            style={{ 
              color: task.completed ? theme.colors.textSecondary : theme.colors.text,
              textDecorationLine: task.completed ? 'line-through' : 'none'
            }}
            className="text-xl font-bold"
          >
            {task.title}
          </Text>
          <Text
            style={{ color: task.completed ? theme.colors.textSecondary : theme.colors.textSecondary }}
            className="text-base mt-2"
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
              elevation: task.completed ? 2 : 0,
            }}
            className="w-8 h-8 rounded-full border-2 items-center justify-center"
          >
            {task.completed && <Ionicons name="checkmark" size={18} color="white" />}
          </TouchableOpacity>
        )}
      </View>

      <View className="flex-row justify-end space-x-2 mt-3">
        <IconButton
          onPress={handleEdit}
          iconName="pencil"
          iconSize={18}
          text="Editar"
          backgroundColor={theme.colors.primary}
          className="px-5 py-3 rounded-xl mr-2 flex-row items-center"
          style={{ elevation: 2 }}
        />
        <IconButton
          onPress={handleDelete}
          iconName="trash"
          iconSize={18}
          text="Eliminar"
          backgroundColor={theme.colors.error}
          className="px-5 py-3 rounded-xl flex-row items-center"
          style={{ elevation: 2 }}
        />
      </View>

      {/* Modal de edición */}
      {task.id && (
        <EditTaskModal
          visible={isEditModalVisible}
          task={{
            id: task.id,
            title: task.title,
            description: task.description,
          }}
          onClose={() => setIsEditModalVisible(false)}
          onUpdate={handleUpdateTask}
        />
      )}
    </View>
  );
};
