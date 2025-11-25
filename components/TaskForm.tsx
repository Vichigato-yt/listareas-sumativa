import React, { useState } from 'react';
import { ActivityIndicator, Text, TextInput, TouchableOpacity, View } from 'react-native';
import '../global.css';
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
        <Text className="text-lg font-semibold mb-2 text-gray-700">Título</Text>
        <TextInput
          className={`border-2 rounded-lg p-3 text-base ${
            titleError ? 'border-red-500 bg-red-50' : 'border-gray-300 bg-white'
          }`}
          value={title}
          onChangeText={handleTitleChange}
          placeholder="Ingresa el título de la tarea"
          placeholderTextColor="#9CA3AF"
          editable={!isSubmitting}
        />
        {titleError ? (
          <Text className="text-red-500 text-sm mt-1">{titleError}</Text>
        ) : null}
      </View>

      {/* Campo de descripción */}
      <View className="mb-6">
        <Text className="text-lg font-semibold mb-2 text-gray-700">Descripción</Text>
        <TextInput
          className={`border-2 rounded-lg p-3 text-base ${
            descriptionError ? 'border-red-500 bg-red-50' : 'border-gray-300 bg-white'
          }`}
          value={description}
          onChangeText={handleDescriptionChange}
          placeholder="Ingresa la descripción"
          placeholderTextColor="#9CA3AF"
          multiline
          numberOfLines={4}
          textAlignVertical="top"
          editable={!isSubmitting}
        />
        {descriptionError ? (
          <Text className="text-red-500 text-sm mt-1">{descriptionError}</Text>
        ) : null}
      </View>

      {/* Botón de envío */}
      <TouchableOpacity
        className={`rounded-lg p-4 items-center ${
          isSubmitting ? 'bg-blue-300' : 'bg-blue-500'
        }`}
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
