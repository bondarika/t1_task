import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './app/App.tsx';
import { ApolloAppProvider } from '@app/providers/apollo';

createRoot(document.getElementById('root')!).render(
  <ApolloAppProvider>
    <StrictMode>
      <App />
    </StrictMode>
  </ApolloAppProvider>,
);
