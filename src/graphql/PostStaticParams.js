import { gql } from '@apollo/client';

export const query = gql`
  query PostStaticParamsQuery {
    posts(first: 100) {
      nodes {
        slug
        uri
      }
    }
  }
`;
