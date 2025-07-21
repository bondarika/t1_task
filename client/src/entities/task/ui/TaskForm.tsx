import { useEffect } from 'react';
import { Form, Input, Button, Select } from 'antd';
import { type CreateTaskData, type TaskFormProps } from '../model/types';
import { categories, statuses, priorities } from '../model/constants';

const { Option } = Select;

/**
 * Форма создания/редактирования задачи
 */
export function TaskForm({ initialValues, loading, onSubmit, onCancel }: TaskFormProps) {
  const [form] = Form.useForm<CreateTaskData>();

  // Синхронизация initialValues с формой
  useEffect(() => {
    if (initialValues) {
      form.setFieldsValue(initialValues);
    } else {
      form.resetFields();
    }
  }, [initialValues, form]);

  // Обработчик отправки формы
  const handleFinish = (values: CreateTaskData) => {
    onSubmit(values);
  };

  return (
    <Form form={form} layout="vertical" onFinish={handleFinish} initialValues={initialValues}>
      <Form.Item
        name="title"
        label={<span>Заголовок</span>}
        rules={[{ required: true, message: 'Введите заголовок' }]}
      >
        <Input placeholder="Заголовок задачи" autoFocus size="large" />
      </Form.Item>
      <Form.Item name="description" label={<span>Описание</span>}>
        <Input.TextArea
          placeholder="Описание задачи"
          autoSize={{ minRows: 2, maxRows: 5 }}
          size="large"
        />
      </Form.Item>
      <Form.Item
        name="category"
        label={<span>Категория</span>}
        rules={[{ required: true, message: 'Выберите категорию' }]}
      >
        <Select size="large" placeholder="Выберите категорию">
          {categories.map((cat) => (
            <Option key={cat} value={cat}>
              {cat}
            </Option>
          ))}
        </Select>
      </Form.Item>
      <Form.Item
        name="status"
        label={<span>Статус</span>}
        rules={[{ required: true, message: 'Выберите статус' }]}
      >
        <Select size="large" placeholder="Выберите статус">
          {statuses.map((st) => (
            <Option key={st} value={st}>
              {st}
            </Option>
          ))}
        </Select>
      </Form.Item>
      <Form.Item
        name="priority"
        label={<span>Приоритет</span>}
        rules={[{ required: true, message: 'Выберите приоритет' }]}
      >
        <Select size="large" placeholder="Выберите приоритет">
          {priorities.map((pr) => (
            <Option key={pr} value={pr}>
              {pr}
            </Option>
          ))}
        </Select>
      </Form.Item>
      <Form.Item>
        <Button type="primary" htmlType="submit" loading={loading} size="large">
          Сохранить
        </Button>
        <Button style={{ minWidth: 100, marginLeft: 12 }} size="large" onClick={onCancel}>
          Отмена
        </Button>
      </Form.Item>
    </Form>
  );
}
