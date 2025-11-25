import { useRouter } from 'expo-router';
import React from 'react';
import { Alert, Text, TouchableOpacity, View } from 'react-native';
import '../global.css';
import { Task } from '../lib/types/task';

interface TaskItemProps {
  task: Task;
  onDelete: (id: number) => void;
  onToggleComplete?: (id: number, completed: boolean) => void;
}

export const TaskItem: React.FC<TaskItemProps> = ({ task, onDelete, onToggleComplete }) => {
  const router = useRouter();

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
    <View className="bg-white rounded-lg p-4 mb-3 shadow-sm border border-gray-200">
      <View className="flex-row justify-between items-start mb-2">
        <View className="flex-1 mr-2">
          <Text
            className={`text-lg font-semibold ${
              task.completed ? 'text-gray-400 line-through' : 'text-gray-800'
            }`}
          >
            {task.title}
          </Text>
          <Text
            className={`text-sm mt-1 ${
              task.completed ? 'text-gray-400' : 'text-gray-600'
            }`}
          >
            {task.description}
          </Text>
        </View>
        {task.completed !== undefined && (
          <TouchableOpacity
            onPress={handleToggleComplete}
            className={`w-6 h-6 rounded-full border-2 items-center justify-center ${
              task.completed ? 'bg-green-500 border-green-500' : 'border-gray-300'
            }`}
          >
            {task.completed && <Text className="text-white text-xs">✓</Text>}
          </TouchableOpacity>
        )}
      </View>

      <View className="flex-row justify-end space-x-2 mt-2">
        <TouchableOpacity
          onPress={handleEdit}
          className="bg-blue-500 px-4 py-2 rounded-lg mr-2"
        >
          <Text className="text-white font-semibold">Editar</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={handleDelete}
          className="bg-red-500 px-4 py-2 rounded-lg"
        >
          <Text className="text-white font-semibold">Eliminar</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};
