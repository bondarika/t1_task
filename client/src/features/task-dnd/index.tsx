import { DragDropContext } from '@hello-pangea/dnd';
import type { DropResult } from '@hello-pangea/dnd';
import { TaskList } from '@/entities/task/ui/TaskList';
import { taskStore } from '@/entities/task/model/taskStore';
import { observer } from 'mobx-react-lite';
import type { TaskDndBoardProps } from './types.ts';

export const TaskDndBoard = observer(({ onEdit, onDelete }: TaskDndBoardProps) => {
  const { tasks, loading, updateTask } = taskStore;

  const onDragEnd = (result: DropResult) => {
    const { destination, source, draggableId } = result;
    if (!destination) return;
    if (destination.droppableId === source.droppableId && destination.index === source.index) {
      return;
    }
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
