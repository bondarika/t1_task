import { type Task, type CreateTaskData, type UpdateTaskData } from '../model/types.ts';

/** Базовый URL для API запросов */
const API_BASE_URL = 'https://t1-task.onrender.com'; // URL нового бэкенда

/**
 * Кастомный класс ошибки для API запросов
 * @description Расширяет стандартный Error для добавления HTTP статуса
 * @extends {Error}
 */
class TaskApiError extends Error {
  /** HTTP статус код ответа сервера */
  public status?: number;

  /**
   * Создает новый экземпляр TaskApiError
   * @param message - Сообщение об ошибке
   * @param status - HTTP статус код (опционально)
   */
  constructor(message: string, status?: number) {
    super(message);
    this.name = 'TaskApiError';
    this.status = status;
  }
}

/**
 * Обрабатывает HTTP ответ от сервера
 * @description Проверяет статус ответа и парсит JSON. При ошибке выбрасывает TaskApiError
 * @param response - Объект Response от fetch
 * @returns Парсированный JSON ответ
 * @throws {TaskApiError} При HTTP ошибках (4xx, 5xx)
 */
const handleResponse = async (response: Response) => {
  if (!response.ok) {
    const errorText = await response.text();
    throw new TaskApiError(`HTTP ${response.status}: ${errorText}`, response.status);
  }
  return response.json();
};

/**
 * Получает список всех задач с сервера
 * @description Выполняет GET запрос к /tasks и преобразует даты в объекты Date
 * @returns Promise с массивом задач
 * @throws {TaskApiError} При ошибках сети или сервера
 */
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

/**
 * Получает задачу по ID с сервера
 * @description Выполняет GET запрос к /tasks/{id} и преобразует дату в объект Date
 * @param id - Уникальный идентификатор задачи
 * @returns Promise с объектом задачи
 * @throws {TaskApiError} При ошибках сети, сервера или если задача не найдена
 */
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

/**
 * Создает новую задачу на сервере
 * @description Выполняет POST запрос к /tasks с данными новой задачи
 * @param task - Данные для создания задачи (без id)
 * @returns Promise с созданной задачей (включая id и createdAt)
 * @throws {TaskApiError} При ошибках валидации, сети или сервера
 */
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

/**
 * Обновляет существующую задачу на сервере
 * @description Выполняет PATCH запрос к /tasks/{id} с данными для обновления
 * @param id - ID задачи для обновления
 * @param updates - Данные для обновления (частичное обновление)
 * @returns Promise с обновленной задачей
 * @throws {TaskApiError} При ошибках валидации, сети, сервера или если задача не найдена
 */
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

/**
 * Удаляет задачу с сервера
 * @description Выполняет DELETE запрос к /tasks/{id}
 * @param id - ID задачи для удаления
 * @returns Promise с boolean результатом операции
 * @throws {TaskApiError} При ошибках сети, сервера или если задача не найдена
 */
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
