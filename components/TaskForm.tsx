import React, { useState } from 'react';
import { ActivityIndicator, Text, TextInput, TouchableOpacity, View } from 'react-native';
import '../global.css';
import { useTheme } from '../lib/context/ThemeContext';
import { validateField } from '../lib/utils/validation';

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
  const [title, setTitle] = useState(initialValues.title);
  const [description, setDescription] = useState(initialValues.description);
  const [titleError, setTitleError] = useState('');
  const [descriptionError, setDescriptionError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleTitleChange = (text: string) => {
    setTitle(text);
    // Limpiar error al escribir
    if (titleError) {
      setTitleError('');
    }
  };

  const handleDescriptionChange = (text: string) => {
    setDescription(text);
    // Limpiar error al escribir
    if (descriptionError) {
      setDescriptionError('');
    }
  };

  const handleSubmit = async () => {
    // Validar título
    const titleValidation = validateField(title, 'título');
    if (!titleValidation.isValid) {
      setTitleError(titleValidation.error);
      return;
    }

    // Validar descripción
    const descriptionValidation = validateField(description, 'descripción');
    if (!descriptionValidation.isValid) {
      setDescriptionError(descriptionValidation.error);
      return;
    }

    // Si ambos son válidos, enviar
    try {
      setIsSubmitting(true);
      await onSubmit({ title, description });
      // Limpiar formulario después de enviar
      setTitle('');
      setDescription('');
    } catch (error) {
      console.error('Error al enviar formulario:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <View className="p-4">
      {/* Campo de título */}
      <View className="mb-4">
        <Text style={{ color: theme.colors.text }} className="text-lg font-semibold mb-2">Título</Text>
        <TextInput
          style={{
            borderColor: titleError ? theme.colors.error : theme.colors.border,
            backgroundColor: titleError ? theme.colors.error + '10' : theme.colors.surface,
            color: theme.colors.text,
          }}
          className="border-2 rounded-lg p-3 text-base"
          value={title}
          onChangeText={handleTitleChange}
          placeholder="Ingresa el título de la tarea"
          placeholderTextColor={theme.colors.textSecondary}
          editable={!isSubmitting}
        />
        {titleError ? (
          <Text style={{ color: theme.colors.error }} className="text-sm mt-1">{titleError}</Text>
        ) : null}
      </View>

      {/* Campo de descripción */}
      <View className="mb-6">
        <Text style={{ color: theme.colors.text }} className="text-lg font-semibold mb-2">Descripción</Text>
        <TextInput
          style={{
            borderColor: descriptionError ? theme.colors.error : theme.colors.border,
            backgroundColor: descriptionError ? theme.colors.error + '10' : theme.colors.surface,
            color: theme.colors.text,
          }}
          className="border-2 rounded-lg p-3 text-base"
          value={description}
          onChangeText={handleDescriptionChange}
          placeholder="Ingresa la descripción"
          placeholderTextColor={theme.colors.textSecondary}
          multiline
          numberOfLines={4}
          textAlignVertical="top"
          editable={!isSubmitting}
        />
        {descriptionError ? (
          <Text style={{ color: theme.colors.error }} className="text-sm mt-1">{descriptionError}</Text>
        ) : null}
      </View>

      {/* Botón de envío */}
      <TouchableOpacity
        style={{
          backgroundColor: isSubmitting ? theme.colors.primary + '80' : theme.colors.primary,
        }}
        className="rounded-lg p-4 items-center"
        onPress={handleSubmit}
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
