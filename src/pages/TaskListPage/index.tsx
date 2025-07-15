import { observer } from 'mobx-react-lite';
import { useNavigate } from 'react-router-dom';
import { Button, Card } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import { taskStore } from '@/entities/task/model/taskStore';
import { TaskList } from '@/entities/task/ui/TaskList';

const TaskListPage = observer(function TaskListPage() {
  const navigate = useNavigate();
  const { tasks, loading, deleteTask } = taskStore;

  return (
    <div>
      <div>
        <Card>
          <h1>Задачи</h1>
          <Button type="primary" icon={<PlusOutlined />} onClick={() => navigate('/task/new')}>
            Новая задача
          </Button>
        </Card>
        <TaskList
          tasks={tasks}
          loading={loading}
          onDelete={deleteTask}
          onEdit={(id: string) => navigate(`/task/${id}`)}
        />
      </div>
    </div>
  );
});

export default TaskListPage;
