import { StatusCodes } from 'http-status-codes';
import type { Task } from './taskModel';
import { TaskRepository } from './taskRepository';
import { ServiceResponse } from '../../common/models/serviceResponse';
import { logger } from '../../server';

export class TaskService {
  private taskRepository: TaskRepository;

  constructor(repository: TaskRepository = new TaskRepository()) {
    this.taskRepository = repository;
  }

  // Получает все задачи из базы данных
  async findAll(): Promise<ServiceResponse<Task[] | null>> {
    try {
      const tasks = await this.taskRepository.findAllAsync();
      if (!tasks || tasks.length === 0) {
        return ServiceResponse.failure(
          'No Tasks found',
          null,
          StatusCodes.NOT_FOUND
        );
      }
      return ServiceResponse.success<Task[]>('Tasks found', tasks);
    } catch (ex) {
      const errorMessage = `Error finding all tasks: $${(ex as Error).message}`;
      logger.error(errorMessage);
      return ServiceResponse.failure(
        'An error occurred while retrieving tasks.',
        null,
        StatusCodes.INTERNAL_SERVER_ERROR
      );
    }
  }

  // Получает одну задачу по её ID
  async findById(id: number): Promise<ServiceResponse<Task | null>> {
    try {
      const task = await this.taskRepository.findByIdAsync(id);
      if (!task) {
        return ServiceResponse.failure(
          'Task not found',
          null,
          StatusCodes.NOT_FOUND
        );
      }
      return ServiceResponse.success<Task>('Task found', task);
    } catch (ex) {
      const errorMessage = `Error finding task with id ${id}:, ${(ex as Error).message}`;
      logger.error(errorMessage);
      return ServiceResponse.failure(
        'An error occurred while finding task.',
        null,
        StatusCodes.INTERNAL_SERVER_ERROR
      );
    }
  }

  // Создает новую задачу
  async create(
    taskData: Omit<Task, 'id' | 'createdAt'>
  ): Promise<ServiceResponse<Task | null>> {
    try {
      const newTask = await this.taskRepository.createAsync(taskData);
      return ServiceResponse.success<Task>(
        'Task created successfully',
        newTask
      );
    } catch (ex) {
      const errorMessage = `Error creating task: ${(ex as Error).message}`;
      logger.error(errorMessage);
      return ServiceResponse.failure(
        'An error occurred while creating task.',
        null,
        StatusCodes.INTERNAL_SERVER_ERROR
      );
    }
  }

  // Обновляет существующую задачу
  async update(
    id: number,
    taskData: Partial<Omit<Task, 'id' | 'createdAt'>>
  ): Promise<ServiceResponse<Task | null>> {
    try {
      const existingTask = await this.taskRepository.findByIdAsync(id);
      if (!existingTask) {
        return ServiceResponse.failure(
          'Task not found',
          null,
          StatusCodes.NOT_FOUND
        );
      }

      const updatedTask = await this.taskRepository.updateAsync(id, taskData);
      return ServiceResponse.success<Task>(
        'Task updated successfully',
        updatedTask
      );
    } catch (ex) {
      const errorMessage = `Error updating task with id ${id}: ${(ex as Error).message}`;
      logger.error(errorMessage);
      return ServiceResponse.failure(
        'An error occurred while updating task.',
        null,
        StatusCodes.INTERNAL_SERVER_ERROR
      );
    }
  }

  // Удаляет задачу
  async delete(id: number): Promise<ServiceResponse<boolean | null>> {
    try {
      const existingTask = await this.taskRepository.findByIdAsync(id);
      if (!existingTask) {
        return ServiceResponse.failure(
          'Task not found',
          null,
          StatusCodes.NOT_FOUND
        );
      }

      await this.taskRepository.deleteAsync(id);
      return ServiceResponse.success<boolean>(
        'Task deleted successfully',
        true
      );
    } catch (ex) {
      const errorMessage = `Error deleting task with id ${id}: ${(ex as Error).message}`;
      logger.error(errorMessage);
      return ServiceResponse.failure(
        'An error occurred while deleting task.',
        null,
        StatusCodes.INTERNAL_SERVER_ERROR
      );
    }
  }
}

export const taskService = new TaskService();
