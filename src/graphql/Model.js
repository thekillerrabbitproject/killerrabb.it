import { gql } from '@apollo/client';

export const query = gql`
  query ModelQuery($slug: ID!) {
    model(idType: SLUG, id: $slug) {
      __typename
      slug
      name
      posts {
        nodes {
          id
        }
      }
      videos {
        nodes {
          id
        }
      }
    }
  }
`;
