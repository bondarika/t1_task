import { type TaskCategory, type TaskPriority, type TaskStatus } from './types';

/** Доступные категории задач для выбора в формах */
export const categories: TaskCategory[] = ['Bug', 'Feature', 'Documentation', 'Refactor', 'Test'];

/** Доступные статусы задач для выбора в формах */
export const statuses: TaskStatus[] = ['To Do', 'In Progress', 'Done'];

/** Доступные приоритеты задач для выбора в формах */
export const priorities: TaskPriority[] = ['Low', 'Medium', 'High'];

/**
 * Цветовая схема для статусов задач
 * @description Используется для визуального отображения статусов в UI
 */
export const statusColors: Record<string, string> = {
  'To Do': '#bfbfbf', // Серый - ожидает выполнения
  'In Progress': '#d9d9d9', // Светло-серый - в работе
  Done: '#8c8c8c', // Темно-серый - завершено
};

/**
 * Цветовая схема для приоритетов задач
 * @description Используется для визуального отображения приоритетов в UI
 */
export const priorityColors: Record<string, string> = {
  Low: '#52c41a', // Зеленый - низкий приоритет
  Medium: '#faad14', // Оранжевый - средний приоритет
  High: '#ff4d4f', // Красный - высокий приоритет
};

/**
 * Конфигурация колонок для группировки по приоритету
 * @description Используется для отображения задач в колонках по приоритету
 * @note В текущей реализации не используется, но может быть полезно для будущих функций
 */
export const PRIORITY_COLUMNS = [
  { key: 'High', label: 'Высокий' },
  { key: 'Medium', label: 'Средний' },
  { key: 'Low', label: 'Низкий' },
];

/**
 * Конфигурация колонок для группировки по статусу
 * @description Используется в TaskList для отображения задач в колонках по статусу
 * и в drag-and-drop функциональности
 */
export const STATUS_COLUMNS = [
  { key: 'To Do', label: 'К выполнению' },
  { key: 'In Progress', label: 'В работе' },
  { key: 'Done', label: 'Готово' },
];
