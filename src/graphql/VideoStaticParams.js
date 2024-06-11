import { gql } from '@apollo/client';

export const query = gql`
  query VideoStaticParamsQuery {
    videos(first: 999) {
      nodes {
        slug
        uri
      }
    }
  }
`;
