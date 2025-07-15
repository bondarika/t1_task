import { type TaskCategory, type TaskPriority, type TaskStatus } from './types';

export const categories: TaskCategory[] = ['Bug', 'Feature', 'Documentation', 'Refactor', 'Test'];
export const statuses: TaskStatus[] = ['To Do', 'In Progress', 'Done'];
export const priorities: TaskPriority[] = ['Low', 'Medium', 'High'];
