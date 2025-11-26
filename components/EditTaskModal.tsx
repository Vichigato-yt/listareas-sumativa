import { Ionicons } from '@expo/vector-icons';
import React, { useState } from 'react';
import {
    ActivityIndicator,
    Modal,
    ScrollView,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';
import '../global.css';
import { useTheme } from '../lib/context/ThemeContext';
import { useTaskForm } from '../lib/hooks/useTaskForm';
import { CustomAlert } from './CustomAlert';
import { FormInput } from './FormInput';

interface EditTaskModalProps {
  visible: boolean;
  task: {
    id: number | string;
    title: string;
    description: string;
  };
  onClose: () => void;
  onUpdate: (id: number | string, data: { title: string; description: string }) => Promise<void>;
}

export const EditTaskModal: React.FC<EditTaskModalProps> = ({
  visible,
  task,
  onClose,
  onUpdate,
}) => {
  const { theme } = useTheme();
  const [showSuccessAlert, setShowSuccessAlert] = useState(false);
  const {
    title,
    description,
    titleError,
    descriptionError,
    isSubmitting,
    handleTitleChange,
    handleDescriptionChange,
    handleSubmit,
    resetForm,
  } = useTaskForm({
    initialTitle: task.title,
    initialDescription: task.description,
  });

  // Actualizar los valores cuando cambia la tarea
  React.useEffect(() => {
    resetForm(task.title, task.description);
  }, [task.title, task.description, visible]);

  const onSubmitHandler = async (data: { title: string; description: string }) => {
    await onUpdate(task.id, data);
    setShowSuccessAlert(true);
  };

  const handleSuccessConfirm = () => {
    setShowSuccessAlert(false);
    onClose();
  };

  return (
    <Modal
      visible={visible}
      animationType="slide"
      transparent={true}
      onRequestClose={onClose}
    >
      <View className="flex-1 justify-end" style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
        <View
          style={{ backgroundColor: theme.colors.background }}
          className="rounded-t-3xl"
        >
          {/* Header */}
          <View
            className="flex-row justify-between items-center p-4 border-b"
            style={{ borderBottomColor: theme.colors.border }}
          >
            <Text style={{ color: theme.colors.text }} className="text-xl font-bold">
              Editar Tarea
            </Text>
            <TouchableOpacity onPress={onClose} disabled={isSubmitting}>
              <Ionicons name="close" size={28} color={theme.colors.text} />
            </TouchableOpacity>
          </View>

          {/* Form */}
          <ScrollView className="p-4" style={{ maxHeight: 500 }}>
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

            {/* Botones */}
            <View className="flex-row gap-3">
              <TouchableOpacity
                style={{
                  backgroundColor: theme.colors.surface,
                  borderColor: theme.colors.border,
                }}
                className="flex-1 border-2 rounded-lg p-4 items-center"
                onPress={onClose}
                disabled={isSubmitting}
              >
                <Text style={{ color: theme.colors.text }} className="text-lg font-semibold">
                  Cancelar
                </Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={{
                  backgroundColor: isSubmitting
                    ? theme.colors.primary + '80'
                    : theme.colors.primary,
                }}
                className="flex-1 rounded-lg p-4 items-center"
                onPress={() => handleSubmit(onSubmitHandler)}
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <ActivityIndicator color="#FFFFFF" />
                ) : (
                  <Text className="text-white text-lg font-semibold">Actualizar</Text>
                )}
              </TouchableOpacity>
            </View>
          </ScrollView>
        </View>
      </View>

      {/* Alerta de éxito */}
      <CustomAlert
        visible={showSuccessAlert}
        title="¡Tarea actualizada!"
        message="Los cambios se han guardado correctamente."
        type="success"
        confirmText="Aceptar"
        showCancel={false}
        onConfirm={handleSuccessConfirm}
      />
    </Modal>
  );
};
