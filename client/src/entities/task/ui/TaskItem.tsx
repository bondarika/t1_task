import { Card, Button } from 'antd';
import { DeleteOutlined } from '@ant-design/icons';
import { type TaskItemProps } from '../model/types';
import dayjs from 'dayjs';
import 'dayjs/locale/ru';

dayjs.locale('ru');

/**
 * Форматирует дату в читаемый вид
 * @description Преобразует объект Date в строку формата "D MMMM YYYY, HH:mm"
 * @param date - Дата для форматирования
 * @returns Отформатированная строка даты на русском языке
 *
 * @example
 * ```ts
 * formatDate(new Date()) // "15 января 2024, 14:30"
 * ```
 */
function formatDate(date: Date) {
  return dayjs(date).format('D MMMM YYYY, HH:mm');
}

/**
 * Компонент карточки отдельной задачи
 * @description Отображает информацию о задаче в виде интерактивной карточки
 * с возможностью редактирования и удаления
 * @param props - Пропсы компонента
 * @param props.task - Объект задачи для отображения
 * @param props.onDelete - Callback для удаления задачи
 * @param props.onEdit - Callback для редактирования задачи
 * @returns JSX элемент карточки задачи
 *
 * @example
 * ```tsx
 * <TaskItem
 *   task={taskData}
 *   onDelete={handleDelete}
 *   onEdit={handleEdit}
 * />
 * ```
 */
export function TaskItem({ task, onDelete, onEdit }: TaskItemProps) {
  return (
    <Card hoverable className="task-card" onClick={() => onEdit(task.id)}>
      <div className="task-card-inner">
        <div className="task-card-header">
          <div className="task-card-title">{task.title}</div>
          <Button
            className="task-delete-btn"
            type="text"
            icon={<DeleteOutlined />}
            danger
            onClick={(e) => {
              e.stopPropagation();
              onDelete(task.id);
            }}
          />
        </div>
        {task.description && <div className="task-card-desc">{task.description}</div>}
        <div className="task-card-bottom">
          {task.category && <span className="task-card-type">{task.category}</span>}
          <div className="task-card-bottom-row">
            <span className="task-card-date">{formatDate(task.createdAt)}</span>
            {task.priority && (
              <span
                className={`task-card-priority task-card-priority-${task.priority.toLowerCase()}`}
              >
                {task.priority}
              </span>
            )}
          </div>
        </div>
      </div>
    </Card>
  );
}
