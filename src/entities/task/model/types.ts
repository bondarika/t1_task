/**
 * Тип категории задачи
 * @typedef {"Bug" | "Feature" | "Documentation" | "Refactor" | "Test"} TaskCategory
 */

/**
 * Тип статуса задачи
 * @typedef {"To Do" | "In Progress" | "Done"} TaskStatus
 */

/**
 * Тип приоритета задачи
 * @typedef {"Low" | "Medium" | "High"} TaskPriority
 */

/**
 * Интерфейс задачи
 * @interface Task
 * @property {string} id - Уникальный идентификатор задачи
 * @property {string} title - Заголовок задачи
 * @property {string} [description] - Описание задачи (опционально)
 * @property {TaskCategory} category - Категория задачи
 * @property {TaskStatus} status - Статус задачи
 * @property {TaskPriority} priority - Приоритет задачи
 * @property {string} createdAt - Дата создания задачи
 */

export type TaskCategory = 'Bug' | 'Feature' | 'Documentation' | 'Refactor' | 'Test';
export type TaskStatus = 'To Do' | 'In Progress' | 'Done';
export type TaskPriority = 'Low' | 'Medium' | 'High';

export interface Task {
  id: string;
  title: string;
  description?: string;
  category: TaskCategory;
  status: TaskStatus;
  priority: TaskPriority;
  createdAt: string;
}

/**
 * Пропсы для TaskForm
 */
export interface TaskFormProps {
  initialValues?: Omit<Task, 'id' | 'createdAt'>;
  loading?: boolean;
  onSubmit: (values: Omit<Task, 'id' | 'createdAt'>) => void;
  onCancel: () => void;
}

/**
 * Пропсы для TaskList
 */
export interface TaskListProps {
  tasks: Task[];
  loading?: boolean;
  onDelete: (id: string) => void;
  onEdit: (id: string) => void;
}

/**
 * Пропсы для TaskItem
 */
export interface TaskItemProps {
  task: Task;
  onDelete: (id: string) => void;
  onEdit: (id: string) => void;
}
