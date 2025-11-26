import React from 'react';
import { ActivityIndicator, Text, TouchableOpacity, View } from 'react-native';
import '../global.css';
import { useTheme } from '../lib/context/ThemeContext';
import { useTaskForm } from '../lib/hooks/useTaskForm';
import { FormInput } from './FormInput';

interface TaskFormProps {
  initialValues?: {
    title: string;
    description: string;
  };
  onSubmit: (task: { title: string; description: string }) => Promise<void>;
  submitButtonText?: string;
}

export const TaskForm: React.FC<TaskFormProps> = ({
  initialValues = { title: '', description: '' },
  onSubmit,
  submitButtonText = 'Guardar',
}) => {
  const { theme } = useTheme();
  const {
    title,
    description,
    titleError,
    descriptionError,
    isSubmitting,
    handleTitleChange,
    handleDescriptionChange,
    handleSubmit,
  } = useTaskForm({
    initialTitle: initialValues.title,
    initialDescription: initialValues.description,
  });

  return (
    <View className="p-4">
      <FormInput
        label="Título"
        value={title}
        onChangeText={handleTitleChange}
        error={titleError}
        placeholder="Ingresa el título de la tarea"
        editable={!isSubmitting}
      />

      <FormInput
        label="Descripción"
        value={description}
        onChangeText={handleDescriptionChange}
        error={descriptionError}
        placeholder="Ingresa la descripción"
        multiline
        numberOfLines={4}
        textAlignVertical="top"
        editable={!isSubmitting}
      />

      <TouchableOpacity
        style={{
          backgroundColor: isSubmitting ? theme.colors.primary + '80' : theme.colors.primary,
        }}
        className="rounded-lg p-4 items-center mt-2"
        onPress={() => handleSubmit(onSubmit)}
        disabled={isSubmitting}
      >
        {isSubmitting ? (
          <ActivityIndicator color="#FFFFFF" />
        ) : (
          <Text className="text-white text-lg font-semibold">{submitButtonText}</Text>
        )}
      </TouchableOpacity>
    </View>
  );
};
