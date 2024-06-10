import { gql } from '@apollo/client';

import { FEATURED_IMAGE_THUMBNAIL_FULL_SIZE } from './fragments/featuredImageFullSize';
import { FILM_TAXONOMY_FRAGMENT } from './fragments/filmTaxonomy';
import { MODEL_TAXONOMY_FRAGMENT } from './fragments/modelTaxonomy';
import { POST_FULL_SIZE_FRAGMENT } from './fragments/postFullSize';
import { POST_RELATED_POSTS_FRAGMENT } from './fragments/postRelatedPosts';

export const query = gql`
  ${FEATURED_IMAGE_THUMBNAIL_FULL_SIZE}
  ${POST_FULL_SIZE_FRAGMENT}
  ${FILM_TAXONOMY_FRAGMENT}
  ${MODEL_TAXONOMY_FRAGMENT}
  ${POST_RELATED_POSTS_FRAGMENT}

  query PostQuery($slug: ID!) {
    post(idType: SLUG, id: $slug) {
      ...PostFullSize
      featuredImageId
      featuredImage {
        ...FeaturedImageThumbnailFullSize
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
      relatedPosts: related_posts {
        ...PostRelatedPosts
      }
      images @client {
        featuredImage {
          blur
          jpg
          webp
          width
          height
        }
        gallery {
          blur
          jpg
          webp
          width
          height
        }
      }
    }
  }
`;
