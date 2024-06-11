import { gql } from '@apollo/client';

export const query = gql`
  query PostStaticParamsQuery {
    posts(first: 999) {
      nodes {
        slug
        uri
      }
    }
  }
`;
