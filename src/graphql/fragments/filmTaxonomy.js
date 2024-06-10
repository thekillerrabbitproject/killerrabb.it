import { gql } from '@apollo/client';

export const FILM_TAXONOMY_FRAGMENT = gql`
  fragment FilmTaxonomy on Film {
    name
    uri
    slug
  }
`;
