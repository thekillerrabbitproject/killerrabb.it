import { ApolloClient, InMemoryCache } from '@apollo/client';

import { removeScaled } from '@/utils';

const client = new ApolloClient({
  uri: 'https://www.tkrp.net/graphql',
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
});

export default client;
