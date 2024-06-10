import { gql } from '@apollo/client';

import { GALLERY_IMAGES_FULL_SIZE } from '@/graphql/fragments/galleryImagesFullSize';

export const POST_FULL_SIZE_FRAGMENT = gql`
  ${GALLERY_IMAGES_FULL_SIZE}
  fragment PostFullSize on Post {
    __typename
    slug
    id
    title
    content
    uri
    acf {
      ...GalleryImagesFullSize
    }
  }
`;
