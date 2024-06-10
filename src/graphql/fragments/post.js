import { gql } from '@apollo/client';

import { GALLERY_IMAGES_THUMBNAIL_256 } from '@/graphql/fragments/galleryImagesThumbnail256';

export const POST_FRAGMENT = gql`
  ${GALLERY_IMAGES_THUMBNAIL_256}
  fragment Post on Post {
    __typename
    id
    title
    content
    uri
    slug
    acf {
      ...GalleryImagesThumbnail256
    }
  }
`;
