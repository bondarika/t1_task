import { extendZodWithOpenApi } from '@asteasolutions/zod-to-openapi';
import { z } from 'zod';
import { commonValidations } from '../../common/utils/commonValidation';

extendZodWithOpenApi(z);

export type Task = z.infer<typeof TaskSchema>;
export const TaskSchema = z.object({
  id: z.number(),
  title: z.string(),
  description: z.string().optional(),
  category: z
    .enum(['Bug', 'Feature', 'Documentation', 'Refactor', 'Test'])
    .optional(),
  status: z.enum(['To Do', 'In Progress', 'Done']).optional(),
  priority: z.enum(['Low', 'Medium', 'High']).optional(),
  createdAt: z.date(),
});

// Валидация инпута для 'GET tasks/:id' эндпоинта
export const GetTaskSchema = z.object({
  params: z.object({ id: commonValidations.id }),
});
