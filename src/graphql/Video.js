import { gql } from '@apollo/client';

import { FEATURED_IMAGE_THUMBNAIL_FULL_SIZE } from './fragments/featuredImageFullSize';
import { FILM_TAXONOMY_FRAGMENT } from './fragments/filmTaxonomy';
import { MODEL_TAXONOMY_FRAGMENT } from './fragments/modelTaxonomy';
import { VIDEO_POST_FRAGMENT } from './fragments/videoPost';
import { VIDEO_RELATED_POSTS_FRAGMENT } from './fragments/videoRelatedPosts';

export const query = gql`
  ${FEATURED_IMAGE_THUMBNAIL_FULL_SIZE}
  ${VIDEO_POST_FRAGMENT}
  ${FILM_TAXONOMY_FRAGMENT}
  ${MODEL_TAXONOMY_FRAGMENT}
  ${VIDEO_RELATED_POSTS_FRAGMENT}

  query VideoQuery($slug: ID!) {
    video(idType: SLUG, id: $slug) {
      ...VideoPost
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
        ...VideoRelatedPosts
      }
      images @client {
        featuredImage {
          jpg
          width
          height
        }
      }
    }
  }
`;
