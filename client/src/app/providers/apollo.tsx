import { type ReactNode } from 'react';
import { ApolloProvider } from '@apollo/client';
import { apolloClient } from '@/shared/api/apolloClient';

export const ApolloAppProvider = ({ children }: { children: ReactNode }) => (
  <ApolloProvider client={apolloClient}>{children}</ApolloProvider>
);
