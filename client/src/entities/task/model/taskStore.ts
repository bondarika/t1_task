import { makeAutoObservable, runInAction, computed } from 'mobx';
import { type Task, type CreateTaskData, type UpdateTaskData } from './types';
import { apiGetTasks, apiCreateTask, apiUpdateTask, apiDeleteTask } from '../api/taskApi';
import { handleError } from '@/shared/lib/handleError';

/**
 * MobX-стор для управления задачами через REST API
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
    return (id: number): Task | undefined => this.tasks.find((t) => t.id === id);
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
   * Создать задачу через REST API
   */
  createTask = async (task: CreateTaskData) => {
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
   * Обновить задачу через REST API
   */
  updateTask = async (id: number, updates: UpdateTaskData) => {
    // Оптимистичное обновление задачи локально
    const idx = this.tasks.findIndex((t) => t.id === id);
    if (idx !== -1) {
      this.tasks[idx] = { ...this.tasks[idx], ...updates };
    }
    try {
      const updatedTask = await apiUpdateTask(id, updates);
      runInAction(() => {
        if (idx !== -1) {
          this.tasks[idx] = updatedTask;
        }
      });
    } catch (error) {
      handleError(() => {}, error, 'обновления задачи');
    }
  };

  /**
   * Удалить задачу через REST API
   */
  deleteTask = async (id: number) => {
    try {
      await apiDeleteTask(id);
      runInAction(() => {
        this.tasks = this.tasks.filter((t) => t.id !== id);
      });
    } catch (error) {
      handleError(() => {}, error, 'удаления задачи');
    }
  };
}

export const taskStore = new TaskStore();
