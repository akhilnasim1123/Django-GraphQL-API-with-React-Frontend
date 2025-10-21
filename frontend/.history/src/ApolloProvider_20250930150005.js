// src/apolloClient.js
import { ApolloClient, InMemoryCache, createHttpLink } from '@apollo/client'

const httpLink = createHttpLink({
  uri: 'http://192.168.18.40:8000/graphql/',  
  credentials: 'include',
})

const client = new ApolloClient({
  link: httpLink,
  cache: new InMemoryCache(),
});

export default client
 