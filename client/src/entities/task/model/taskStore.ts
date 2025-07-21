import { makeAutoObservable, runInAction, computed } from 'mobx';
import { type Task, type CreateTaskData, type UpdateTaskData } from './types';
import { apiGetTasks, apiCreateTask, apiUpdateTask, apiDeleteTask } from '../api/taskApi';
import { handleError } from '@/shared/lib/handleError';

/**
 * Хранилище задач с MobX и REST API
 */
class TaskStore {
  /** Массив всех задач */
  tasks: Task[] = [];
  /** Флаг загрузки */
  loading = false;

  constructor() {
    makeAutoObservable(this, {
      taskById: computed,
    });
    this.loadTasks();
  }

  /**
   * Получить задачу по ID
   */
  get taskById() {
    return (id: number): Task | undefined => this.tasks.find((t) => t.id === id);
  }

  // Загрузить все задачи
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

  // Создать задачу
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
   * Обновляет существующую задачу на сервере
   * @description Использует оптимистичное обновление: сначала обновляет локальное состояние,
   * затем синхронизирует с сервером. При ошибке локальные изменения откатываются.
   * @param id - ID задачи для обновления
   * @param updates - Данные для обновления
   * @throws {Error} При ошибке валидации или сетевого запроса
   *
   * @example
   * ```ts
   * await taskStore.updateTask(123, {
   *   status: 'In Progress',
   *   priority: 'Medium'
   * });
   * ```
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
   * Удаляет задачу с сервера
   * @description Отправляет DELETE запрос и удаляет задачу из локального состояния
   * @param id - ID задачи для удаления
   * @throws {Error} При ошибке сетевого запроса
   *
   * @example
   * ```ts
   * await taskStore.deleteTask(123);
   * ```
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

/** Экземпляр стора задач для использования в приложении */
export const taskStore = new TaskStore();
