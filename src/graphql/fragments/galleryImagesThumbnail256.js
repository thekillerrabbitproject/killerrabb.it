import { gql } from '@apollo/client';

export const GALLERY_IMAGES_THUMBNAIL_256 = gql`
  fragment GalleryImagesThumbnail256 on Post_Acf {
    gallery {
      __typename
      id
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
