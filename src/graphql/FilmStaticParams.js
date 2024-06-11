import { gql } from '@apollo/client';

export const query = gql`
  query FilmsQuery {
    films(first: 999) {
      nodes {
        slug
        uri
      }
    }
  }
`;
