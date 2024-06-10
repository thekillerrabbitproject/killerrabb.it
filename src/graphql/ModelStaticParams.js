import { gql } from '@apollo/client';

export const query = gql`
  query ModelsQuery {
    models(first: 100) {
      nodes {
        slug
        uri
      }
    }
  }
`;
