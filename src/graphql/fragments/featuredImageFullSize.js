import { gql } from '@apollo/client';

export const FEATURED_IMAGE_THUMBNAIL_FULL_SIZE = gql`
  fragment FeaturedImageThumbnailFullSize on NodeWithFeaturedImageToMediaItemConnectionEdge {
    node {
      __typename
      sourceUrl
      mediaItemId
      mediaDetails {
        __typename
        height
        width
      }
    }
  }
`;
