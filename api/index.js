const { ApolloServer, gql } = require('apollo-server');

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

let tasks = [];
let idCounter = 1;

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
  'http://localhost:5173',
];

const server = new ApolloServer({
  typeDefs,
  resolvers,
  cors: {
    origin: (origin, callback) => {
      // allow requests with no origin (like mobile apps, curl, etc.)
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error('Not allowed by CORS'));
      }
    },
    credentials: true,
  },
});

server.listen({ port: 4000 }).then(({ url }) => {
  console.log(`�� Server ready at ${url}`);
});