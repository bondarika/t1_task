import { type TaskCategory, type TaskPriority, type TaskStatus } from './types';

export const categories: TaskCategory[] = ['Bug', 'Feature', 'Documentation', 'Refactor', 'Test'];
export const statuses: TaskStatus[] = ['To Do', 'In Progress', 'Done'];
export const priorities: TaskPriority[] = ['Low', 'Medium', 'High'];

export const statusColors: Record<string, string> = {
  'To Do': '#bfbfbf',
  'In Progress': '#d9d9d9',
  Done: '#8c8c8c',
};

export const priorityColors: Record<string, string> = {
  Low: '#52c41a', // зелёный
  Medium: '#faad14', // оранжевый
  High: '#ff4d4f', // красный
};

export const PRIORITY_COLUMNS = [
  { key: 'High', label: 'Высокий' },
  { key: 'Medium', label: 'Средний' },
  { key: 'Low', label: 'Низкий' },
];

export const STATUS_COLUMNS = [
  { key: 'To Do', label: 'К выполнению' },
  { key: 'In Progress', label: 'В работе' },
  { key: 'Done', label: 'Готово' },
];
