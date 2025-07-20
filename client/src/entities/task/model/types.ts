/**
 * Категории задач для классификации
 */
export type TaskCategory = 'Bug' | 'Feature' | 'Documentation' | 'Refactor' | 'Test';

/**
 * Статусы выполнения задачи
 */
export type TaskStatus = 'To Do' | 'In Progress' | 'Done';

/**
 * Уровни приоритета задачи
 */
export type TaskPriority = 'Low' | 'Medium' | 'High';

/**
 * Основная модель задачи в системе
 */
export interface Task {
  /** Уникальный идентификатор задачи */
  id: number;
  /** Заголовок задачи */
  title: string;
  /** Описание задачи (опционально) */
  description?: string;
  /** Категория задачи */
  category: TaskCategory;
  /** Статус выполнения */
  status: TaskStatus;
  /** Приоритет задачи */
  priority: TaskPriority;
  /** Дата создания */
  createdAt: Date;
}

/**
 * Данные для создания новой задачи
 */
export interface CreateTaskData {
  title: string;
  description?: string;
  category: TaskCategory;
  status: TaskStatus;
  priority: TaskPriority;
}

/**
 * Данные для обновления задачи
 */
export interface UpdateTaskData {
  title?: string;
  description?: string;
  category?: TaskCategory;
  status?: TaskStatus;
  priority?: TaskPriority;
}

/**
 * Пропсы для компонента формы задачи
 */
export interface TaskFormProps {
  /** Начальные значения для редактирования */
  initialValues?: CreateTaskData;
  /** Состояние загрузки */
  loading?: boolean;
  /** Callback при отправке формы */
  onSubmit: (values: CreateTaskData) => void;
  /** Callback при отмене */
  onCancel: () => void;
}

/**
 * Пропсы для компонента списка задач
 */
export interface TaskListProps {
  /** Массив задач */
  tasks: Task[];
  /** Состояние загрузки */
  loading?: boolean;
  /** Callback для удаления */
  onDelete: (id: number) => void;
  /** Callback для редактирования */
  onEdit: (id: number) => void;
  /** Включить drag-and-drop */
  dnd?: boolean;
}

/**
 * Пропсы для компонента карточки задачи
 */
export interface TaskItemProps {
  /** Объект задачи */
  task: Task;
  /** Callback для удаления */
  onDelete: (id: number) => void;
  /** Callback для редактирования */
  onEdit: (id: number) => void;
}
