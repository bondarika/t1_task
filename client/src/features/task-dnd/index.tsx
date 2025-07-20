import { DragDropContext } from '@hello-pangea/dnd';
import type { DropResult } from '@hello-pangea/dnd';
import { TaskList } from '@/entities/task/ui/TaskList';
import { taskStore } from '@/entities/task/model/taskStore';
import { observer } from 'mobx-react-lite';
import type { TaskDndBoardProps } from './types.ts';

/**
 * Компонент доски с drag-and-drop функциональностью для задач
 * @description Позволяет перетаскивать задачи между колонками статусов
 * и автоматически обновляет статус задачи на сервере при перетаскивании
 * @param props - Пропсы компонента
 * @param props.onEdit - Callback для редактирования задачи
 * @param props.onDelete - Callback для удаления задачи
 * @returns JSX элемент доски с drag-and-drop
 *
 * @example
 * ```tsx
 * <TaskDndBoard
 *   onEdit={handleEdit}
 *   onDelete={handleDelete}
 * />
 * ```
 */
export const TaskDndBoard = observer(({ onEdit, onDelete }: TaskDndBoardProps) => {
  const { tasks, loading, updateTask } = taskStore;

  /**
   * Обработчик завершения перетаскивания
   * @description Анализирует результат перетаскивания и обновляет статус задачи,
   * если она была перемещена в другую колонку статуса
   * @param result - Результат операции перетаскивания от @hello-pangea/dnd
   *
   * @note Функция игнорирует перетаскивания в ту же позицию или без назначения
   * @note Обновляет только статус, если задача перемещена в другую колонку
   */
  const onDragEnd = (result: DropResult) => {
    const { destination, source, draggableId } = result;

    // Игнорируем, если нет назначения или перетаскивание в ту же позицию
    if (!destination) return;
    if (destination.droppableId === source.droppableId && destination.index === source.index) {
      return;
    }

    // Находим задачу по ID и обновляем статус, если он изменился
    const task = tasks.find((t) => t.id.toString() === draggableId);
    if (task && task.status !== destination.droppableId) {
      updateTask(task.id, {
        status: destination.droppableId as import('@/entities/task/model/types').TaskStatus,
      });
    }
  };

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <TaskList tasks={tasks} loading={loading} onEdit={onEdit} onDelete={onDelete} dnd />
    </DragDropContext>
  );
});
