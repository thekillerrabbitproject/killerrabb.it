import { gql } from '@apollo/client';

import { FILM_TAXONOMY_FRAGMENT } from '@/graphql/fragments/filmTaxonomy';
import { MODEL_TAXONOMY_FRAGMENT } from '@/graphql/fragments/modelTaxonomy';

export const query = gql`
  ${FILM_TAXONOMY_FRAGMENT}
  ${MODEL_TAXONOMY_FRAGMENT}

  query FooterQuery {
    films(where: { orderby: COUNT, hideEmpty: true }, first: 100) {
      nodes {
        ...FilmTaxonomy
        count
      }
    }
    models(where: { orderby: COUNT, hideEmpty: true }, first: 100) {
      nodes {
        ...ModelTaxonomy
        count
      }
    }
  }
`;
