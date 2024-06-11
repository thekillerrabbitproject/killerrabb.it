import { gql } from '@apollo/client';

export const query = gql`
  query ModelsQuery {
    models(first: 999) {
      nodes {
        slug
        uri
      }
    }
  }
`;
