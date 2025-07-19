import type { Task } from './taskModel';

export const tasks: Task[] = [
  {
    id: 1,
    title: 'Fix API authentication bug',
    description: 'Users are logged out unexpectedly.',
    category: 'Bug',
    status: 'In Progress',
    priority: 'High',
    createdAt: new Date('2025-07-15T10:00:00Z'),
  },
  {
    id: 2,
    title: 'Add dark mode',
    category: 'Feature',
    status: 'To Do',
    priority: 'Medium',
    createdAt: new Date('2025-07-10T08:30:00Z'),
  },
  {
    id: 3,
    title: 'Update README',
    description: 'Add instructions for new deployment.',
    category: 'Documentation',
    status: 'Done',
    priority: 'Low',
    createdAt: new Date('2025-07-05T14:45:00Z'),
  },
  {
    id: 4,
    title: 'Refactor user service',
    category: 'Refactor',
    status: 'To Do',
    priority: 'Medium',
    createdAt: new Date('2025-07-12T09:15:00Z'),
  },
];

export class TaskRepository {
  async findAllAsync(): Promise<Task[]> {
    return tasks;
  }

  async findByIdAsync(id: number): Promise<Task | null> {
    return tasks.find((task) => task.id === id) || null;
  }

  async createAsync(taskData: Omit<Task, 'id' | 'createdAt'>): Promise<Task> {
    const newId = Math.max(...tasks.map((task) => task.id), 0) + 1;
    const newTask: Task = {
      ...taskData,
      id: newId,
      createdAt: new Date(),
    };
    tasks.push(newTask);
    return newTask;
  }

  async updateAsync(id: number, taskData: Partial<Omit<Task, 'id' | 'createdAt'>>): Promise<Task> {
    const taskIndex = tasks.findIndex((task) => task.id === id);
    if (taskIndex === -1) {
      throw new Error(`Task with id ${id} not found`);
    }

    tasks[taskIndex] = {
      ...tasks[taskIndex],
      ...taskData,
    };

    return tasks[taskIndex];
  }

  async deleteAsync(id: number): Promise<void> {
    const taskIndex = tasks.findIndex((task) => task.id === id);
    if (taskIndex === -1) {
      throw new Error(`Task with id ${id} not found`);
    }

    tasks.splice(taskIndex, 1);
  }
}
