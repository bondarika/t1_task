import { gql } from '@apollo/client';

export const GET_TASKS = gql`
  query GetTasks {
    tasks {
      id
      title
      description
      category
      status
      priority
      createdAt
    }
  }
`;

export const CREATE_TASK = gql`
  mutation CreateTask(
    $title: String!
    $description: String
    $category: String!
    $status: String!
    $priority: String!
  ) {
    createTask(
      title: $title
      description: $description
      category: $category
      status: $status
      priority: $priority
    ) {
      id
      title
      description
      category
      status
      priority
      createdAt
    }
  }
`;

export const UPDATE_TASK = gql`
  mutation UpdateTask(
    $id: ID!
    $title: String
    $description: String
    $category: String
    $status: String
    $priority: String
  ) {
    updateTask(
      id: $id
      title: $title
      description: $description
      category: $category
      status: $status
      priority: $priority
    ) {
      id
      title
      description
      category
      status
      priority
      createdAt
    }
  }
`;

export const DELETE_TASK = gql`
  mutation DeleteTask($id: ID!) {
    deleteTask(id: $id)
  }
`;
