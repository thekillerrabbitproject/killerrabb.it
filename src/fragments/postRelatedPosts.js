import { graphql } from 'gatsby';

export const postRelatedPosts = graphql`
  fragment PostRelatedPosts on WpPost_RelatedPosts {
    posts {
      ... on WpPost {
        ...Post
      }
    }
    videos: posts {
      ... on WpVideo {
        ...VideoPost
      }
    }
  }
`;
