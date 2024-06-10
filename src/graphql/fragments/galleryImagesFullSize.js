import { gql } from '@apollo/client';

export const GALLERY_IMAGES_FULL_SIZE = gql`
  fragment GalleryImagesFullSize on Post_Acf {
    gallery {
      id
      sourceUrl
      mediaItemId
      mediaDetails {
        width
        height
      }
    }
  }
`;
