import { ApolloClient, from, HttpLink, InMemoryCache } from '@apollo/client';
import { onError } from '@apollo/client/link/error';
import { RetryLink } from '@apollo/client/link/retry';

import { removeScaled } from '@/utils';

const errorLink = onError(({ graphQLErrors, networkError, operation }) => {
  const queryAndVariables = {
    query: print(operation.query),
    variables: operation?.variables,
  };

  if (graphQLErrors) {
    for (const error of graphQLErrors) {
      console.error(
        {
          error,
          ...queryAndVariables,
        },
        'errorLink GraphQL error',
      );
    }
  }

  if (networkError) {
    console.error(
      {
        error: networkError,
        ...queryAndVariables,
      },
      'errorLink Network error',
    );
  }
});

const retryLink = new RetryLink({
  attempts: {
    max: 2,
  },
  delay: {
    initial: 20_000, // 20s secconds in milliseconds, it multiplies exponentialy
    max: 60_000, // 1 minute in milliseconds
  },
});

const httpLink = new HttpLink({
  uri: 'https://www.tkrp.net/graphql',
});

const config = {
  cache: new InMemoryCache({
    typePolicies: {
      MediaItem: {
        fields: {
          sourceUrl: {
            read(sourceUrl) {
              return removeScaled(sourceUrl);
            },
          },
          mediaDetails: {
            merge: true,
          },
        },
      },
    },
  }),
};

const client = new ApolloClient({
  link: from([errorLink, retryLink, httpLink]),
  ...config,
});

export default client;
