const { ApolloServer, gql } = require('apollo-server');

// Типы схемы
const typeDefs = gql`
  type Task {
    id: ID!
    title: String!
    description: String
    category: String!
    status: String!
    priority: String!
    createdAt: String!
  }

  type Query {
    tasks: [Task!]!
    task(id: ID!): Task
  }

  type Mutation {
    createTask(
      title: String!
      description: String
      category: String!
      status: String!
      priority: String!
    ): Task!
    updateTask(
      id: ID!
      title: String
      description: String
      category: String
      status: String
      priority: String
    ): Task!
    deleteTask(id: ID!): Boolean!
  }
`;

// Хранилище задач в памяти
let tasks = [];
let idCounter = 1;

// Резолверы
const resolvers = {
  Query: {
    tasks: () => tasks,
    task: (_, { id }) => tasks.find((t) => t.id === id),
  },
  Mutation: {
    createTask: (_, { title, description, category, status, priority }) => {
      const newTask = {
        id: String(idCounter++),
        title,
        description,
        category,
        status,
        priority,
        createdAt: new Date().toISOString(),
      };
      tasks.push(newTask);
      return newTask;
    },
    updateTask: (_, { id, ...updates }) => {
      const idx = tasks.findIndex((t) => t.id === id);
      if (idx === -1) throw new Error('Задача не найдена');
      tasks[idx] = { ...tasks[idx], ...updates };
      return tasks[idx];
    },
    deleteTask: (_, { id }) => {
      const idx = tasks.findIndex((t) => t.id === id);
      if (idx === -1) return false;
      tasks.splice(idx, 1);
      return true;
    },
  },
};

const allowedOrigins = [
  'https://t1-task-gules.vercel.app',
  'http://localhost:5173'
];

// Создание сервера
const server = new ApolloServer({
  typeDefs,
  resolvers,
  cors: {
    origin: (origin, callback) => {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error('Not allowed by CORS'));
      }
    },
    credentials: true
  },
});

// Запуск сервера
server.listen().then(({ url }) => {
  console.log(`Сервер запущен на ${url}`);
});
