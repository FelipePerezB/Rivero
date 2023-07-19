import { ApolloClient, InMemoryCache, ApolloProvider, gql } from '@apollo/client';

export const client = new ApolloClient({
  uri: 'https://rivero-server.vercel.app/graphql',
  cache: new InMemoryCache(),
});