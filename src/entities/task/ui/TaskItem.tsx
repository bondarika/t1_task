import { Card, Button } from 'antd';
import { DeleteOutlined } from '@ant-design/icons';
import { type TaskItemProps } from '../model/types';
import dayjs from 'dayjs';
import 'dayjs/locale/ru';

dayjs.locale('ru');

function formatDate(dateStr: string) {
  return dayjs(dateStr).format('D MMMM YYYY, HH:mm');
}

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
          <span className="task-card-type">{task.category}</span>
          <div className="task-card-bottom-row">
            <span className="task-card-date">{formatDate(task.createdAt)}</span>
            <span
              className={`task-card-priority task-card-priority-${task.priority.toLowerCase()}`}
            >
              {task.priority}
            </span>
          </div>
        </div>
      </div>
    </Card>
  );
}
