import { makeAutoObservable, runInAction, computed } from 'mobx';
import { type Task } from './types';
import { apiGetTasks, apiCreateTask, apiUpdateTask, apiDeleteTask } from '../api/taskApi';
import { handleError } from '@/shared/lib/handleError';

/**
 * MobX-стор для управления задачами через GraphQL API
 */
class TaskStore {
  tasks: Task[] = [];
  loading = false;

  constructor() {
    makeAutoObservable(this, {
      taskById: computed,
    });
    this.loadTasks();
  }

  /**
   * Получить задачу по id
   */
  get taskById() {
    return (id: string): Task | undefined => this.tasks.find((t) => t.id === id);
  }

  /**
   * Загрузка задач с сервера
   */
  loadTasks = async () => {
    this.loading = true;
    try {
      const tasks = await apiGetTasks();
      runInAction(() => {
        this.tasks = tasks;
        this.loading = false;
      });
    } catch (error) {
      handleError((v) => (this.loading = v), error, 'загрузки задач');
    }
  };

  /**
   * Создать задачу через GraphQL
   */
  createTask = async (task: Omit<Task, 'id' | 'createdAt'>) => {
    this.loading = true;
    try {
      const newTask = await apiCreateTask(task);
      runInAction(() => {
        if (newTask) {
          this.tasks.push(newTask);
        }
        this.loading = false;
      });
    } catch (error) {
      handleError((v) => (this.loading = v), error, 'создания задачи');
    }
  };

  /**
   * Обновить задачу через GraphQL
   */
  updateTask = async (id: string, updates: Partial<Omit<Task, 'id' | 'createdAt'>>) => {
    this.loading = true;
    try {
      const updatedTask = await apiUpdateTask(id, updates);
      runInAction(() => {
        const idx = this.tasks.findIndex((t) => t.id === id);
        if (idx !== -1) {
          this.tasks[idx] = updatedTask;
        }
        this.loading = false;
      });
    } catch (error) {
      handleError((v) => (this.loading = v), error, 'обновления задачи');
    }
  };

  /**
   * Удалить задачу через GraphQL
   */
  deleteTask = async (id: string) => {
    this.loading = true;
    try {
      await apiDeleteTask(id);
      runInAction(() => {
        this.tasks = this.tasks.filter((t) => t.id !== id);
        this.loading = false;
      });
    } catch (error) {
      handleError((v) => (this.loading = v), error, 'удаления задачи');
    }
  };
}

export const taskStore = new TaskStore();
