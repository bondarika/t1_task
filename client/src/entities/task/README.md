# Task Entity

## Описание

Entity для управления задачами в системе. Включает в себя модели данных, UI компоненты, API слой и бизнес-логику.

## Структура

```
task/
├── api/          # API слой для взаимодействия с сервером
├── model/        # Модели данных и бизнес-логика
├── ui/           # UI компоненты
└── README.md     # Документация
```

## Основные типы

### Task

Основная модель задачи в системе.

```typescript
interface Task {
  id: number; // Уникальный идентификатор
  title: string; // Заголовок задачи
  description?: string; // Описание (опционально)
  category: TaskCategory; // Категория
  status: TaskStatus; // Статус выполнения
  priority: TaskPriority; // Приоритет
  createdAt: Date; // Дата создания
}
```

### TaskCategory

Категории задач для классификации:

- `'Bug'` - Исправление ошибок
- `'Feature'` - Новая функциональность
- `'Documentation'` - Документация
- `'Refactor'` - Рефакторинг
- `'Test'` - Тестирование

### TaskStatus

Статусы выполнения задачи:

- `'To Do'` - К выполнению
- `'In Progress'` - В работе
- `'Done'` - Готово

### TaskPriority

Уровни приоритета:

- `'Low'` - Низкий
- `'Medium'` - Средний
- `'High'` - Высокий

## Компоненты

### TaskForm

Форма для создания и редактирования задач.

- Валидация полей
- Поддержка начальных значений
- Callback для отправки и отмены

### TaskList

Список задач с группировкой по статусам.

- Отображение в колонках
- Сортировка по приоритету
- Поддержка drag-and-drop

### TaskItem

Карточка отдельной задачи.

- Отображение всей информации
- Интерактивные кнопки
- Форматирование даты

## API

### Основные методы

- `apiGetTasks()` - Получение всех задач
- `apiGetTask(id)` - Получение задачи по ID
- `apiCreateTask(data)` - Создание новой задачи
- `apiUpdateTask(id, updates)` - Обновление задачи
- `apiDeleteTask(id)` - Удаление задачи

### Обработка ошибок

Используется кастомный класс `TaskApiError` с HTTP статусами.

## Store (MobX)

### TaskStore

Централизованное управление состоянием задач.

#### Основные методы

- `loadTasks()` - Загрузка всех задач
- `createTask(data)` - Создание задачи
- `updateTask(id, updates)` - Обновление с оптимистичными обновлениями
- `deleteTask(id)` - Удаление задачи

#### Computed свойства

- `taskById(id)` - Получение задачи по ID

## Использование

### Базовое использование

```tsx
import { TaskList } from '@/entities/task/ui/TaskList';
import { taskStore } from '@/entities/task/model/taskStore';

// В компоненте
const tasks = taskStore.tasks;
const loading = taskStore.loading;

<TaskList tasks={tasks} loading={loading} onEdit={handleEdit} onDelete={handleDelete} />;
```

### Создание новой задачи

```tsx
import { TaskForm } from '@/entities/task/ui/TaskForm';

<TaskForm
  onSubmit={async (data) => {
    await taskStore.createTask(data);
  }}
  onCancel={handleCancel}
/>;
```

## Константы

### Цветовые схемы

- `statusColors` - Цвета для статусов
- `priorityColors` - Цвета для приоритетов

### Конфигурации колонок

- `STATUS_COLUMNS` - Колонки по статусам
- `PRIORITY_COLUMNS` - Колонки по приоритетам

## Особенности реализации

### Оптимистичные обновления

В `updateTask` используется оптимистичное обновление: сначала обновляется локальное состояние, затем синхронизируется с сервером.

### Drag-and-Drop

Поддержка перетаскивания задач между колонками статусов с автоматическим обновлением на сервере.

### Валидация

Все формы включают валидацию на клиенте и сервере.

### Обработка ошибок

Централизованная обработка ошибок через `handleError` утилиту.
