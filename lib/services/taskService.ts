import axios, { AxiosInstance } from 'axios';
import { Task } from '../types/task';

// URL pública del servidor json-server
// El servidor está corriendo en el puerto público 3000
const API_URL = 'https://verbose-space-spork-pvx664xr7xqh6rwv-3000.app.github.dev/tasks';

// Crear instancia de axios con configuración
const axiosInstance: AxiosInstance = axios.create({
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const taskService = {
  // Obtener todas las tareas
  async getAllTasks(): Promise<Task[]> {
    try {
      const response = await axiosInstance.get<Task[]>(API_URL);
      return response.data;
    } catch (error) {
      console.error('Error al obtener tareas:', error);
      throw new Error('No se pudieron cargar las tareas');
    }
  },

  // Obtener una tarea por ID
  async getTaskById(id: number): Promise<Task> {
    try {
      const response = await axiosInstance.get<Task>(`${API_URL}/${id}`);
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
      const response = await axiosInstance.post<Task>(API_URL, newTask);
      return response.data;
    } catch (error) {
      console.error('Error al crear tarea:', error);
      throw new Error('No se pudo crear la tarea');
    }
  },

  // Actualizar una tarea existente
  async updateTask(id: number, task: Partial<Task>): Promise<Task> {
    try {
      const response = await axiosInstance.put<Task>(`${API_URL}/${id}`, task);
      return response.data;
    } catch (error) {
      console.error('Error al actualizar tarea:', error);
      throw new Error('No se pudo actualizar la tarea');
    }
  },

  // Eliminar una tarea
  async deleteTask(id: number): Promise<void> {
    try {
      await axiosInstance.delete(`${API_URL}/${id}`);
    } catch (error) {
      console.error('Error al eliminar tarea:', error);
      throw new Error('No se pudo eliminar la tarea');
    }
  },
};
