# Task Drag-and-Drop Feature

## Описание

Feature для перетаскивания задач между колонками статусов с автоматическим обновлением на сервере.

## Структура

```
task-dnd/
├── index.tsx    # Основной компонент TaskDndBoard
├── types.ts     # Типы для drag-and-drop
└── README.md    # Документация
```

## Основной компонент

### TaskDndBoard

Компонент-обертка для TaskList с поддержкой drag-and-drop функциональности.

#### Пропсы

```typescript
interface TaskDndBoardProps {
  onEdit: (id: number) => void; // Callback для редактирования
  onDelete: (id: number) => void; // Callback для удаления
}
```

#### Особенности

- Использует `@hello-pangea/dnd` для drag-and-drop
- Автоматически обновляет статус задачи при перетаскивании
- Интегрируется с MobX store для синхронизации состояния

## Принцип работы

### 1. Drag-and-Drop Flow

1. Пользователь начинает перетаскивание задачи
2. Задача визуально выделяется (opacity: 0.7)
3. При наведении на колонку она подсвечивается
4. При отпускании вызывается `onDragEnd`

### 2. Обработка перетаскивания

```typescript
const onDragEnd = (result: DropResult) => {
  const { destination, source, draggableId } = result;

  // Игнорируем, если нет назначения или перетаскивание в ту же позицию
  if (!destination) return;
  if (destination.droppableId === source.droppableId && destination.index === source.index) {
    return;
  }

  // Обновляем статус, если задача перемещена в другую колонку
  const task = tasks.find((t) => t.id.toString() === draggableId);
  if (task && task.status !== destination.droppableId) {
    updateTask(task.id, {
      status: destination.droppableId as TaskStatus,
    });
  }
};
```

### 3. Интеграция с TaskList

TaskDndBoard передает флаг `dnd={true}` в TaskList, который:

- Включает компоненты `Droppable` и `Draggable`
- Настраивает визуальные эффекты перетаскивания
- Обеспечивает правильную сортировку в колонках

## Использование

### Базовое использование

```tsx
import { TaskDndBoard } from '@/features/task-dnd';

function TaskPage() {
  const handleEdit = (id: number) => {
    // Логика редактирования
  };

  const handleDelete = (id: number) => {
    // Логика удаления
  };

  return <TaskDndBoard onEdit={handleEdit} onDelete={handleDelete} />;
}
```

### Интеграция с роутингом

```tsx
import { TaskDndBoard } from '@/features/task-dnd';
import { useNavigate } from 'react-router-dom';

function TaskBoardPage() {
  const navigate = useNavigate();

  const handleEdit = (id: number) => {
    navigate(`/tasks/${id}/edit`);
  };

  return <TaskDndBoard onEdit={handleEdit} onDelete={handleDelete} />;
}
```

## Технические детали

### Зависимости

- `@hello-pangea/dnd` - библиотека для drag-and-drop
- `mobx-react-lite` - для реактивности
- `@/entities/task` - для работы с задачами

### Оптимизации

- Используется `observer` для реактивности
- Оптимистичные обновления в store
- Минимальные перерендеры при перетаскивании

### Ограничения

- Перетаскивание работает только между колонками статусов
- Не поддерживается изменение порядка в рамках одной колонки
- Требует стабильные ID задач

## Визуальные эффекты

### Во время перетаскивания

- Перетаскиваемая задача: `opacity: 0.7`
- Колонка назначения: `background: #f0f0f0`
- Плавные переходы: `transition: background 0.2s`

### Пустые колонки

- Отображается текст "Нет задач"
- Стиль: `color: #bbb, text-align: center`

## Обработка ошибок

### Сетевые ошибки

При ошибке обновления статуса:

1. Локальные изменения откатываются
2. Показывается уведомление об ошибке
3. Задача возвращается в исходную позицию

### Валидация

- Проверка существования задачи
- Валидация нового статуса
- Проверка прав доступа

## Расширение функциональности

### Возможные улучшения

1. **Изменение порядка в колонке**
   - Добавить поддержку сортировки внутри колонки
   - Реализовать приоритеты задач

2. **Множественное выделение**
   - Выбор нескольких задач
   - Массовые операции

3. **Фильтрация**
   - Фильтры по категории/приоритету
   - Поиск по названию

4. **Анимации**
   - Плавные переходы между состояниями
   - Анимации появления/исчезновения

### Интеграция с другими features

- **Уведомления** - уведомления об изменениях статуса
- **История** - логирование изменений статуса
- **Комментарии** - привязка комментариев к изменениям
