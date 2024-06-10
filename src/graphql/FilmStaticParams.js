import { gql } from '@apollo/client';

export const query = gql`
  query FilmsQuery {
    films(first: 100) {
      nodes {
        slug
        uri
      }
    }
  }
`;
