import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import client from './ApolloProvider.js'
import { ApolloProvider } from '@apollo/client/react';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    
    <Provider store={store}>
    <ApolloProvider client={client} > 
    <App />
    </ApolloProvider> 
  </StrictMode>,
)
