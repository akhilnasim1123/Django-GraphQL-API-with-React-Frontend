import React from 'react';
import LoginPage from './LoginPage';
import 'bootstrap/dist/css/bootstrap.min.css';
import { ApolloProvider } from '@apollo/client/react';

function App() {
  return (
    <div className="App">
      <ApolloProvider 
      <LoginPage />
    </div>
  );
}

export default App;
