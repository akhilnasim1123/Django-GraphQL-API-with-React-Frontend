import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import client from './ApolloProvider.js'
import { ApolloProvider } from '@apollo/client/react';
import { Provider } from 'react-redux';
import { store } from './Store.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    
    <Provider store={store}>
    <ApolloProvider client={client} > 
    <App />
    </ApolloProvider> 
    </Provider>
  </StrictMode>,
)
