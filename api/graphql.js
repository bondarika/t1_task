const { ApolloServer, gql } = require('apollo-server-micro');

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

const server = new ApolloServer({
  typeDefs,
  resolvers,
});

const startServer = server.start();
const allowedOrigins = [
  'https://t1-task-gules.vercel.app',
  'http://localhost:5173',
];
module.exports = async (req, res) => {
  const origin = req.headers.origin;
  if (allowedOrigins.includes(origin)) {
    res.setHeader('Access-Control-Allow-Origin', origin);
    res.setHeader('Access-Control-Allow-Credentials', 'true');
    res.setHeader('Access-Control-Allow-Methods', 'POST, GET, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  } else {
    res.statusCode = 403;
    res.end('CORS Forbidden');
    return;
  }

  if (req.method === 'OPTIONS') {
    res.end();
    return;
  }

  await startServer;
  await server.createHandler({ path: '/api/graphql' })(req, res);
};