import { OpenAPIRegistry } from '@asteasolutions/zod-to-openapi';
import express, { type Router } from 'express';
import { z } from 'zod';
import {
  GetTaskSchema,
  TaskSchema,
  CreateTaskSchema,
  UpdateTaskSchema,
  DeleteTaskSchema,
} from './taskModel';
import { createApiResponse } from '../../api-docs/openAPIResponseBuilders';
import { validateRequest } from '../../common/utils/httpHandlers';
import { taskController } from './taskController';

export const taskRegistry = new OpenAPIRegistry();
export const taskRouter: Router = express.Router();

taskRegistry.register('Task', TaskSchema);

taskRegistry.registerPath({
  method: 'get',
  path: '/tasks',
  tags: ['Task'],
  responses: createApiResponse(z.array(TaskSchema), 'Success'),
});

taskRouter.get('/', taskController.getTasks);

taskRegistry.registerPath({
  method: 'get',
  path: '/tasks/{id}',
  tags: ['Task'],
  request: { params: GetTaskSchema.shape.params },
  responses: createApiResponse(TaskSchema, 'Success'),
});

taskRouter.get('/:id', validateRequest(GetTaskSchema), taskController.getTask);

// Создание задачи
taskRegistry.registerPath({
  method: 'post',
  path: '/tasks',
  tags: ['Task'],
  request: {
    body: {
      content: {
        'application/json': {
          schema: CreateTaskSchema.shape.body,
        },
      },
    },
  },
  responses: createApiResponse(TaskSchema, 'Success'),
});

taskRouter.post(
  '/',
  validateRequest(CreateTaskSchema),
  taskController.createTask
);

// Обновление задачи
taskRegistry.registerPath({
  method: 'patch',
  path: '/tasks/{id}',
  tags: ['Task'],
  request: {
    params: UpdateTaskSchema.shape.params,
    body: {
      content: {
        'application/json': {
          schema: UpdateTaskSchema.shape.body,
        },
      },
    },
  },
  responses: createApiResponse(TaskSchema, 'Success'),
});

taskRouter.patch(
  '/:id',
  validateRequest(UpdateTaskSchema),
  taskController.updateTask
);

// Удаление задачи
taskRegistry.registerPath({
  method: 'delete',
  path: '/tasks/{id}',
  tags: ['Task'],
  request: { params: DeleteTaskSchema.shape.params },
  responses: createApiResponse(z.boolean(), 'Success'),
});

taskRouter.delete(
  '/:id',
  validateRequest(DeleteTaskSchema),
  taskController.deleteTask
);
