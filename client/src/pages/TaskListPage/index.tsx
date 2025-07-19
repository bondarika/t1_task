import { observer } from 'mobx-react-lite';
import { useNavigate } from 'react-router-dom';
import { Button } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import { taskStore } from '@/entities/task/model/taskStore';
import { TaskDndBoard } from '@/features/task-dnd';
import '@/app/styles/App.css';

const TaskListPage = observer(function TaskListPage() {
  const navigate = useNavigate();
  const { deleteTask } = taskStore;

  return (
    <div className="task-list-root">
      <div className="task-list-header">
        <div className="task-list-header-content">
          <h1 className="task-list-title">T1</h1>
          <Button
            type="primary"
            icon={<PlusOutlined />}
            onClick={() => navigate('/task/new')}
            className="new-task-btn"
          >
            Новая задача
          </Button>
        </div>
      </div>
      <div className="task-list-container">
        <TaskDndBoard onDelete={deleteTask} onEdit={(id: number) => navigate(`/task/${id}`)} />
      </div>
    </div>
  );
});

export default TaskListPage;
