import { Row, Col, Empty } from 'antd';
import { type TaskListProps } from '../model/types';
import { TaskItem } from './TaskItem';

export function TaskList({ tasks, loading, onDelete, onEdit }: TaskListProps) {
  if (loading) return <div>Загрузка...</div>;
  if (!tasks.length) return <Empty description="Нет задач" />;

  return (
    <Row>
      {tasks.map((task) => (
        <Col key={task.id}>
          <TaskItem task={task} onDelete={onDelete} onEdit={onEdit} />
        </Col>
      ))}
    </Row>
  );
}
