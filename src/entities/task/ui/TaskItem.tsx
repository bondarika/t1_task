import { Card, Tag, Button, Space } from 'antd';
import { DeleteOutlined } from '@ant-design/icons';
import { type Task, type TaskItemProps } from '../model/types';

const statusColors: Record<Task['status'], string> = {
  'To Do': 'default',
  'In Progress': 'blue',
  Done: 'green',
};
const priorityColors: Record<Task['priority'], string> = {
  Low: 'green',
  Medium: 'orange',
  High: 'red',
};

export function TaskItem({ task, onDelete, onEdit }: TaskItemProps) {
  return (
    <Card
      hoverable
      onClick={() => onEdit(task.id)}
      extra={
        <Button
          type="text"
          icon={<DeleteOutlined />}
          danger
          onClick={(e) => {
            e.stopPropagation();
            onDelete(task.id);
          }}
        />
      }
    >
      <div>{task.title}</div>
      {task.description && <div>{task.description}</div>}
      <Space size={6} wrap>
        <Tag>{task.category}</Tag>
        <Tag color={statusColors[task.status]}>{task.status}</Tag>
        <Tag color={priorityColors[task.priority]}>{task.priority}</Tag>
        <span>{new Date(task.createdAt).toLocaleDateString()}</span>
      </Space>
    </Card>
  );
}
