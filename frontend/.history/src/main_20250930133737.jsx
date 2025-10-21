// main.jsx or index.jsx
import React from 'react';
import { createRoot } from 'react-dom/client';
import { StrictMode } from 'react';
import { Provider } from 'react-redux';import { ApolloProvider } from '@apollo/client/react';

import App from './App.jsx';
import client from './ApolloProvider.js';
import { store } from './Store.jsx';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider store={store}>
      <ApolloProvider client={client}>
        <App />
      </ApolloProvider>
    </Provider>
  </StrictMode>
);
