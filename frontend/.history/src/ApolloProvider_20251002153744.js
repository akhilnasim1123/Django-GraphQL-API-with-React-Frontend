import { ApolloClient, InMemoryCache, createHttpLink } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';

const httpLink = createHttpLink({
  uri: '/graphql/',  // your GraphQL endpoint
});

const authLink = setContext((_, { headers }) => {
  const token = localStorage.getItem('token');  // or wherever you store your JWT token
  return {
    headers: {
      ...headers,
      Authorization: token ? `JWT ${token}` : "",
    }
  }
});

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});
export c