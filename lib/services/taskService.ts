import axios from 'axios';
import { Task } from '../types/task';

// Función para obtener la URL correcta del API
const getApiUrl = (): string => {
  // Para web (Expo Web)
  if (typeof window !== 'undefined') {
    const hostname = window.location.hostname;
    
    // Si estamos en GitHub Codespaces
    if (hostname.includes('.github.dev') || hostname.includes('.githubpreview.dev')) {
      // Reemplazar el puerto del hostname con el puerto 3000
      const parts = hostname.split('-');
      if (parts.length > 1) {
        parts[parts.length - 1] = '3000.app.github.dev';
        return `https://${parts.join('-')}/tasks`;
      }
    }
    
    // Desarrollo local
    return 'https://sturdy-space-garbanzo-pj9gwr7x7vpxh944q-3000.app.github.dev/tasks';
  }
  
  // Para React Native (mobile)
  return 'https://sturdy-space-garbanzo-pj9gwr7x7vpxh944q-3000.app.github.dev/tasks';
};

const API_URL = getApiUrl();

console.log('API URL configurada:', API_URL);

// Configurar axios
const axiosInstance = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 10000,
});

export const taskService = {
  // Obtener todas las tareas
  async getAllTasks(): Promise<Task[]> {
    try {
      const response = await axiosInstance.get<Task[]>('');
      return response.data;
    } catch (error) {
      console.error('Error al obtener tareas:', error);
      throw new Error('No se pudieron cargar las tareas. Asegúrate de que json-server esté corriendo.');
    }
  },

  // Obtener una tarea por ID
  async getTaskById(id: number | string): Promise<Task> {
    try {
      console.log('Obteniendo tarea con ID:', id);
      const response = await axiosInstance.get<Task>(`/${id}`);
      return response.data;
    } catch (error) {
      console.error('Error al obtener tarea:', error);
      throw new Error('No se pudo cargar la tarea');
    }
  },

  // Crear una nueva tarea
  async createTask(task: Omit<Task, 'id'>): Promise<Task> {
    try {
      const newTask = {
        ...task,
        completed: false,
        createdAt: new Date().toISOString(),
      };
      
      const response = await axiosInstance.post<Task>('', newTask);
      return response.data;
    } catch (error) {
      console.error('Error al crear tarea:', error);
      throw new Error('No se pudo crear la tarea');
    }
  },

  // Actualizar una tarea existente
  async updateTask(id: number | string, task: Partial<Task>): Promise<Task> {
    try {
      console.log('Actualizando tarea con ID:', id, 'Datos:', task);
      const response = await axiosInstance.patch<Task>(`/${id}`, task);
      console.log('Respuesta del servidor:', response.data);
      return response.data;
    } catch (error) {
      console.error('Error al actualizar tarea:', error);
      if (axios.isAxiosError(error)) {
        console.error('Detalles del error:', error.response?.status, error.response?.data);
      }
      throw new Error('No se pudo actualizar la tarea');
    }
  },

  // Eliminar una tarea
  async deleteTask(id: number | string): Promise<void> {
    try {
      console.log('Eliminando tarea con ID:', id);
      await axiosInstance.delete(`/${id}`);
    } catch (error) {
      console.error('Error al eliminar tarea:', error);
      throw new Error('No se pudo eliminar la tarea');
    }
  },
};
