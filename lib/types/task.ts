export interface Task {
  id?: number | string;
  title: string;
  description: string;
  completed?: boolean;
  createdAt?: string;
}

export interface TaskContextType {
  tasks: Task[];
  loading: boolean;
  error: string | null;
  fetchTasks: () => Promise<void>;
  addTask: (task: Omit<Task, 'id'>) => Promise<void>;
  updateTask: (id: number | string, task: Partial<Task>) => Promise<void>;
  deleteTask: (id: number | string) => Promise<void>;
}
