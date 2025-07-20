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
 * @property {number} id - Уникальный идентификатор задачи
 * @property {string} title - Заголовок задачи
 * @property {string} [description] - Описание задачи (опционально)
 * @property {TaskCategory} category - Категория задачи
 * @property {TaskStatus} status - Статус задачи
 * @property {TaskPriority} priority - Приоритет задачи
 * @property {Date} createdAt - Дата создания задачи
 */

export type TaskCategory = 'Bug' | 'Feature' | 'Documentation' | 'Refactor' | 'Test';
export type TaskStatus = 'To Do' | 'In Progress' | 'Done';
export type TaskPriority = 'Low' | 'Medium' | 'High';

export interface Task {
  id: number;
  title: string;
  description?: string;
  category: TaskCategory;
  status: TaskStatus;
  priority: TaskPriority;
  createdAt: Date;
}

/**
 * Интерфейс для создания задачи
 */
export interface CreateTaskData {
  title: string;
  description?: string;
  category: TaskCategory;
  status: TaskStatus;
  priority: TaskPriority;
}

/**
 * Интерфейс для обновления задачи
 */
export interface UpdateTaskData {
  title: string;
  description?: string;
  category: TaskCategory;
  status: TaskStatus;
  priority: TaskPriority;
}

/**
 * Пропсы для TaskForm
 */
export interface TaskFormProps {
  initialValues?: CreateTaskData;
  loading?: boolean;
  onSubmit: (values: CreateTaskData) => void;
  onCancel: () => void;
}

/**
 * Пропсы для TaskList
 */
export interface TaskListProps {
  tasks: Task[];
  loading?: boolean;
  onDelete: (id: number) => void;
  onEdit: (id: number) => void;
  dnd?: boolean;
}

/**
 * Пропсы для TaskItem
 */
export interface TaskItemProps {
  task: Task;
  onDelete: (id: number) => void;
  onEdit: (id: number) => void;
}
