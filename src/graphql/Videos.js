import { gql } from '@apollo/client';

import { FEATURED_IMAGE_THUMBNAIL_256_FRAGMENT } from './fragments/featuredImageThumbnail256';
import { FILM_TAXONOMY_FRAGMENT } from './fragments/filmTaxonomy';
import { MODEL_TAXONOMY_FRAGMENT } from './fragments/modelTaxonomy';
import { VIDEO_POST_FRAGMENT } from './fragments/videoPost';

export const query = gql`
  ${FEATURED_IMAGE_THUMBNAIL_256_FRAGMENT}
  ${VIDEO_POST_FRAGMENT}
  ${FILM_TAXONOMY_FRAGMENT}
  ${MODEL_TAXONOMY_FRAGMENT}

  query VideosQuery($where: RootQueryToVideoConnectionWhereArgs) {
    videos(where: $where, first: 100) {
      nodes {
        ...VideoPost
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
        }
      }
    }
  }
`;
