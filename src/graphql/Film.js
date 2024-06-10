import { gql } from '@apollo/client';

export const query = gql`
  query FilmQuery($slug: ID!) {
    film(idType: SLUG, id: $slug) {
      __typename
      slug
      title: name
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
