// src/apolloClient.js
import { ApolloClient, InMemoryCache, HttpLink } from '@apollo/client'
import { setContext } from '@apollo/client/link/context'

const httpLink = new HttpLink({
  uri: 'http://192.168.18.40:8000/graphql/',  // Your backend GraphQL URL
})

const authLink = setContext((_, { headers }) => {
  const token = localStorage.getItem('token')  // Assumes JWT token is stored here
  return {
    headers: {
      ...headers,
      Authorization: token ? `JWT ${token}` : '',
    }
  }
})

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
  credentials: 'include',  // Optional: only needed if using cookies/session
})

export default client
