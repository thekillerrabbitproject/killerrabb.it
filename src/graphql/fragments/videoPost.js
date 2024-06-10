import { gql } from '@apollo/client';

export const VIDEO_POST_FRAGMENT = gql`
  fragment VideoPost on Video {
    __typename
    slug
    id
    title
    content
    uri
    videoThingy {
      credits
      featuredVideo {
        mediaItemUrl
      }
    }
  }
`;
