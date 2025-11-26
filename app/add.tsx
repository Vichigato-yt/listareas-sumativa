import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import { ScrollView, View } from 'react-native';
import { CustomAlert } from '../components/CustomAlert';
import { TaskForm } from '../components/TaskForm';
import '../global.css';
import { useTasks } from '../lib/context/TaskContext';
import { useTheme } from '../lib/context/ThemeContext';

export default function AddTask() {
  const router = useRouter();
  const { addTask } = useTasks();
  const { theme } = useTheme();
  const [showSuccessAlert, setShowSuccessAlert] = useState(false);
  const [showErrorAlert, setShowErrorAlert] = useState(false);

  const handleSubmit = async (task: { title: string; description: string }) => {
    try {
      await addTask(task);
      setShowSuccessAlert(true);
    } catch (error) {
      setShowErrorAlert(true);
    }
  };

  const handleSuccessConfirm = () => {
    setShowSuccessAlert(false);
    router.back();
  };

  return (
    <View style={{ flex: 1, backgroundColor: theme.colors.background }}>
      <ScrollView>
        <TaskForm onSubmit={handleSubmit} submitButtonText="Crear Tarea" />
      </ScrollView>

      {/* Alerta de éxito */}
      <CustomAlert
        visible={showSuccessAlert}
        title="¡Tarea creada!"
        message="La tarea se ha creado correctamente y se ha agregado a tu lista."
        type="success"
        confirmText="Aceptar"
        showCancel={false}
        onConfirm={handleSuccessConfirm}
      />

      {/* Alerta de error */}
      <CustomAlert
        visible={showErrorAlert}
        title="Error"
        message="No se pudo crear la tarea. Por favor, inténtalo de nuevo."
        type="error"
        confirmText="Entendido"
        showCancel={false}
        onConfirm={() => setShowErrorAlert(false)}
      />
    </View>
  );
}
