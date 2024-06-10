import { gql } from '@apollo/client';

export const POST_RELATED_POSTS_FRAGMENT = gql`
  fragment PostRelatedPosts on Post_RelatedPosts {
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
