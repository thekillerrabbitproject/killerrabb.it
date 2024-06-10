import { gql } from '@apollo/client';

import { POST_FRAGMENT } from '@/graphql/fragments/post';

import { FEATURED_IMAGE_THUMBNAIL_256_FRAGMENT } from './fragments/featuredImageThumbnail256';
import { FILM_TAXONOMY_FRAGMENT } from './fragments/filmTaxonomy';
import { MODEL_TAXONOMY_FRAGMENT } from './fragments/modelTaxonomy';

export const query = gql`
  ${POST_FRAGMENT}
  ${FEATURED_IMAGE_THUMBNAIL_256_FRAGMENT}
  ${FILM_TAXONOMY_FRAGMENT}
  ${MODEL_TAXONOMY_FRAGMENT}

  query PostsQuery($where: RootQueryToPostConnectionWhereArgs) {
    posts(where: $where, first: 100) {
      nodes {
        ...Post
        featuredImageId
        featuredImage {
          ...FeaturedImageThumbnail256
        }
        films {
          nodes {
            ...FilmTaxonomy
          }
        }
        models {
          nodes {
            ...ModelTaxonomy
          }
        }
        thumbnails @client {
          featuredImage {
            blur
            webp
            jpg
            width
            height
          }
          gallery {
            blur
            webp
            jpg
            width
            height
          }
        }
      }
    }
  }
`;
