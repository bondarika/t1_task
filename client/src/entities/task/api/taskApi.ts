import { type Task, type CreateTaskData, type UpdateTaskData } from '../model/types.ts';

const API_BASE_URL = 'http://localhost:8080'; // URL нового бэкенда

class TaskApiError extends Error {
  public status?: number;

  constructor(message: string, status?: number) {
    super(message);
    this.name = 'TaskApiError';
    this.status = status;
  }
}

const handleResponse = async (response: Response) => {
  if (!response.ok) {
    const errorText = await response.text();
    throw new TaskApiError(`HTTP ${response.status}: ${errorText}`, response.status);
  }
  return response.json();
};

export const apiGetTasks = async (): Promise<Task[]> => {
  try {
    const response = await fetch(`${API_BASE_URL}/tasks`);
    const data = await handleResponse(response);
    return data.responseObject.map((task: { createdAt: string; [key: string]: unknown }) => ({
      ...task,
      createdAt: new Date(task.createdAt),
    }));
  } catch (error) {
    console.error('Error fetching tasks:', error);
    throw error;
  }
};

export const apiGetTask = async (id: number): Promise<Task> => {
  try {
    const response = await fetch(`${API_BASE_URL}/tasks/${id}`);
    const data = await handleResponse(response);
    return {
      ...data.responseObject,
      createdAt: new Date(data.responseObject.createdAt),
    };
  } catch (error) {
    console.error(`Error fetching task ${id}:`, error);
    throw error;
  }
};

export const apiCreateTask = async (task: CreateTaskData): Promise<Task> => {
  try {
    const response = await fetch(`${API_BASE_URL}/tasks`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(task),
    });
    const data = await handleResponse(response);
    return {
      ...data.responseObject,
      createdAt: new Date(data.responseObject.createdAt),
    };
  } catch (error) {
    console.error('Error creating task:', error);
    throw error;
  }
};

export const apiUpdateTask = async (id: number, updates: UpdateTaskData): Promise<Task> => {
  try {
    const response = await fetch(`${API_BASE_URL}/tasks/${id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(updates),
    });
    const data = await handleResponse(response);
    return {
      ...data.responseObject,
      createdAt: new Date(data.responseObject.createdAt),
    };
  } catch (error) {
    console.error(`Error updating task ${id}:`, error);
    throw error;
  }
};

export const apiDeleteTask = async (id: number): Promise<boolean> => {
  try {
    const response = await fetch(`${API_BASE_URL}/tasks/${id}`, {
      method: 'DELETE',
    });
    const data = await handleResponse(response);
    return data.responseObject;
  } catch (error) {
    console.error(`Error deleting task ${id}:`, error);
    throw error;
  }
};
