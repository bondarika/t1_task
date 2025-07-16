import { useEffect } from 'react';
import { Form, Input, Button, Select } from 'antd';
import { type Task, type TaskFormProps } from '../model/types';
import { categories, statuses, priorities } from '../model/constants';

const { Option } = Select;

export function TaskForm({ initialValues, loading, onSubmit, onCancel }: TaskFormProps) {
  const [form] = Form.useForm<Omit<Task, 'id' | 'createdAt'>>();

  useEffect(() => {
    if (initialValues) {
      form.setFieldsValue(initialValues);
    } else {
      form.resetFields();
    }
  }, [initialValues, form]);

  const handleFinish = (values: Omit<Task, 'id' | 'createdAt'>) => {
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
        <Select size="large" placeholder="Выберите категорию" allowClear>
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
        <Select size="large" placeholder="Выберите статус" allowClear>
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
        <Select size="large" placeholder="Выберите приоритет" allowClear>
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
