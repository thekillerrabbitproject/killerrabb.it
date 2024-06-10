import { gql } from '@apollo/client';

export const query = gql`
  query VideoStaticParamsQuery {
    videos(first: 100) {
      nodes {
        slug
        uri
      }
    }
  }
`;
