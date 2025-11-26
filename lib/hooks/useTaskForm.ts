import { useState } from 'react';
import { taskSchema } from '../utils/zodSchemas';

interface UseTaskFormProps {
  initialTitle?: string;
  initialDescription?: string;
  onSuccess?: () => void;
}

export const useTaskForm = ({
  initialTitle = '',
  initialDescription = '',
  onSuccess,
}: UseTaskFormProps = {}) => {
  const [title, setTitle] = useState(initialTitle);
  const [description, setDescription] = useState(initialDescription);
  const [titleError, setTitleError] = useState('');
  const [descriptionError, setDescriptionError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleTitleChange = (text: string) => {
    setTitle(text);
    if (titleError) {
      setTitleError('');
    }
  };

  const handleDescriptionChange = (text: string) => {
    setDescription(text);
    if (descriptionError) {
      setDescriptionError('');
    }
  };

  const validate = (): { title: string; description: string } | null => {
    setTitleError('');
    setDescriptionError('');

    const result = taskSchema.safeParse({ title, description });

    if (!result.success) {
      result.error.issues.forEach((err) => {
        if (err.path[0] === 'title') {
          setTitleError(err.message);
        } else if (err.path[0] === 'description') {
          setDescriptionError(err.message);
        }
      });
      return null;
    }

    return result.data;
  };

  const handleSubmit = async (
    onSubmit: (data: { title: string; description: string }) => Promise<void>
  ) => {
    const validatedData = validate();
    if (!validatedData) return;

    try {
      setIsSubmitting(true);
      await onSubmit(validatedData);
      
      // Limpiar formulario después de enviar
      setTitle('');
      setDescription('');
      
      if (onSuccess) {
        onSuccess();
      }
    } catch (error) {
      console.error('Error al enviar formulario:', error);
      throw error;
    } finally {
      setIsSubmitting(false);
    }
  };

  const resetForm = (newTitle = '', newDescription = '') => {
    setTitle(newTitle);
    setDescription(newDescription);
    setTitleError('');
    setDescriptionError('');
  };

  return {
    title,
    description,
    titleError,
    descriptionError,
    isSubmitting,
    handleTitleChange,
    handleDescriptionChange,
    handleSubmit,
    resetForm,
  };
};
