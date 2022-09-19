/* eslint-disable no-console */
import { ApolloClient, createHttpLink, from, InMemoryCache, NormalizedCacheObject } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import { onError } from '@apollo/client/link/error';

/**
 * - Initialize the Apollo client
 * - Handle errors at high level like a middleware
 * - Note: this is where we should handle auth (unauthorized, headers...)
 * @returns the Apollo client
 */
export const initApolloClient = (): ApolloClient<NormalizedCacheObject> => {
  const httpLink = createHttpLink({
    uri: 'http://localhost:4000'
  });

  const authLink = setContext((_, { headers }) => {
    const token = localStorage.getItem('token');
    return {
      headers: {
        ...headers,
        authorization: token ? `Bearer ${token}` : null
      }
    };
  });

  const errorLink = onError(({ graphQLErrors, networkError }) => {
    if (graphQLErrors) {
      graphQLErrors.forEach(({ message, locations, path }) => {
        console.log(`[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`);
      });
    }
    if (networkError) {
      console.log(`[Network error]: ${networkError}`);
    }
  });

  const link = from([errorLink, authLink, httpLink]);

  const cache = new InMemoryCache();

  const client = new ApolloClient({
    link,
    cache
  });

  return client;
};
