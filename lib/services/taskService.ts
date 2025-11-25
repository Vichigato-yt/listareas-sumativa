import { Task } from '../types/task';

// URL pública del servidor json-server
// El servidor está corriendo en el puerto público 3000
const API_URL = 'https://sturdy-space-garbanzo-pj9gwr7x7vpxh944q-3000.app.github.dev/tasks';

export const taskService = {
  // Obtener todas las tareas
  async getAllTasks(): Promise<Task[]> {
    try {
      const response = await fetch(API_URL, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error al obtener tareas:', error);
      throw new Error('No se pudieron cargar las tareas. Asegúrate de que json-server esté corriendo.');
    }
  },

  // Obtener una tarea por ID
  async getTaskById(id: number): Promise<Task> {
    try {
      const response = await fetch(`${API_URL}/${id}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const data = await response.json();
      return data;
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
      
      const response = await fetch(API_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newTask),
      });
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error al crear tarea:', error);
      throw new Error('No se pudo crear la tarea');
    }
  },

  // Actualizar una tarea existente
  async updateTask(id: number, task: Partial<Task>): Promise<Task> {
    try {
      const response = await fetch(`${API_URL}/${id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(task),
      });
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error al actualizar tarea:', error);
      throw new Error('No se pudo actualizar la tarea');
    }
  },

  // Eliminar una tarea
  async deleteTask(id: number): Promise<void> {
    try {
      const response = await fetch(`${API_URL}/${id}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
    } catch (error) {
      console.error('Error al eliminar tarea:', error);
      throw new Error('No se pudo eliminar la tarea');
    }
  },
};
