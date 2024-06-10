import { gql } from '@apollo/client';

export const MODEL_TAXONOMY_FRAGMENT = gql`
  fragment ModelTaxonomy on Model {
    name
    uri
    slug
  }
`;
