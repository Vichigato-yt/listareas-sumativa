import { Ionicons } from '@expo/vector-icons';
import React, { useRef, useState } from 'react';
import { Alert, Animated, PanResponder, Text, TouchableOpacity, View } from 'react-native';
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
  const translateX = useRef(new Animated.Value(0)).current;

  const panResponder = useRef(
    PanResponder.create({
      onMoveShouldSetPanResponder: (_, gestureState) => {
        return Math.abs(gestureState.dx) > 10;
      },
      onPanResponderMove: (_, gestureState) => {
        translateX.setValue(gestureState.dx);
      },
      onPanResponderRelease: (_, gestureState) => {
        const threshold = 100;
        
        if (gestureState.dx > threshold) {
          // Deslizar a la derecha - Editar
          Animated.spring(translateX, {
            toValue: 0,
            useNativeDriver: true,
          }).start();
          handleEdit();
        } else if (gestureState.dx < -threshold) {
          // Deslizar a la izquierda - Eliminar
          Animated.spring(translateX, {
            toValue: 0,
            useNativeDriver: true,
          }).start();
          handleDelete();
        } else {
          // Volver a la posición original
          Animated.spring(translateX, {
            toValue: 0,
            useNativeDriver: true,
          }).start();
        }
      },
    })
  ).current;

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

  const backgroundColor = translateX.interpolate({
    inputRange: [-100, 0, 100],
    outputRange: [theme.colors.error + '30', 'transparent', theme.colors.primary + '30'],
    extrapolate: 'clamp',
  });

  return (
    <View className="mb-4">
      {/* Fondo de acciones */}
      <View 
        style={{ 
          backgroundColor: theme.colors.surface,
          borderLeftWidth: 4,
          borderLeftColor: task.completed ? theme.colors.success : theme.colors.primary,
        }}
        className="rounded-2xl overflow-hidden"
      >
        <Animated.View
          style={{
            backgroundColor,
          }}
          className="absolute inset-0 flex-row"
        >
          {/* Indicador de editar (derecha) */}
          <View className="flex-1 items-start justify-center pl-6">
            <Ionicons name="pencil" size={32} color={theme.colors.primary} />
          </View>
          {/* Indicador de eliminar (izquierda) */}
          <View className="flex-1 items-end justify-center pr-6">
            <Ionicons name="trash" size={32} color={theme.colors.error} />
          </View>
        </Animated.View>

        {/* Contenido deslizable */}
        <Animated.View
          {...panResponder.panHandlers}
          style={{
            transform: [{ translateX }],
            backgroundColor: theme.colors.surface,
            elevation: 3,
            shadowColor: '#000',
            shadowOffset: { width: 0, height: 2 },
            shadowOpacity: 0.1,
            shadowRadius: 8,
          }}
          className="rounded-2xl p-5"
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
        </Animated.View>
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
