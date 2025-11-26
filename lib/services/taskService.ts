import axios from 'axios';
import { Task } from '../types/task';

// URL pública del servidor json-server
// El servidor está corriendo en el puerto público 3000
const API_URL = 'https://sturdy-space-garbanzo-pj9gwr7x7vpxh944q-3000.app.github.dev/tasks';

// Configurar axios
const axiosInstance = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
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
  async getTaskById(id: number): Promise<Task> {
    try {
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
  async updateTask(id: number, task: Partial<Task>): Promise<Task> {
    try {
      const response = await axiosInstance.patch<Task>(`/${id}`, task);
      return response.data;
    } catch (error) {
      console.error('Error al actualizar tarea:', error);
      throw new Error('No se pudo actualizar la tarea');
    }
  },

  // Eliminar una tarea
  async deleteTask(id: number): Promise<void> {
    try {
      await axiosInstance.delete(`/${id}`);
    } catch (error) {
      console.error('Error al eliminar tarea:', error);
      throw new Error('No se pudo eliminar la tarea');
    }
  },
};
