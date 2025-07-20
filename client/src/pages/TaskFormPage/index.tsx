import { useNavigate, useParams } from 'react-router-dom';
import { observer } from 'mobx-react-lite';
import { Card, App } from 'antd';
import { taskStore } from '@/entities/task/model/taskStore';
import { TaskForm } from '@/entities/task/ui/TaskForm';
import { type CreateTaskData, type UpdateTaskData } from '@/entities/task/model/types';
import '@/app/styles/App.css';

const TaskFormPage = observer(function TaskFormPage() {
  const { id } = useParams<{ id?: string }>();
  const navigate = useNavigate();
  const isEdit = Boolean(id);
  const { createTask, updateTask, loading, taskById } = taskStore;
  const { message } = App.useApp();

  const initialValues = isEdit && id ? taskById(Number(id)) : undefined;

  const handleSubmit = async (values: CreateTaskData) => {
    try {
      if (isEdit && id) {
        await updateTask(Number(id), values as UpdateTaskData);
        message.success('Задача обновлена');
      } else {
        await createTask(values);
        message.success('Задача создана');
      }
      navigate('/');
    } catch {
      message.error('Ошибка сохранения задачи');
    }
  };

  return (
    <div className="task-form-container">
      <Card>
        <h1 style={{ fontWeight: 700, fontSize: 24, marginBottom: 24 }}>
          {isEdit ? 'Редактировать задачу' : 'Новая задача'}
        </h1>
        <TaskForm
          initialValues={initialValues}
          loading={loading}
          onSubmit={handleSubmit}
          onCancel={() => navigate('/')}
        />
      </Card>
    </div>
  );
});

export default TaskFormPage;
