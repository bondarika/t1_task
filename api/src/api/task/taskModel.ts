import { extendZodWithOpenApi } from '@asteasolutions/zod-to-openapi';
import { z } from 'zod';
import { commonValidations } from '../../common/utils/commonValidation';

extendZodWithOpenApi(z);

export type Task = z.infer<typeof TaskSchema>;
export const TaskSchema = z.object({
  id: z.number(),
  title: z.string(),
  description: z.string().optional(),
  category: z.enum(['Bug', 'Feature', 'Documentation', 'Refactor', 'Test']),
  status: z.enum(['To Do', 'In Progress', 'Done']),
  priority: z.enum(['Low', 'Medium', 'High']),
  createdAt: z.date(),
});

// Валидация инпута для 'GET tasks/:id' эндпоинта
export const GetTaskSchema = z.object({
  params: z.object({ id: commonValidations.id }),
});

// Валидация инпута для 'POST /tasks' эндпоинта (создание задачи)
export const CreateTaskSchema = z.object({
  body: z.object({
    title: z.string().min(1, 'Название задачи обязательно'),
    description: z.string().optional(),
    category: z.enum(['Bug', 'Feature', 'Documentation', 'Refactor', 'Test']),
    status: z.enum(['To Do', 'In Progress', 'Done']),
    priority: z.enum(['Low', 'Medium', 'High']),
  }),
});

// Валидация инпута для 'PATCH /tasks/:id' эндпоинта (обновление задачи)
export const UpdateTaskSchema = z.object({
  params: z.object({ id: commonValidations.id }),
  body: z.object({
    title: z.string().min(1, 'Название задачи обязательно').optional(),
    description: z.string().optional(),
    category: z.enum(['Bug', 'Feature', 'Documentation', 'Refactor', 'Test']).optional(),
    status: z.enum(['To Do', 'In Progress', 'Done']).optional(),
    priority: z.enum(['Low', 'Medium', 'High']).optional(),
  }),
});

// Валидация инпута для 'DELETE /tasks/:id' эндпоинта (удаление задачи)
export const DeleteTaskSchema = z.object({
  params: z.object({ id: commonValidations.id }),
});
