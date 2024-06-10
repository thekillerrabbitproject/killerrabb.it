import { gql } from '@apollo/client';

export const VIDEO_RELATED_POSTS_FRAGMENT = gql`
  fragment VideoRelatedPosts on Video_RelatedPosts {
    posts {
      ... on Post {
        id
      }
      ... on Video {
        id
      }
    }
  }
`;
