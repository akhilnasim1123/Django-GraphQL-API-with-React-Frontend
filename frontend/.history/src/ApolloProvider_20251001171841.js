// src/apolloClient.js
import { ApolloClient, InMemoryCache, HttpLink } from '@apollo/client'
import { SetContextLink } from '@apollo/client/link/context'


const httpLink = new HttpLink({
  uri: 'http://192.168.18.40:8000/graphql/',  
  // credentials: 'include',
})

const authLink = new SetContextLink((_, { headers }) => {
  const token = localStorage.getItem('token') 
  return { 
    headers: {
      ...headers,
      authorization: token ? `JWT ${token}` : '',
    }
  }
}) 
               

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
  credentials: 'include', 
})

export default client
