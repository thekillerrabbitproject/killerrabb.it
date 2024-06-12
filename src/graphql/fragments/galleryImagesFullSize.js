import { gql } from '@apollo/client';

export const GALLERY_IMAGES_FULL_SIZE = gql`
  fragment GalleryImagesFullSize on Post_Acf {
    gallery {
      __typename
      id
      sourceUrl
      mediaItemId
      mediaDetails {
        __typename
        width
        height
      }
    }
  }
`;
