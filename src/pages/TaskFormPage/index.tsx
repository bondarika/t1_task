import { useNavigate, useParams } from 'react-router-dom';
import { observer } from 'mobx-react-lite';
import { message, Card } from 'antd';
import { taskStore } from '@/entities/task/model/taskStore';
import { TaskForm } from '@/entities/task/ui/TaskForm';
import { type Task } from '@/entities/task/model/types';

const TaskFormPage = observer(function TaskFormPage() {
  const { id } = useParams<{ id?: string }>();
  const navigate = useNavigate();
  const isEdit = Boolean(id);
  const { createTask, updateTask, loading, taskById } = taskStore;

  const initialValues = isEdit && id ? taskById(id) : undefined;

  const handleSubmit = async (values: Omit<Task, 'id' | 'createdAt'>) => {
    try {
      if (isEdit && id) {
        await updateTask(id, values);
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
    <div style={{ maxWidth: 480, margin: '0 auto', padding: 24 }}>
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
