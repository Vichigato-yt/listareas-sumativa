import React, { createContext, ReactNode, useContext, useEffect, useState } from 'react';
import { taskService } from '../services/taskService';
import { Task, TaskContextType } from '../types/task';

const TaskContext = createContext<TaskContextType | undefined>(undefined);

interface TaskProviderProps {
  children: ReactNode;
}

export const TaskProvider: React.FC<TaskProviderProps> = ({ children }) => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  // Cargar tareas al iniciar
  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await taskService.getAllTasks();
      setTasks(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error desconocido');
    } finally {
      setLoading(false);
    }
  };

  const addTask = async (task: Omit<Task, 'id'>) => {
    try {
      setLoading(true);
      setError(null);
      const newTask = await taskService.createTask(task);
      setTasks((prevTasks) => [...prevTasks, newTask]);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error al crear tarea');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const updateTask = async (id: number | string, task: Partial<Task>) => {
    try {
      setLoading(true);
      setError(null);
      const updatedTask = await taskService.updateTask(id, task);
      setTasks((prevTasks) =>
        prevTasks.map((t) => (t.id?.toString() === id.toString() ? updatedTask : t))
      );
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error al actualizar tarea');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const deleteTask = async (id: number | string) => {
    try {
      setLoading(true);
      setError(null);
      await taskService.deleteTask(id);
      setTasks((prevTasks) => prevTasks.filter((t) => t.id?.toString() !== id.toString()));
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error al eliminar tarea');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const value: TaskContextType = {
    tasks,
    loading,
    error,
    fetchTasks,
    addTask,
    updateTask,
    deleteTask,
  };

  return <TaskContext.Provider value={value}>{children}</TaskContext.Provider>;
};

// Hook personalizado para usar el contexto
export const useTasks = (): TaskContextType => {
  const context = useContext(TaskContext);
  if (context === undefined) {
    throw new Error('useTasks debe ser usado dentro de un TaskProvider');
  }
  return context;
};
