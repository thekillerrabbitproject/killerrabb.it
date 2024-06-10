import { gql } from '@apollo/client';

export const FEATURED_IMAGE_THUMBNAIL_256_FRAGMENT = gql`
  fragment FeaturedImageThumbnail256 on NodeWithFeaturedImageToMediaItemConnectionEdge {
    node {
      mediaItemId
      mediaDetails {
        sizes(include: NEXTJS_THUMBNAIL) {
          width
          height
          sourceUrl
        }
      }
    }
  }
`;
