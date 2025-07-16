// src/shared/api/apolloClient.ts
import { ApolloClient, InMemoryCache } from '@apollo/client';

export const apolloClient = new ApolloClient({
  uri: 'https://t1-task.onrender.com',
  cache: new InMemoryCache(),
});
