import { apolloClient } from '@/shared/api/apolloClient';
import { GET_TASKS, CREATE_TASK, UPDATE_TASK, DELETE_TASK } from './gql.ts';
import { type Task } from '../model/types.ts';

export const apiGetTasks = async (): Promise<Task[]> => {
  const { data } = await apolloClient.query({ query: GET_TASKS, fetchPolicy: 'no-cache' });
  return data.tasks;
};

export const apiCreateTask = async (task: Omit<Task, 'id' | 'createdAt'>): Promise<Task> => {
  const { data } = await apolloClient.mutate({
    mutation: CREATE_TASK,
    variables: task,
  });
  return data.createTask;
};

export const apiUpdateTask = async (
  id: string,
  updates: Partial<Omit<Task, 'id' | 'createdAt'>>,
): Promise<Task> => {
  const { data } = await apolloClient.mutate({
    mutation: UPDATE_TASK,
    variables: { id, ...updates },
  });
  return data.updateTask;
};

export const apiDeleteTask = async (id: string): Promise<void> => {
  await apolloClient.mutate({
    mutation: DELETE_TASK,
    variables: { id },
  });
};
