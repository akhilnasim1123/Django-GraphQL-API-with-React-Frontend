// src/apolloClient.js
import { ApolloClient, InMemoryCache, createHttpLink } from '@apollo/client'
import { setContext } from '@apollo/client/link/context'

const httpLink = creatHttpLink({
  uri: 'http://192.168.18.40:8000/graphql/',  
  credentials: 'include',
})

// Attach the JWT token to each request if it exists
const authLink = setContext((_, { headers }) => {
  const token = localStorage.getItem('token') // get token from localStorage (or wherever you store it)
  return {
    headers: {
      ...headers,
      authorization: token ? `JWT ${token}` : '',
    }
  }
})

const client = new ApolloClient({
  link: httpLink,
  cache: new InMemoryCache(),
});

export default client
