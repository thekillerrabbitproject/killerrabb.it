import { gql } from '@apollo/client';

export const FEATURED_IMAGE_THUMBNAIL_256_FRAGMENT = gql`
  fragment FeaturedImageThumbnail256 on NodeWithFeaturedImageToMediaItemConnectionEdge {
    node {
      __typename
      mediaItemId
      mediaDetails {
        __typename
        sizes(include: NEXTJS_THUMBNAIL) {
          width
          height
          sourceUrl
        }
      }
    }
  }
`;
